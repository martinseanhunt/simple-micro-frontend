// Because we're sharing this package (see webpack.config) it ends up being loaded asyncronously.
// This is why we are using this bootstrap.js file and invoking import as a function in index.js
// allows us to mmake sure that the module is loaded before the code is run.
import faker from 'faker'

const mount = (el) => {
  el.innerHTML = `You have ${faker.random.number()} items in your cart`
}

if (process.env.NODE_ENV === 'development') {
  const el = document.querySelector('#dev-cart-dev-only')

  if (el) mount(el)
}

export { mount }
