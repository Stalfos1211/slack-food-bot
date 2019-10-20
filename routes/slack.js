const express = require('express')
const router = express.Router()
const utils = require('../utils')

module.exports = () => {
  router.post('/places-to-eat', async (req, res) => {
    console.log('req:', req.body)
    const text = req.body.text

    let placesToEat = await utils.getPlacesToEat()
    let message = utils.createMessage(placesToEat)

    res.json(message)
  })

  return router
}
