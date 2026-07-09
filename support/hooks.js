const { BeforeAll, Before, After, AfterStep, Status } = require('@cucumber/cucumber')
const { POManager } = require('../../pageObjects/POManager');
const { chromium } = require('playwright');
const { playwright } = require('@playwright/test');


 


Before( { timeout: 100 * 1000 },async function () {
   const browser = await chromium.launch({ headless: false });
   const context = await browser.newContext();
   this.page = await context.newPage();
   this.poManager = new POManager(this.page);
});

After( { timeout: 100 * 1000 },async function () {
   //await this.poManager.closeBrowser();
   console.log("Closing the browser...");
});

AfterStep   ( async function (result) {
   if (result.status === Status.FAILED)  
        {
            await this.page.screenshot({path: 'failure_screenshot.png'});
        }
   });