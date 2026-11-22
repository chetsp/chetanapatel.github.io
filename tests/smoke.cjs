const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = process.env.BASE_URL || "http://127.0.0.1:3000";
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
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(base);
  await page
    .getByRole("combobox", { name: "Choose a guided tour" })
    .selectOption("Technical Peer");
  await page.getByRole("link", { name: "Start selected tour" }).click();
  assert.equal(new URL(page.url()).hash, "#work");
  await page
    .getByRole("button", { name: "Agents & MCP", exact: true })
    .last()
    .click();
  await page.waitForFunction(
    () => document.querySelectorAll(".project-card").length === 1,
  );
  assert.equal(await page.locator(".project-card").count(), 1);
  assert.match(await page.locator(".project-card").innerText(), /RouteMind/);
  await page.getByRole("button", { name: /All work/ }).click();
  assert.equal(await page.locator(".project-card").count(), 4);
  await page.locator("#role-tab-1").click();
  await page.getByRole("tabpanel").filter({ hasText: "55M+" }).waitFor();
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
  const downloadPromise = page.waitForEvent("download");
  await page.locator(".resume-button").click();
  const download = await downloadPromise;
  assert.equal(download.suggestedFilename(), "Chetana_Patel_Resume.pdf");
  const pdf = await page.request.get(base + "/Chetana_Patel_Resume.pdf");
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
    console.log("PASS case study " + slug);
  }
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
    "PASS tour, filters, timeline, skills, chat, keyboard drawer, download, social URL, API validation, 404, mobile navigation, no JS errors",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
