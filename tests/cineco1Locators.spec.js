import { test, expect } from '@playwright/test'

test('test1', async ({ context }) => {


  
    const page = await context.newPage()

    await context.grantPermissions(['geolocation'], {
        origin: 'https://www.cinecolombia.com/',
    })
     
    //medellin 6.248292472644606, -75.59220486861615
    //armenia  4.537817645012435, -75.68948304500293
    await context.setGeolocation({ latitude: 4.537817645012435, longitude: -75.68948304500293 })

    await page.goto('https://www.cinecolombia.com')

/*
  await page.getByLabel('Ciudad').selectOption('popayan');
  await page.getByRole('button', { name: 'Aceptar' }).nth(1).selectOption('popayan');
  await page.getByLabel('Ciudad').click();
  await page.getByRole('button', { name: 'Aceptar' }).nth(1).click();
   */

    const countSelectCity = await page.getByText(/Seleccionar.../i).count()

    if (countSelectCity>0) {
         await page.getByLabel('Ciudad').selectOption('popayan');
         await page.getByRole('button', { name: 'Aceptar' }).nth(1).click();
    } else {
        console.log("city selection not loading")
    }

    //bypassing the popup using page.$('object') ElementHandle
        const deleteActions = await page.$("span[class='delete']")
        if (deleteActions) {
            await deleteActions.click()
        } else {
            console.log("delete popup not loading")
        }
    // await page.locator("span[class='delete']").click()

    //bypassing the cookie popup using locator.count()
    const cookieCount = await page.locator(".button.is-outlined.has-shadow").count()

    if (cookieCount > 0) {
        await page.locator(".button.is-outlined.has-shadow").click()
    } else {
        console.log("terms and conditions not loading")
    }

    //await page.locator("text=Ver horarios y precios").click()
    //await page.locator(":has-text('Ver horarios y precios')").click()


    //await page.waitForTimeout(10000)
    //await page.locator(".button.is-outlined.has-shadow").click()
 



})