import faker from 'faker'

document.querySelector(
  '#dev-cart'
).innerHTML = `You have ${faker.random.number()} items in your cart`
