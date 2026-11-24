const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = (process.env.BASE_URL || "http://127.0.0.1:3000").replace(
  /\/$/,
  "",
);
(async () => {
  const browser = await chromium.launch({
    headless: true,
    args: ["--no-sandbox"],
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
  });
  const page = await browser.newPage({
    reducedMotion: "reduce",
    viewport: { width: 1440, height: 1000 },
  });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base);
  await page.waitForLoadState("networkidle");
  assert.equal(
    await page.locator("h1").innerText(),
    "Software & Applied AI Engineer",
  );
  assert.match(
    await page.locator(".hero-description").innerText(),
    /financial infrastructure.*reliable AI agents/,
  );
  assert.equal(
    await page
      .getByRole("button", { name: "All Experience", exact: true })
      .getAttribute("aria-pressed"),
    "true",
  );
  assert.equal(await page.locator("#proof-heading").innerText(), "Python");
  assert.match(
    await page.locator("#skills-proof").innerText(),
    /BofA · Production/,
  );
  for (const theme of ["dark", "light"]) {
    if ((await page.locator("html").getAttribute("class")) !== theme)
      await page.getByRole("button", { name: "Toggle color theme" }).click();
    for (const [label, id, target] of [
      ["Applied AI & Agents", "ai", "#tesla"],
      ["Backend & Distributed Systems", "backend", "#bank-of-america-senior"],
      ["All Experience", "all", null],
    ]) {
      await page.getByRole("button", { name: label, exact: true }).click();
      assert.equal(
        await page.locator(".site").getAttribute("data-hiring-lens"),
        id,
      );
      assert.equal(await page.locator(".project-card").count(), 3);
      assert.equal(await page.locator(".experience-card").count(), 4);
      assert.equal(await page.locator(".tool-tile").count(), 33);
      for (const content of await page
        .locator(".project-card,.experience-card,.tool-tile")
        .all())
        assert(await content.isVisible(), "Lens never hides content");
      if (target)
        assert.match(
          await page
            .locator(target)
            .evaluate((e) => getComputedStyle(e).boxShadow),
          /inset/,
        );
    }
    await page.getByRole("button", { name: "LangGraph", exact: true }).focus();
    assert.equal(await page.locator("#proof-heading").innerText(), "LangGraph");
    assert.match(await page.locator("#skills-proof").innerText(), /RouteMind/);
    assert.match(
      await page.locator("#skills-proof a").first().getAttribute("href"),
      /work\/routemind-ai/,
    );
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert(
        !(await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )),
        `No overflow ${theme} ${width}`,
      );
    }
  }
  await page.context().grantPermissions(["clipboard-read", "clipboard-write"], {
    origin: new URL(base).origin,
  });
  await page.getByRole("button", { name: "Copy email address" }).click();
  assert.equal(await page.locator(".copy-status").innerText(), "Copied!");
  assert.equal(
    await page.evaluate(() => navigator.clipboard.readText()),
    "patelkchetana@gmail.com",
  );
  for (const [question, expected] of [
    [/What did Chetana build at Tesla/, /Carrier Rate Creation/],
    [/How did she achieve/, /\$800K/],
    [/Walk through RouteMind/, /LangGraph/],
  ]) {
    await page
      .locator("#assistant")
      .getByRole("button", { name: question })
      .click();
    await page.waitForFunction(
      () => document.querySelectorAll("#assistant .message.guide").length > 1,
    );
    await page
      .locator("#assistant .message.guide")
      .last()
      .filter({ hasText: expected })
      .waitFor();
  }
  const schema = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  assert.equal(schema["@context"], "https://schema.org");
  const person = schema["@graph"].find((i) => i["@type"] === "Person"),
    profile = schema["@graph"].find((i) => i["@type"] === "ProfilePage");
  assert.equal(profile.mainEntity["@id"], person["@id"]);
  assert(person.sameAs.includes("https://github.com/chetsp"));
  assert(person.sameAs.includes("https://www.linkedin.com/in/cschetanapatel/"));
  assert.equal(person.affiliation.name, "George Mason University");
  assert(
    person.hasOccupation.some((role) => role.description.includes("Tesla")),
  );
  assert(
    person.hasOccupation.some((role) =>
      role.description.includes("Bank of America"),
    ),
  );
  const llms = await page.request.get(base + "/llms.txt");
  assert.equal(llms.status(), 200);
  const text = await llms.text();
  for (const value of [
    "Chetana Kamraj Patel",
    "Tesla",
    "Bank of America",
    "George Mason University",
    "55M+",
    "52%",
    "$800K",
    "RouteMind AI",
    "Gita Guru",
    "Survey Application Modernization",
    "patelkchetana@gmail.com",
  ])
    assert(text.includes(value), value);
  assert(
    text.includes(
      "https://chetsp.github.io/chetanapatel.github.io/work/routemind-ai/",
    ),
  );
  await page.goto(base + "/work/routemind-ai/");
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    "https://chetsp.github.io/chetanapatel.github.io/work/routemind-ai/",
  );
  const nojs = await browser.newContext({
    javaScriptEnabled: false,
    reducedMotion: "reduce",
  });
  const semantic = await nojs.newPage();
  await semantic.goto(base);
  assert.equal(await semantic.locator(".experience-card").count(), 4);
  assert.equal(await semantic.locator(".project-card").count(), 3);
  assert.equal(await semantic.locator("#skills .tool-grid > li").count(), 33);
  for (const content of await semantic
    .locator(".experience-card,.project-card,#skills-proof")
    .all())
    assert(await content.isVisible(), "Content visible without hydration");
  assert((await semantic.locator(".experience-card ul li").count()) > 10);
  assert.equal(await semantic.locator("#proof-heading").innerText(), "Python");
  assert.deepEqual(errors, []);
  console.log(
    "PASS lenses without hiding, both themes, proof links, copy email, all recruiter prompts, Person/ProfilePage JSON-LD, llms.txt, canonical URL, and initial semantic HTML without JavaScript",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
