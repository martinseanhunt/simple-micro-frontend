// Because we're sharing this package (see webpack.config) it ends up being loaded asyncronously.
// This is why we are using this bootstrap.js file and invoking import as a function in index.js
// allows us to mmake sure that the module is loaded before the code is run.
import faker from 'faker'

let products = ''

for (let i = 0; i < 3; i++) {
  const name = faker.commerce.productName()
  products += `<div>${name}</div>`
}

document.querySelector('#dev-products').innerHTML = products
