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
  const page = await browser.newPage({ reducedMotion: "reduce" });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const checked = new Set();
  for (const theme of ["dark", "light"]) {
    await page.goto(base);
    await page.waitForLoadState("networkidle");
    if ((await page.locator("html").getAttribute("class")) !== theme)
      await page.getByRole("button", { name: "Toggle color theme" }).click();
    assert.equal(await page.locator(".capability-card").count(), 4);
    assert.equal(await page.locator(".tool-tile").count(), 32);
    assert.equal(await page.locator("#proof-heading").innerText(), "Python");
    assert.match(await page.locator("#skills-proof").innerText(), /55M\+/);
    for (const img of await page
      .locator(".tool-brand-svg,.timeline-marker img")
      .all()) {
      await img.evaluate((i) => {
        i.loading = "eager";
        return i.decode();
      });
      assert(await img.evaluate((i) => i.naturalWidth > 0));
      const url = await img.evaluate((i) => i.currentSrc);
      if (!checked.has(url)) {
        assert.equal((await page.request.get(url)).status(), 200);
        checked.add(url);
      }
    }
    assert.equal(await page.locator(".timeline-marker img").count(), 4);
    for (const [index, count] of [8, 6, 7, 11].entries()) {
      await page.locator(".capability-card").nth(index).click();
      assert.equal(await page.locator(".tool-tile").count(), count);
      assert.equal(
        await page
          .locator(".capability-card")
          .nth(index)
          .getAttribute("aria-pressed"),
        "true",
      );
    }
    await page.getByRole("button", { name: /All tools/ }).click();
    const names = await page
      .locator(".tool-tile")
      .evaluateAll((tiles) => tiles.map((t) => t.getAttribute("aria-label")));
    for (const name of names) {
      await page.getByRole("button", { name, exact: true }).focus();
      assert.equal(
        await page.locator("#proof-heading").innerText(),
        name,
        "Focus selects exact tool proof",
      );
      assert((await page.locator(".proof-entry").count()) > 0);
      for (const a of await page.locator(".proof-entry a").all()) {
        const href = await a.getAttribute("href");
        if (href.startsWith("#"))
          assert.equal(await page.locator(href).count(), 1);
        else if (!href.startsWith("http")) {
          const url = new URL(href, page.url()).href;
          if (!checked.has(url)) {
            assert.equal((await page.request.get(url)).status(), 200);
            checked.add(url);
          }
        }
      }
    }
    await page.getByRole("button", { name: "LangGraph", exact: true }).hover();
    assert.equal(await page.locator("#proof-heading").innerText(), "LangGraph");
    assert.match(await page.locator("#skills-proof").innerText(), /RouteMind/);
    await page.getByRole("button", { name: "Google ADK", exact: true }).focus();
    assert.match(
      await page.locator("#skills-proof").innerText(),
      /Exploration/,
    );
    await page.getByRole("button", { name: "Python", exact: true }).focus();
    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert(
        !(await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )),
        `No overflow ${theme} ${width}`,
      );
      assert.equal(await page.locator(".tool-tile").count(), 32);
      await page.locator("#skills").scrollIntoViewIfNeeded();
      if (width === 1440 || width === 390)
        await page
          .locator("#skills")
          .screenshot({ path: `/tmp/capabilities-${theme}-${width}.png` });
    }
    console.log(
      `PASS ${theme}: 4 diagrams, 32 tools, all proof mappings, filters, hover/focus, local assets and 5 viewport sizes`,
    );
  }
  assert.deepEqual(errors, []);
  console.log(
    `PASS ${checked.size} local asset/proof URLs; no JavaScript errors`,
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
