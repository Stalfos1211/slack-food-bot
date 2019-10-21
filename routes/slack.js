const express = require('express')
const router = express.Router()
const utils = require('../utils')

module.exports = () => {
  router.post('/places-to-eat', async (req, res) => {
    console.log('req:', req.body)
    const text = req.body.text
    console.log('text:', text)

    let numberToShow = 1
    if (text.length > 0 && text.includes('show')) {
      numberToShow = Number(text.match(/show\s(\d{1,2})/)[1])
    }

    let placesToEat = await utils.getPlacesToEat(numberToShow)
    let message = utils.createMessage(placesToEat)

    res.json(message)
  })

  return router
}
