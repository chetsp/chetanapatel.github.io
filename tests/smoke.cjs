const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
const staticSite = process.env.STATIC_SITE === "true";
(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
    args: ["--no-sandbox"],
    headless: true,
  });
  const context = await browser.newContext({
    reducedMotion: "reduce",
    acceptDownloads: true,
  });
  const page = await context.newPage();
  const errors = [];
  const checkedLinks = new Set();
  async function checkInternalLinks() {
    const urls = await page
      .locator("a[href]")
      .evaluateAll((links) => links.map((link) => link.href));
    for (const href of urls) {
      const url = new URL(href);
      if (url.origin !== new URL(base).origin) continue;
      url.hash = "";
      if (checkedLinks.has(url.href)) continue;
      checkedLinks.add(url.href);
      const result = await page.request.get(url.href);
      assert.equal(result.status(), 200, `Internal link resolves: ${url.href}`);
    }
    const assets = await page
      .locator('script[src],link[rel="stylesheet"][href]')
      .evaluateAll((nodes) => nodes.map((node) => node.src || node.href));
    for (const href of assets) {
      if (checkedLinks.has(href)) continue;
      checkedLinks.add(href);
      assert.equal(
        (await page.request.get(href)).status(),
        200,
        `Asset resolves: ${href}`,
      );
    }
  }
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [1440, 1024, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(base);
    await page.waitForLoadState("networkidle");
    assert(
      !(await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth,
      )),
      `No horizontal overflow at ${width}`,
    );
    assert.equal(await page.locator(".project-card").count(), 4);
    for (const el of await page.locator(".reveal").all())
      assert.equal(
        await el.evaluate((e) => getComputedStyle(e).opacity),
        "1",
        "Reduced-motion content is visible",
      );
    for (const link of await page.locator('a[href^="#"]').all()) {
      const hash = await link.getAttribute("href");
      if (hash.length > 1)
        assert.equal(await page.locator(hash).count(), 1, hash);
    }
    // Scroll through so reveal animations are included in full-page captures.
    for (const section of await page.locator("main section").all())
      await section.scrollIntoViewIfNeeded();
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `/tmp/chetana-${width}.png`,
      fullPage: true,
    });
    console.log(`PASS layout/anchors at ${width}px`);
  }
  await checkInternalLinks();
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  assert.equal(await page.locator(".tour-bar").count(), 0);
  await page
    .getByRole("button", { name: "Agents & MCP", exact: true })
    .last()
    .click();
  await page.waitForFunction(
    () => document.querySelectorAll(".project-card").length === 1,
  );
  assert.equal(await page.locator(".project-card").count(), 1);
  assert.match(await page.locator(".project-card").innerText(), /RouteMind/);
  for (const [category, name] of [
    ["Applied AI", "Gita Guru"],
    ["Product Engineering", "Survey Application Modernization"],
    ["Full-Stack", "Campus Survey Platform"],
  ]) {
    await page
      .locator(".filters")
      .getByRole("button", { name: category, exact: true })
      .click();
    await page.waitForFunction((name) => {
      const cards = document.querySelectorAll(".project-card");
      return cards.length === 1 && cards[0].textContent.includes(name);
    }, name);
  }
  await page.getByRole("button", { name: /All work/ }).click();
  assert.equal(await page.locator(".project-card").count(), 4);
  assert.equal(await page.getByRole("tablist").count(), 0);
  assert.equal(await page.locator(".experience-timeline article").count(), 4);
  for (const role of await page.locator(".experience-timeline article").all()) {
    assert(await role.isVisible(), "Every experience entry is expanded");
  }
  for (const link of await page.locator(".metrics a").all()) {
    const hash = await link.getAttribute("href");
    if (/55M|52%|800K/.test(await link.innerText())) {
      assert.equal(hash, "#bank-of-america-senior");
      await link.click();
      assert.equal(new URL(page.url()).hash, hash);
      const top = await page
        .locator(hash)
        .evaluate((el) => el.getBoundingClientRect().top);
      assert(
        top >= 70 && top < 200,
        "Metric lands on the senior experience card",
      );
    }
  }
  assert.match(
    await page.locator("#bank-of-america-senior").innerText(),
    /55M\+ daily calculations/,
  );
  assert.match(
    await page.locator("#bank-of-america-senior").innerText(),
    /52% higher task throughput/,
  );
  assert.match(
    await page.locator("#bank-of-america-senior").innerText(),
    /\$800K annual infrastructure savings/,
  );
  assert.equal(await page.locator("#skills .skill-buttons button").count(), 24);
  for (const badge of await page.locator("#skills .skill-buttons button").all())
    assert(await badge.isVisible());
  await page.getByRole("button", { name: "LangGraph", exact: true }).click();
  assert.match(await page.locator(".skill-detail").innerText(), /RouteMind/);
  await page
    .locator("#assistant")
    .getByRole("button", { name: /What did Chetana build at Tesla/ })
    .click();
  await page
    .locator("#assistant .message.guide")
    .filter({ hasText: "Carrier Rate Creation" })
    .waitFor();
  assert.match(
    await page.locator("#assistant .chat-top").innerText(),
    /Local guide/,
  );
  await page.getByRole("button", { name: "Ask my portfolio" }).click();
  await page.getByRole("dialog").waitFor();
  assert.equal(
    await page.locator(":focus").getAttribute("aria-label"),
    "Close portfolio guide",
  );
  await page.keyboard.press("Escape");
  await page.getByRole("dialog").waitFor({ state: "detached" });
  assert.equal(await page.getByRole("dialog").count(), 0);
  assert.match(await page.locator(":focus").innerText(), /Ask my portfolio/);
  const resumePath =
    new URL(base).pathname.replace(/\/$/, "") + "/Chetana_Patel_Resume.pdf";
  const resumeLinks = page.locator(`a[href="${resumePath}"]`);
  assert.equal(await resumeLinks.count(), 4);
  for (const link of await resumeLinks.all())
    assert.equal(await link.getAttribute("download"), "");
  const downloadPromise = page.waitForEvent("download");
  await page.locator(".resume-button").click();
  assert.equal(
    (await downloadPromise).suggestedFilename(),
    "Chetana_Patel_Resume.pdf",
  );
  const pdf = await page.request.get(new URL(resumePath, base).href);
  assert.equal(pdf.status(), 200);
  assert.equal((await pdf.body()).subarray(0, 5).toString(), "%PDF-");
  assert.equal(
    await page
      .locator('a[href="https://www.linkedin.com/in/cschetanapatel/"]')
      .count(),
    1,
  );
  for (const slug of [
    "routemind-ai",
    "student-survey",
    "gita-guru",
    "ai-modernization",
  ]) {
    const r = await page.goto(base + "/work/" + slug);
    assert.equal(r.status(), 200);
    assert.equal(await page.locator("h1").count(), 1);
    await checkInternalLinks();
    console.log("PASS case study " + slug);
  }
  if (!staticSite) {
    const invalid = await page.request.post(base + "/api/chat", {
      data: { message: "" },
    });
    assert.equal(invalid.status(), 400);
    const long = await page.request.post(base + "/api/chat", {
      data: { message: "x".repeat(1001) },
    });
    assert.equal(long.status(), 400);
    const answer = await page.request.post(base + "/api/chat", {
      data: { message: "Explain RouteMind" },
    });
    const data = await answer.json();
    assert.ok(["local", "fallback", "gemini"].includes(data.mode));
    if (data.mode !== "gemini") assert.match(data.answer, /synthetic/);
  }
  const missing = await page.goto(base + "/work/unknown");
  assert.equal(missing.status(), 404);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(base);
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page.locator('.mobile-menu a[href="#contact"]').click();
  assert.equal(await page.locator(".mobile-menu").count(), 0);
  assert.equal(new URL(page.url()).hash, "#contact");
  assert.deepEqual(errors, []);
  console.log(
    `PASS ${checkedLinks.size} internal routes and assets resolved without errors`,
  );
  console.log(
    "PASS filters, expanded timeline, metric anchors, visible skills, chat, keyboard drawer, download, social URL, 404, mobile navigation, no JS errors",
  );
  console.log(
    staticSite
      ? "SKIPPED server API validation (static export); local guide verified"
      : "PASS server API validation",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
