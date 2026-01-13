import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs'
import path from 'path'
import { MongoClient } from 'mongodb'
//service name is mongoDB

const uri = "mongodb://localhost:27017"
const client = new MongoClient(uri)
let todosLosPrecios = {}

test.only('test', async ({ page }) => {
  await page.goto('https://domicilios.tiendasd1.com/store/12165__622/large-1280',
    { waitUntil: 'domcontentloaded' });

//get the origins of the data
  const fecha = new Date().toLocaleDateString()
  const Hora = new Date().toLocaleTimeString()
  const url = page.url()

  await page.getByRole('combobox', { name: 'Encuentra lo que necesitas en' }).fill('papa capira');
  await page.getByText('PAPA CAPIRA X 2500 G', { waitUntil: 'domcontentloaded' }).click();
  //await page.waitForTimeout(2000);
  const textPapa = await page.getByText('2500 g (g').first().textContent();
  const Papa = extractPrice(textPapa)
  console.log('El precio del gramo de PAPA capira es: ' + Papa.precioGramo)
  console.log('El precio del kilo de PAPA capira es: ' + Papa.precioKilo)


  await page.getByRole('combobox', { name: 'Encuentra lo que necesitas en' }).fill('plátano');
  await page.getByText('PLÁTANO X 1000', { waitUntil: 'domcontentloaded' }).click();
  const textPlatano = await page.getByText('1000 g (g').nth(0).textContent();
  const Platano = extractPrice(textPlatano)
  console.log('El precio del gramo de PLATANO es: ' + Platano.precioGramo)
  console.log('El precio del kilo de PLATANO es: ' + Platano.precioKilo)


  await page.getByRole('combobox', { name: 'Encuentra lo que necesitas en' }).fill('zanahoria');
  await page.getByText('ZANAHORIA X 1000', { waitUntil: 'domcontentloaded' }).click();
  const textZanahoria = await page.getByText('1000 g (g').nth(0).textContent();
  const Zanahoria = extractPrice(textZanahoria)
  console.log('El precio del gramo de ZANAHORIA es: ' + Zanahoria.precioGramo)
  console.log('El precio del kilo de ZANAHORIA es: ' + Zanahoria.precioKilo)


 

  /*
  await page.getByRole('combobox', { name: 'Encuentra lo que necesitas en' }).fill('platano');
  await page.getByRole('combobox', { name: 'Encuentra lo que necesitas en' }).press('Enter');
 
  await page.getByRole('combobox', { name: 'Encuentra lo que necesitas en' }).click();
  await page.getByRole('combobox', { name: 'Encuentra lo que necesitas en' }).fill('atun');
 */

  //const completePath = "C:/Users/Happycow3/pwAutomation/data/precios.json"
  const completePath = path.join(process.cwd(), 'pwAutomation', 'data', 'precios.json');
  //todosLosPrecios = { Zanahoria, Platano, Papa }
  console.log("the complete path created in path.join is: " + completePath)
  todosLosPrecios = { "origins": {fecha, Hora, url},
     "productos": {Zanahoria, Platano, Papa }}

  try {

    await fs.writeFile(completePath, JSON.stringify(todosLosPrecios, null, 2), 'utf-8')
  } catch (error) {
    console.error("Error writing precios.json:", error)
  }

  //insert data into mongoDB  
  //runDB().catch(console.dir)

})



function extractPrice(text) {
  const array = text.split('$')

  //replace the characters space, parenthesis and empty with '':
  const deleteCharacters = array[1].replace(/[ )(]/g, '')
  const replaceComma = deleteCharacters.replace(',', '.')
  const precioGramo = replaceComma
  const precioKilo = (precioGramo * 1000)
  const precios = { precioGramo, precioKilo }
  return precios
}


async function runDB() {
  await client.connect()
  const db = client.db("dataEx")
  const users = db.collection("precios")
  await users.insertOne({ todosLosPrecios })
}