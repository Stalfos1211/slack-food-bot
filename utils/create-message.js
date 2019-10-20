module.exports = places => {
  return {
    response_type: 'in_channel',
    blocks: generateBlock(places)
  }
}

const generateBlock = places => {
  let block = []

  block.push({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text:
        "Here are some places you might want to check out.\n\n *Blame Sandi if this doesn't work:*"
    }
  })

  block.push({
    type: 'divider'
  })

  for (place of places) {
    block.push(
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*${place.name}*\n${place.rating} ${place.review_count} reviews\n ${place.address}\n Distance: ${place.distance} mi.
            `
        },
        accessory: {
          type: 'image',
          image_url: place.image_url,
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
            url: place.url
          }
        ]
      },
      {
        type: 'divider'
      }
    )
  }

  return block
}
