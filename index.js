const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 1337

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/slack', (req, res) => {
  console.log('req:', req.body)
  res.json({
    text: "It's 80 degrees right now.",
    attachments: [
      {
        text: 'Partly cloudy today and tomorrow'
      }
    ]
  })
})

app.listen(port, () => console.log(`listening on port ${port}`))
