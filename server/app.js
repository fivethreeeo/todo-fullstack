const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
require('dotenv').config()

const app = express()
app.use(bodyParser.json())
app.use(cors())
app.use('/api', indexRouter)

const mongoURI = process.env.MONGODB_URI_PROD

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log('mongoose connected')
  })
  .catch(err => {
    console.log('DB connection error: ', err)
  })

app.listen(process.env.PORT || 5000, () => {
  console.log('Server is running on port 5000')
})
