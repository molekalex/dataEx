const { chromium } = require('@playwright/test');

     (async () => {
     const browser = await chromium.launchPersistentContext('', { headless: false });
      const page = await browser.newPage();
       await page.goto('https://domicilios.tiendasd1.com/login');
        // Wait for manual login 
        await page.waitForTimeout(120*1000); // 120s to log in manually
         // Save storage state
         await page.context().storageState({ path: 'storageState.json' });
          await browser.close();
         })();