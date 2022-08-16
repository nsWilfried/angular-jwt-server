const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
// Express APIs
const router = require('./router/authRouter')
mongoose
  .connect('mongodb+srv://nsWilfried:wilfried0640@cluster0.4kjx0ye.mongodb.net/?retryWrites=true&w=majority')
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch((err) => {
    console.error('Error connecting to mongo', err)
  })


// Express settings
const app = express()
app.use(bodyParser.urlencoded({
  extended:  false
}))
app.use(bodyParser.json())
app.use(cors())
app.use('/api', router)
// Serve static resources
// Define PORT
const port = 4000
const server = app.listen(port, () => {
  console.log('Connected to port ' + port)
})
