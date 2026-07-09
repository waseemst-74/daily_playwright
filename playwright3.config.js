import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://uat.trellisplatform.com',
    headless: true,
    workers : 2
  },
});
