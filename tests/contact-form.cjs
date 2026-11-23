const { chromium } = require("playwright");
const assert = require("node:assert/strict");
const base = process.env.BASE_URL || "http://127.0.0.1:3000";
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
    viewport: { width: 390, height: 844 },
  });
  let mode = "success",
    requests = 0,
    release;
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  // Intercept every provider request: these tests never send a real email.
  await page.route("https://formsubmit.co/**", async (route) => {
    if (route.request().method() === "OPTIONS")
      return route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "POST, OPTIONS",
          "access-control-allow-headers": "content-type, accept",
        },
      });
    requests++;
    assert.equal(
      route.request().url(),
      "https://formsubmit.co/ajax/patelkchetana@gmail.com",
    );
    const data = route.request().postDataJSON();
    assert.equal(data.name, "Portfolio Reviewer");
    assert.equal(data.email, "reviewer@example.com");
    assert.equal(data._replyto, data.email);
    assert.equal(data.message, "Testing the contact interface.");
    if (mode === "pending")
      await new Promise((resolve) => {
        release = resolve;
      });
    if (mode === "offline") return route.abort();
    return route.fulfill({
      status: mode === "http-error" ? 503 : 200,
      headers: { "access-control-allow-origin": "*" },
      json: { success: mode === "rejected" ? false : "true" },
    });
  });
  await page.goto(base);
  const form = page.locator(".contact-form");
  await form.scrollIntoViewIfNeeded();
  await form.getByRole("button", { name: "Send message" }).click();
  assert.equal(
    requests,
    0,
    "Native required validation prevents empty submissions",
  );
  async function fill() {
    await form.getByLabel("Your name").fill("Portfolio Reviewer");
    await form.getByLabel("Email address").fill("reviewer@example.com");
    await form
      .getByLabel("Your message")
      .fill("Testing the contact interface.");
  }
  await fill();
  mode = "pending";
  await form.getByRole("button", { name: "Send message" }).click();
  await page.waitForFunction(
    () =>
      document.querySelector(".contact-form").getAttribute("aria-busy") ===
      "true",
  );
  assert(await form.getByRole("button", { name: "Sending…" }).isDisabled());
  assert(await form.getByLabel("Your message").isDisabled());
  while (!release) await page.waitForTimeout(20);
  release();
  await form
    .getByRole("status")
    .filter({ hasText: "Your message has been submitted" })
    .waitFor();
  assert.equal(await form.getByLabel("Your message").inputValue(), "");
  for (const failure of ["rejected", "http-error", "offline"]) {
    mode = failure;
    await fill();
    await form.getByRole("button", { name: "Send message" }).click();
    await form
      .getByRole("status")
      .filter({ hasText: "could not be submitted" })
      .waitFor();
    assert.equal(
      await form.getByLabel("Your message").inputValue(),
      "Testing the contact interface.",
    );
    assert(
      !(await form.getByRole("button", { name: "Send message" }).isDisabled()),
    );
  }
  mode = "success";
  await form.getByRole("button", { name: "Send message" }).click();
  await form
    .getByRole("status")
    .filter({ hasText: "Your message has been submitted" })
    .waitFor();
  assert.deepEqual(errors, []);
  assert.equal(new URL(page.url()).origin, new URL(base).origin);
  console.log(
    "PASS required fields, payload and recipient, sending state, success, service rejection, HTTP failure, network failure, preserved input, retry. All provider responses mocked; no email sent.",
  );
  await browser.close();
})().catch((error) => {
  console.error(error);
  process.exit(1);
});
