//const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';
//global variable.
let webContext;


test.beforeAll(async ({ browser }) => {
    //create the context
    const context = await browser.newContext()
    //create the page associated to the context, all variables will be loaded into context storage level. not page level
    const page = await context.newPage()


    await page.goto('https://domicilios.tiendasd1.com/login')
    await page.getByTestId('auth-signIn-form-email-email').fill('desorale@gmail.com')
    await page.getByTestId('auth-signIn-form-password-password').fill('Mercaos2026')
    await page.getByTestId('form-builder-form-submit').click()

    //wait for correct state : seems its not necesary
    //await page.waitForLoadState('networkidle')

    //save storage info: (cookies, origins)  into a file:
    await context.storageState({ path: 'state.json' })
    //inject the storage state into a new context
    webContext = await browser.newContext({ storageState: 'state.json' })


})

test('test with login via storage state', async ({}) => {


    //create a variable named page associated to the global webContext
    const page = await webContext.newPage()

    //the following line will bypass the login 'cos the  webcontext load the cookies 
    // info from the storage state in the testBeforeAll step.
    await page.goto('https://domicilios.tiendasd1.com/login')
    await page.waitForTimeout(20000)
    
});