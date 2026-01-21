// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { time } from 'console';
require('dotenv').config();





/**
 * @see https://playwright.dev/docs/test-configuration
 */


const config = ({
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
timeout: 40*1000,  
  
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on',
  },

});

module.exports = config