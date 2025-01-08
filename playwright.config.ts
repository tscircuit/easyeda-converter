import { defineConfig, devices } from "@playwright/test"
import { defineConfig as defineViteConfig } from "vite"
import { createServer } from "vite"

export default defineConfig({
  testDir: "./playwright-tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:5181",
    trace: "on-first-retry",
  },
  webServer: {
    command: "npm run start -- --port 5181",
    url: "http://localhost:5181",
    reuseExistingServer: !process.env.CI,
    stdout: "pipe",
    stderr: "pipe",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
})
