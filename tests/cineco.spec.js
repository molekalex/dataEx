const { chromium } = require('playwright')
import { test, expect } from '@playwright/test'


test('cineco e2e', async () => {

  const browser = await chromium.launch({
    headless: false
  })

  const context = await browser.newContext()
  const page = await context.newPage()
  const pop1 = page.getByRole
  await page.goto('https://www.cinecolombia.com/')
  //await page.getByLabel('Ciudad').selectOption('armenia');
  //close delete popup:
  await page.locator("span[class='delete']").click()
  await page.locator(".button.is-outlined.has-shadow").click()

  await page.getByRole('button', { name: 'Aceptar' }).nth(1).selectOption('armenia')
  await page.getByLabel('Ciudad').click()
  await page.getByRole('button', { name: 'Aceptar' }).nth(1).click()
  await page.getByRole('button', { name: 'Aceptar' }).click()
  
  await page.getByRole('button').filter({ hasText: /^$/ }).first().click()
  await page.getByRole('banner').getByRole('button').nth(3).click()
  await page.getByRole('textbox', { name: 'Usuario / Correo*' }).click()
  await page.getByRole('textbox', { name: 'Usuario / Correo*' }).fill('lexis22evolutiongames1@gmail.com')
  await page.getByRole('textbox', { name: 'Contraseña*' }).click()
  await page.getByRole('textbox', { name: 'Contraseña*' }).fill('Aquiteveo543-')
  await page.getByRole('button', { name: 'Ingresar' }).click()
  await page.getByRole('link', { name: 'Mis Tarjetas Cineco' }).click()
  await expect(page.getByRole('heading', { name: 'No cuentas con Tarjetas Cineco' })).toBeVisible()
  await page.getByRole('button', { name: 'll' }).click()
  await page.getByRole('link', { name: 'Mis Transacciones' }).click()
  await expect(page.locator('#app')).toContainText('No   hay transacciones disponibles para el año seleccionado.');
  await page.getByRole('button', { name: 'll' }).click()
  await page.getByRole('link', { name: 'Mis Compras' }).click()
  await expect(page.locator('#app')).toContainText('No has realizado compras.')

  // ---------------------
  await context.close()
  await browser.close()
})