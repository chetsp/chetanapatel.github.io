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
    assert.equal(await page.locator(".tool-tile").count(), 33);
    assert.equal(await page.locator("#skills-proof").count(), 1);
    assert.equal(
      await page.locator(".tool-tile").filter({ hasText: "Codex" }).count(),
      1,
    );
    assert.equal(
      await page.locator(".tool-tile").filter({ hasText: "Gemini" }).count(),
      1,
    );
    assert.equal(
      await page
        .locator(".footer")
        .filter({ hasText: "Northern Virginia" })
        .count(),
      0,
    );
    for (const img of await page
      .locator(".tool-brand-svg,.timeline-marker img")
      .all()) {
      await img.evaluate((i) => {
        i.loading = "eager";
        return i.decode();
      });
      assert(await img.evaluate((i) => i.naturalWidth > 0));
      assert.equal(
        await img.evaluate((i) => getComputedStyle(i).filter),
        "none",
        "Original brand colors remain unfiltered in both themes",
      );
      const url = await img.evaluate((i) => i.currentSrc);
      if (!checked.has(url)) {
        assert.equal((await page.request.get(url)).status(), 200);
        checked.add(url);
      }
    }
    for (const [index, count] of [9, 6, 7, 11].entries()) {
      await page.locator(".capability-card").nth(index).click();
      assert.equal(await page.locator(".tool-tile").count(), count);
    }
    await page.getByRole("button", { name: /All tools/ }).click();
    await page.locator(".tool-tile").filter({ hasText: "Codex" }).hover();
    assert.equal(await page.locator("#skills-proof").count(), 1);
    for (const width of [1440, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      assert(
        !(await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )),
        `No overflow at ${width}`,
      );
      if (width === 1440)
        await page
          .locator("#skills")
          .screenshot({ path: `/tmp/skills-color-${theme}.png` });
    }
    console.log(
      `PASS ${theme}: 33 tools, Codex/Gemini, original colors, visible proof, capability filters, local assets and responsive layout`,
    );
  }
  assert.deepEqual(errors, []);
  console.log(`PASS ${checked.size} asset URLs and no JavaScript errors`);
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
