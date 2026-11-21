import { expect, test } from '@playwright/test'

test('visitor can explore the portfolio and switch between light and dark themes', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/')

  await expect(page.getByRole('heading', { level: 1 })).toHaveAccessibleName('Ashis Sarthak Singh')
  const desktopNameSize = await page.getByRole('heading', { level: 1 }).evaluate(
    (heading) => Number.parseFloat(getComputedStyle(heading).fontSize),
  )
  expect(desktopNameSize).toBeLessThan(65)
  const heroNameScale = await page.getByRole('heading', { level: 1 }).evaluate((heading) => {
    const [firstName, restOfName] = heading.children
    return Number.parseFloat(getComputedStyle(firstName).fontSize)
      / Number.parseFloat(getComputedStyle(restOfName).fontSize)
  })
  expect(heroNameScale).toBeCloseTo(1.5, 1)
  await expect(page.locator('svg circle[cx="500"][cy="310"]')).toHaveCount(0)
  const desktopCanvasHeight = await page.locator('#top > div:nth-of-type(2)').evaluate(
    (canvas) => canvas.getBoundingClientRect().height,
  )
  expect(desktopCanvasHeight).toBeLessThan(600)
  await expect(page.getByRole('link', { name: 'Journey', exact: true })).toBeVisible()
  await expect(page.getByRole('link', { name: 'How I help' })).toHaveAttribute('href', '#services')
  await expect(page.getByRole('heading', { name: 'Bring me the messy, important part.' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Leading end-to-end delivery of a banking module.' })).toBeVisible()
  await expect(page.getByText('faster application delivery reported after AI-assisted frontend workflows')).toBeVisible()
  await expect(page.getByRole('img', { name: /banking module and frontend team illustration/ })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'A modular frontend foundation for a complex dashboard.' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Ashis Sarthak Singh, return to top' })).toBeVisible()
  await expect(page.getByText('System health')).toHaveCount(0)
  const heroLeadSize = await page.getByRole('heading', { name: 'I help teams build clear, fast frontend products.' })
    .evaluate((heading) => Number.parseFloat(getComputedStyle(heading).fontSize))
  expect(heroLeadSize).toBeLessThanOrEqual(62)
  await expect(page.getByText('01 / Product')).toHaveCount(0)
  await expect(page.getByText('05 / Interactive playground')).toHaveCount(0)

  await page.getByRole('link', { name: 'Talk through a challenge' }).click()
  await expect(page).toHaveURL(/#contact$/)
  await expect(page.getByRole('heading', { name: "Let's make the complex feel clear." })).toBeVisible()
  await page.goto('/')

  await page.getByRole('button', { name: /Product/ }).click()
  await expect(page.getByText(/Start with what the user is trying to do/)).toBeVisible()
  await expect(page.locator('#case-sberbank')).toBeInViewport()

  await page.getByRole('button', { name: 'Systems', exact: true }).click()
  await expect(page.locator('#case-apple')).toBeInViewport()
  await page.getByRole('button', { name: /Interface craft/ }).click()
  await expect(page.locator('#case-apple')).toBeInViewport()
  await page.getByRole('button', { name: /People/ }).click()
  await expect(page.locator('#case-adia')).toBeInViewport()

  await page.getByRole('button', { name: 'Switch theme' }).click()
  await expect(page.locator('[data-theme="light"]')).toBeVisible()

  await page.reload()
  await expect(page.locator('[data-theme="light"]')).toBeVisible()
  await page.getByRole('button', { name: 'Switch theme' }).click()
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

test('voice mode is immersive, keyboard-dismissible, and fits a mobile viewport', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        getUserMedia: async () => ({ getTracks: () => [{ stop() {} }] }),
      },
    })
  })
  await page.route('**/api/live-session', (route) => route.fulfill({
    status: 503,
    contentType: 'application/json',
    body: JSON.stringify({ error: 'Realtime voice is not configured on this site yet.' }),
  }))
  const voiceModuleRequests: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('/src/components/Playground.tsx')) {
      voiceModuleRequests.push(request.url())
    }
  })
  await page.goto('/')
  expect(voiceModuleRequests).toHaveLength(0)
  await page.getByRole('button', { name: 'Voice mode' }).click()

  const dialog = page.getByRole('dialog', { name: 'Voice mode' })
  await expect(dialog).toBeVisible()
  expect(voiceModuleRequests).not.toHaveLength(0)
  await expect(dialog.getByRole('heading', { name: 'Voice mode' })).toBeVisible()
  await expect(dialog.getByRole('button', { name: 'Start voice session' })).toBeVisible()
  await expect(dialog.getByText('Your microphone stays off until you start.')).toBeVisible()
  await expect(dialog.getByRole('alert')).toHaveCount(0)
  const subtitleSize = await dialog.getByText('Ask about my work, architecture, or experience.').evaluate(
    (subtitle) => Number.parseFloat(getComputedStyle(subtitle).fontSize),
  )
  expect(subtitleSize).toBeGreaterThanOrEqual(13)
  const transcriptTextSize = await dialog.getByText('“How do you approach architecture?”').evaluate(
    (hint) => Number.parseFloat(getComputedStyle(hint).fontSize),
  )
  expect(transcriptTextSize).toBeGreaterThanOrEqual(13)
  await dialog.getByRole('button', { name: 'Start voice session' }).click()
  await expect(dialog.getByRole('alert')).toContainText(/not configured on this site yet/i)
  await expect(dialog.getByTestId('voice-beam')).toBeVisible()
  await expect(dialog.getByTestId('voice-beam').locator('> div > span')).toHaveCount(37)
  await expect(dialog.getByText('Try asking')).toBeVisible()
  const beamAnimation = await dialog.locator('[data-testid="voice-beam"] .beam-sweep').evaluate(
    (orbit) => getComputedStyle(orbit).animationName,
  )
  expect(beamAnimation).not.toBe('none')

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  )
  expect(hasHorizontalOverflow).toBe(false)

  await page.keyboard.press('Escape')
  await expect(dialog).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Voice mode' })).toBeFocused()
})

