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
  const context = await browser.newContext({
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto(base);
  await page.waitForLoadState("networkidle");
  assert.equal(
    await page.locator("html").getAttribute("class"),
    "dark",
    "Default remains dark regardless of system preference",
  );
  assert.equal(await page.locator(".tour-bar").count(), 0);
  const toggle = page.getByRole("button", { name: "Toggle color theme" });
  assert(await toggle.locator(".sun-icon").isVisible());
  await toggle.focus();
  await page.keyboard.press("Enter");
  assert.equal(await page.locator("html").getAttribute("class"), "light");
  assert.equal(
    await page.evaluate(() => localStorage.getItem("theme")),
    "light",
  );
  await page.reload();
  assert.equal(await page.locator("html").getAttribute("class"), "light");
  assert(await toggle.locator(".moon-icon").isVisible());
  async function contrastAudit() {
    const failures = await page.evaluate(() => {
      function rgba(s) {
        const n = s.match(/[\d.]+/g)?.map(Number) || [];
        return n.length >= 3 ? [n[0], n[1], n[2], n[3] ?? 1] : [0, 0, 0, 0];
      }
      function over(top, bottom) {
        return top
          .slice(0, 3)
          .map((n, i) => n * top[3] + bottom[i] * (1 - top[3]))
          .concat(1);
      }
      function lum(c) {
        const rgb = c.slice(0, 3).map((v) => {
          v /= 255;
          return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
        });
        return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
      }
      const failures = [];
      for (const el of document.querySelectorAll("body *")) {
        if (
          ["SCRIPT", "STYLE", "SVG", "PATH"].includes(el.tagName) ||
          !Array.from(el.childNodes).some(
            (n) => n.nodeType === 3 && n.textContent.trim(),
          )
        )
          continue;
        const style = getComputedStyle(el);
        if (
          !el.getClientRects().length ||
          style.visibility === "hidden" ||
          style.opacity === "0"
        )
          continue;
        const chain = [];
        for (let node = el; node; node = node.parentElement)
          chain.unshift(node);
        let bg = [255, 255, 255, 1];
        for (const node of chain)
          bg = over(rgba(getComputedStyle(node).backgroundColor), bg);
        const fg = over(rgba(style.color), bg);
        const a = lum(fg),
          b = lum(bg);
        const ratio = (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
        const large =
          parseFloat(style.fontSize) >= 24 ||
          (parseFloat(style.fontSize) >= 18.66 &&
            Number(style.fontWeight) >= 700);
        if (ratio < (large ? 3 : 4.5))
          failures.push({
            text: el.textContent.trim().slice(0, 45),
            class: el.className,
            color: style.color,
            ratio,
          });
      }
      return failures;
    });
    assert.deepEqual(failures, [], "Text meets AA against its surface");
  }
  for (const theme of ["light", "dark"]) {
    if ((await page.locator("html").getAttribute("class")) !== theme)
      await toggle.click();
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(base);
      await page.waitForLoadState("networkidle");
      assert.equal(await page.locator("html").getAttribute("class"), theme);
      assert.equal(
        await page
          .locator("body")
          .evaluate((e) => getComputedStyle(e).backgroundColor),
        theme === "light" ? "rgb(255, 255, 255)" : "rgb(9, 9, 11)",
      );
      assert(
        !(await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )),
        `No overflow at ${width} in ${theme}`,
      );
      const button = page.getByRole("button", { name: "Toggle color theme" });
      assert(await button.isVisible());
      const rect = await button.boundingBox();
      assert(
        rect.x >= 0 && rect.x + rect.width <= width,
        "Toggle is inside mobile navigation",
      );
      for (const section of await page.locator("main section").all())
        await section.scrollIntoViewIfNeeded();
      await contrastAudit();
      await page.evaluate(() => scrollTo(0, 0));
      if (width === 1440 || width === 390)
        await page.screenshot({
          path: `/tmp/portfolio-${theme}-${width}.png`,
          fullPage: true,
        });
      console.log(
        `PASS ${theme} ${width}px: theme, navigation, contrast and layout`,
      );
    }
    await page.getByRole("button", { name: "Ask my portfolio" }).click();
    await page.getByRole("dialog").waitFor();
    await contrastAudit();
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "detached" });
    for (const slug of [
      "routemind-ai",
      "student-survey",
      "gita-guru",
      "ai-modernization",
    ]) {
      await page.goto(base + "/work/" + slug);
      await page.waitForLoadState("networkidle");
      assert.equal(await page.locator("html").getAttribute("class"), theme);
      assert(
        await page
          .getByRole("button", { name: "Toggle color theme" })
          .isVisible(),
      );
      assert(
        !(await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        )),
        "Case study has no mobile overflow",
      );
      await contrastAudit();
    }
    console.log(`PASS ${theme}: all four case studies`);
    await page.goto(base);
  }
  // Block all hydration bundles: the inline theme script must still apply saved light mode.
  const beforeHydration = await browser.newContext({ reducedMotion: "reduce" });
  await beforeHydration.addInitScript(() =>
    localStorage.setItem("theme", "light"),
  );
  const firstPaint = await beforeHydration.newPage();
  await firstPaint.route("**/_next/**/*.js", (route) => route.abort());
  await firstPaint.goto(base, { waitUntil: "load" });
  assert.equal(
    await firstPaint.locator("html").getAttribute("class"),
    "light",
    "Saved theme applies before React hydration",
  );
  assert.equal(
    await firstPaint
      .locator("body")
      .evaluate((e) => getComputedStyle(e).backgroundColor),
    "rgb(255, 255, 255)",
  );
  assert.deepEqual(errors, []);
  console.log(
    "PASS default dark, keyboard toggle, storage/reload, pre-hydration light theme, no JavaScript errors",
  );
  await browser.close();
})().catch((e) => {
  console.error(e);
  process.exit(1);
});
