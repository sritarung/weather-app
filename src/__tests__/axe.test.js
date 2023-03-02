/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import AxePuppeteer from "@axe-core/puppeteer";
import { toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

describe("axe accessibility check", () => {
  beforeAll(async () => {
    await page.goto("http://localhost:3000");
  });

  it("should pass default axe checks", async () => {
    const results = await new AxePuppeteer(page).analyze();
    expect(results).toHaveNoViolations();
  });
});
