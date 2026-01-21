import { test, expect } from '@playwright/test'
import { promises as fs } from 'fs'
import path from 'path'
import { MongoClient, ServerApiVersion } from 'mongodb'
import dotenv from 'dotenv'

//service name is mongoDB

const uri = "mongodb://localhost:27017"
//load the environment variables from the .env file
dotenv.config();
const uri2 = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@aws-brazil.ko7kqo1.mongodb.net/?appName=AWS-brazil`
console.log("The connection uri2 is: " + uri2)
const client = new MongoClient(uri)

  //create the mongoDB client for the remote server? 
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const remoteClient = new MongoClient(uri2, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

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
  const textPlatano = await page.getByText('1000 g (g').first().textContent();
  const Platano = extractPrice(textPlatano)
  console.log('El precio del gramo de PLATANO es: ' + Platano.precioGramo)
  console.log('El precio del kilo de PLATANO es: ' + Platano.precioKilo)


  await page.getByRole('combobox', { name: 'Encuentra lo que necesitas en' }).fill('zanahoria');
  await page.getByText('ZANAHORIA X 1000', { waitUntil: 'domcontentloaded' }).click();
  const textZanahoria = await page.getByText('1000 g (g').first().textContent();
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
  const completePath = path.join(process.cwd(),  'data', 'precios.json');
  //todosLosPrecios = { Zanahoria, Platano, Papa }
  console.log("the complete path created in path.join is: " + completePath)
  todosLosPrecios = { "origins": {fecha, Hora, url},
     "productos": {Zanahoria, Platano, Papa }}

  try {

    await fs.writeFile(completePath, JSON.stringify(todosLosPrecios, null, 2), 'utf-8')
  } catch (error) {
    console.error("Error writing precios.json:", error)
  }




  //insert data into local mongoDB  
  //runDB().catch(console.dir)

  //run the remote mongoDB connection test
  await runRemoteDB().catch(console.dir)

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


async function runLocalDB() {
  await client.connect()
  const db = client.db("dataEx")
  const users = db.collection("precios")
  
  await users.insertOne({ todosLosPrecios })
}

async function runRemoteDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await remoteClient.connect();
    // Send a ping to confirm a successful connection
    await remoteClient.db(undefined).command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    const db = remoteClient.db("dataEx")
    const users = db.collection("precios")
    await users.insertOne({ todosLosPrecios })

  } catch (error) {
    console.error("Error inserting into MongoDB:", error)
  }finally {
    // Ensures that the client will close when you finish/error
    await remoteClient.close();
  }
}