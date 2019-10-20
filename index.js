const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 1337
const routes = require('./routes')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/slack', routes.slack())

app.listen(port, () => console.log(`listening on port ${port}`))
