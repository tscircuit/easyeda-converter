import { test, expect } from "@playwright/test"

test("c14877", async ({ page }) => {
  await page.goto("http://localhost:5181?jlcpcb_part_number=C14877")

  await page.waitForSelector("#code-content", { state: "visible" })
  await page.waitForLoadState("networkidle")

  await expect(page).toHaveScreenshot()
})
