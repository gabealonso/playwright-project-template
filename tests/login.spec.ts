import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { waitAndClick, waitToBeVisible } from '../helpers/commons';

dotenv.config();
const elements = JSON.parse(fs.readFileSync(path.join(__dirname, '../helpers/elements.json'), 'utf-8'));

test('Login', async ({ page }) => {
  await page.goto('/');

  const loginElements: string[] = [
    elements['login-email-input'], 
    elements['login-password-input'], 
    elements['cta-login-button']
  ];

  /** login */
  await waitAndClick({ 
    page, 
    selector: elements['sign-in-up-button']
  });
  await waitToBeVisible({ page, selectors: loginElements });
  await page.locator(elements['login-email-input']).fill(process.env.EMAIL!);
  await page.locator(elements['login-password-input']).fill(process.env.PASS!);
  await page.locator(elements['cta-login-button']).click();
  
  await waitToBeVisible({ 
    page, 
    selectors: [elements['logged-in-as']] 
  });
  
  await expect(page.locator(elements['logged-in-as'])).toBeVisible();
  
});