test('voice entry point remains separate from the homepage Playground route', async ({ page }) => {
  await page.goto('/')

  await expect(page.getByRole('button', { name: 'Voice mode' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Playground' })).toHaveAttribute('href', '/playground')
  await expect(page.getByRole('grid', { name: 'Virtualized sample project data' })).toHaveCount(0)
  await expect(page.getByText('Ask about the work.')).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Start a voice conversation' })).toHaveCount(0)
})

test('Playground has a dedicated route with interactive tokens and a virtualized grid', async ({ page }) => {
  await page.goto('/playground')

  await expect(page.getByRole('heading', { name: 'Playground' })).toBeVisible()
  await expect(page.getByRole('grid', { name: 'Virtualized sample project data' })).toHaveAttribute('aria-rowcount', '100001')
  await expect(page.getByRole('link', { name: 'Playground' })).toHaveAttribute('aria-current', 'page')

  await page.getByLabel('Corner radius token').focus()
  await page.keyboard.press('ArrowRight')
  await expect(page.locator('#playground')).toHaveCSS('--lab-radius', '9px')

  await page.getByRole('link', { name: 'Work', exact: true }).click()
  await expect(page).toHaveURL('/#work')
  await expect(page.getByRole('heading', { name: 'Not just what I built—how I made it better.' })).toBeVisible()
})

test('command palette searches actions and runs a keyboard-selected easter egg', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Control+k')

  const palette = page.getByRole('dialog', { name: 'Command palette' })
  await expect(palette).toBeVisible()
  await page.getByRole('textbox', { name: 'Search commands' }).fill('surprise')
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status')).toHaveText('You found the hidden command. Good interfaces reward curiosity.')

  await page.keyboard.press('Escape')
  await expect(palette).toHaveCount(0)
})

test('command palette opens the dedicated Playground route', async ({ page }) => {
  await page.goto('/')
  await page.keyboard.press('Control+k')
  await page.getByRole('textbox', { name: 'Search commands' }).fill('playground')
  await page.keyboard.press('Enter')

  await expect(page).toHaveURL('/playground')
  await expect(page.getByRole('grid', { name: 'Virtualized sample project data' })).toBeVisible()
})

test('career index selects a role and updates its overview', async ({ page }) => {
  await page.goto('/')
  await page.locator('#career').scrollIntoViewIfNeeded()

  const careerIndex = page.getByRole('region', { name: 'Career index' })
  const logos = careerIndex.locator('img')
  await expect(logos).toHaveCount(9)
  const activeLogo = careerIndex.getByRole('img', { name: 'ADIA (via Intuitive) logo' })
  await expect.poll(() =>
    activeLogo.evaluate((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0),
  ).toBe(true)

  await expect(page.getByRole('button', { name: 'Career chapters' })).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Era-based bento' })).toHaveCount(0)
  await expect(careerIndex.locator('.stepper-node')).toHaveCount(0)
  const rowBorders = await careerIndex.locator('.career-entry').evaluateAll((rows) =>
    rows.map((row) => getComputedStyle(row).borderTopWidth),
  )
  expect(rowBorders).toEqual(Array(8).fill('0px'))
  const overview = page.getByRole('complementary', { name: 'Role overview' })
  const overviewTextSize = await overview.locator('.index-overview p').evaluate(
    (paragraph) => Number.parseFloat(getComputedStyle(paragraph).fontSize),
  )
  expect(overviewTextSize).toBeGreaterThanOrEqual(13)
  await expect(overview).toContainText('Principal Architect')
  const activeRole = careerIndex.getByRole('button', { name: /ADIA/ })
  const inactiveRole = careerIndex.getByRole('button', { name: /Sberbank/ })
  await expect(activeRole).toHaveAttribute('aria-pressed', 'true')
  await expect(activeRole).toHaveCSS('transition-property', /background/)
  await expect(activeRole).toHaveCSS('border-width', '0px')
  const activeBackground = await activeRole.evaluate((element) => getComputedStyle(element).backgroundColor)
  expect(activeBackground).not.toBe('rgba(0, 0, 0, 0)')
  await page.getByRole('button', { name: /Sberbank/ }).click()
  await expect(inactiveRole).toHaveAttribute('aria-pressed', 'true')
  await expect(overview).toContainText('Lead Software Engineer')
  await expect(overview).toContainText('data visualization and responsiveness')
  const selectedLogo = careerIndex.getByRole('img', { name: 'Sberbank logo' })
  await expect.poll(() =>
    selectedLogo.evaluate((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth > 0),
  ).toBe(true)
  const overviewAnimation = await overview.evaluate((element) => getComputedStyle(element).animationName)
  expect(overviewAnimation).not.toBe('none')
})

test('voice mode explains when realtime credentials are not configured', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'mediaDevices', {
      configurable: true,
      value: {
        getUserMedia: async () => ({ getTracks: () => [{ stop() {} }] }),
      },
    })
  })
  await page.route('**/api/live-session', (route) => route.fulfill({
    status: 503,
    contentType: 'application/json',
    body: JSON.stringify({ error: 'Realtime voice is not configured on this site yet.' }),
  }))
  await page.goto('/')
  await page.getByRole('button', { name: 'Voice mode' }).click()
  await page.getByRole('button', { name: 'Start voice session' }).click()

  await expect(page.getByRole('alert')).toContainText(/not configured on this site yet/i)
  await expect(page.getByText(/Unexpected end of JSON input/)).toHaveCount(0)
})
