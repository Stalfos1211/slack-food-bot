const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = process.env.PORT || 1337
const axios = require('axios')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.post('/slack', async (req, res) => {
  console.log('req:', req.body)
  res.json(await getPlacesToEat())
})

const getPlacesToEat = async () => {
  const res = await axios.get(
    'https://where-to-eat-backend.herokuapp.com/getResults/restaurant/78750/50/7000/1,2/true'
  )
  const locations = res.data

  return createMessage(getRandomPlace(locations))
}

const createMessage = info => {
  return {
    response_type: 'in_channel',
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            "Here are some places you might want to check out.\n\n *Blame Sandi if this doesn't work:*"
        }
      },
      {
        type: 'divider'
      },
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${info.name}*\n${info.rating} ${info.review_count} reviews\n ${info.address}\n Distance: ${info.distance} mi.
          `
        },
        accessory: {
          type: 'image',
          image_url: info.image_url,
          alt_text: 'alt text for image'
        }
      },
      {
        type: 'actions',
        elements: [
          {
            type: 'button',
            text: {
              type: 'plain_text',
              text: 'Yelp Link'
            },
            url: info.url
          }
        ]
      },
      {
        type: 'divider'
      }
    ]
  }
}

const toStars = rating => {
  let stars = ''
  for (let i = 0; i < Math.ceil(rating); i++) {
    stars += ':star:'
  }
  return stars
}

const getRandomPlace = locations => {
  let randomLocation = locations[Math.floor(Math.random() * locations.length)]
  let {
    name,
    image_url,
    url,
    distance,
    rating,
    review_count,
    location
  } = randomLocation
  return {
    name,
    image_url,
    url,
    distance: Math.round(100 * (distance / 1609.344)) / 100,
    address: location.display_address.join(','),
    rating: toStars(rating),
    review_count
  }
}

app.listen(port, () => console.log(`listening on port ${port}`))
