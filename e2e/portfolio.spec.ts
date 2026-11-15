import { expect, test } from '@playwright/test'

test('visitor can explore the portfolio and switch between light and dark themes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Ashis Sarthak Singh')
  const desktopNameSize = await page.getByRole('heading', { level: 1 }).evaluate(
    (heading) => Number.parseFloat(getComputedStyle(heading).fontSize),
  )
  expect(desktopNameSize).toBeLessThan(65)
  await expect(page.locator('svg circle[cx="500"][cy="310"]')).toHaveCount(0)
  const desktopCanvasHeight = await page.locator('#top > div:nth-of-type(2)').evaluate(
    (canvas) => canvas.getBoundingClientRect().height,
  )
  expect(desktopCanvasHeight).toBeLessThan(600)
  await expect(page.getByRole('link', { name: 'Journey', exact: true })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Leading end-to-end delivery of a banking module.' })).toBeVisible()
  await expect(page.getByRole('img', { name: /banking module and frontend team illustration/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'A modular frontend foundation for a complex dashboard.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Ashis Sarthak Singh, return to top' })).toBeVisible()
  await expect(page.getByText('System health')).toHaveCount(0)

  await page.getByRole('button', { name: /Product/ }).click()
  await expect(page.getByText(/Start with what the user is trying to do/)).toBeVisible()
  await expect(page.locator('#case-sberbank')).toBeInViewport()

  await page.getByRole('button', { name: /Systems/ }).click()
  await expect(page.locator('#case-apple')).toBeInViewport()
  await page.getByRole('button', { name: /Interface craft/ }).click()
  await expect(page.locator('#case-apple')).toBeInViewport()
  await page.getByRole('button', { name: /People/ }).click()
  await expect(page.locator('#case-adia')).toBeInViewport()

  await page.getByRole('button', { name: 'Switch to light mode' }).click()
  await expect(page.locator('[data-theme="light"]')).toBeVisible()

  await page.reload()
  await expect(page.locator('[data-theme="light"]')).toBeVisible()
  await page.getByRole('button', { name: 'Switch to dark mode' }).click()
  await expect(page.locator('[data-theme="dark"]')).toBeVisible()
  await expect.poll(() =>
    page.locator('[data-theme="dark"]').evaluate((element) => getComputedStyle(element).getPropertyValue('--accent').trim()),
  ).toBe('#62e6ff')
})

test('portfolio fits a narrow mobile viewport without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const mobileNameSize = await page.getByRole('heading', { level: 1 }).evaluate(
    (heading) => Number.parseFloat(getComputedStyle(heading).fontSize),
  )
  expect(mobileNameSize).toBeLessThan(37)
  const mobileCanvasHeight = await page.locator('#top > div:nth-of-type(2)').evaluate(
    (canvas) => canvas.getBoundingClientRect().height,
  )
  expect(mobileCanvasHeight).toBeLessThan(500)
  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )

  expect(hasHorizontalOverflow).toBe(false)
})
