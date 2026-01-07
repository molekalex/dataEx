
const {test, expect} = require('@playwright/test')
const {boy, uribe} = require('./demo/fun.js')

test('primero', async function({page}){
    //test steps
    await page.goto('https://www.wikipedia.org/')
    await expect(page).toHaveTitle(/Wikipedia/)
    await page.getByRole('link', { name: 'English 7,009,000+ articles' }).click()
    await expect(page.getByRole('heading', { name: 'Welcome to Wikipedia' })).toBeVisible();
    await page.getByRole('link', { name: 'Help' }).click()


})
