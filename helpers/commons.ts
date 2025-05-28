import { Page, expect } from '@playwright/test';

const DEFAULT_TIMEOUT = 5000;

export async function waitAndClick(options:{page: Page, selector: string}) {
  const { page, selector } = options;
  await page.waitForSelector(selector, { timeout: DEFAULT_TIMEOUT, state: 'visible' });
  const element = page.locator(selector);
  await element.click();
}

export async function waitToBeVisible(options:{page: Page, selectors: string[]}) {
  const { page, selectors } = options;
  for (const selector of selectors) {
    await page.waitForSelector(selector, { timeout: DEFAULT_TIMEOUT, state: 'visible' });
  }
}

export async function assertEqual(options:{actual: any, expected: any, message: string}): Promise<void> {
  const { actual, expected, message } = options;
  try {
    expect(actual).toBe(expected);
  } catch (error) {
    console.error(`❌ ${message}\n Expected: "${expected}", but got: "${actual}"`);
    throw error;
  }
}
