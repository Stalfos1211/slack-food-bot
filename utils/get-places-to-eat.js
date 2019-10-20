const axios = require('axios')

module.exports = async (numberOfPlaces = 1) => {
  const places = (await axios.get(
    'https://where-to-eat-backend.herokuapp.com/getResults/restaurant/78750/50/7000/1,2/true'
  )).data

  return getRandomPlaces(places, numberOfPlaces)
}

const getRandomPlaces = (places, numberOfPlaces) => {
  let randomPlaces = []

  for (let i = 0; i < numberOfPlaces; i++) {
    let randomNumber = Math.floor(Math.random() * places.length)
    let randomPlace = places[randomNumber]
    places.splice(randomNumber, 1)
    let {
      name,
      image_url,
      url,
      distance,
      rating,
      review_count,
      location
    } = randomPlace
    randomPlaces.push({
      name,
      image_url,
      url,
      distance: Math.round(100 * (distance / 1609.344)) / 100,
      address: location.display_address.join(','),
      rating: toStars(rating),
      review_count
    })
  }
  return randomPlaces
}

const toStars = rating => {
  let stars = ''
  for (let i = 0; i < Math.ceil(rating); i++) {
    stars += ':star:'
  }
  return stars
}
