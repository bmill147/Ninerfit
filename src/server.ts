import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import db from './db'

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('NinerFit API is running!')
})

app.get('/data', async (req, res) => {
  try {
    const result = await db.selectFrom('your_table').selectAll().execute()
    res.json(result)
  } catch (error) {
    console.error('Error fetching data:', error)
    res.status(500).send('Internal Server Error')
  }
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
