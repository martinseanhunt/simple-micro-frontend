// Because we're sharing this package (see webpack.config) it ends up being loaded asyncronously.
// This is why we are using this bootstrap.js file and invoking import as a function in index.js
// allows us to mmake sure that the module is loaded before the code is run.
import faker from 'faker'

/* Pre refactor - now moved to mount:
let products = ''

for (let i = 0; i < 3; i++) {
  const name = faker.commerce.productName()
  products += `<div>${name}</div>`
}
*/

// Using this query selector we're making an assumption that this div can be found both in
// this services index.html AND the container FE. This could be quite fragile (what if another team
// edits the index.html file in the containg FE?)
// document.querySelector('#dev-products').innerHTML = products

// The changes that we need to make to overcome this fragility are:

// Scenario 1:
// When we are running this file in development mode & awe're running it in isolation - we're using the local inde/
// html file. so we know it has an ID of dev-products.
// In this case we want to immediately render the app in to that element.
// - check that we're running the project in development mode
if (process.env.NODE_ENV === 'development') {
  // Check that we're running this fe service in isolation by using a unique identifier
  // in the local index.html file (which is only run when we're in isolation) and using
  // an identifier for the div that we can be confident will be unique and never used by the container.
  const el = document.querySelector('#dev-products-dev-only')

  // if the element exists, render to it. If not, we let the host  service invoke mount
  if (el) mount(el)
}

// Scenario 2:
// Running the file in development or production via the contianer FE.
// There is no garuntee that the element with id dev-products exits.
// We don't want to immediately try to render or we'll end up with an error if the element
// doesn't exist. We want to allow the container to decide if, when and where to render This
// micro-FE

// This function is going to help us handle these two scenarios:
// takes in a reference to a html element and renders our app in to the passed element
function mount(el) {
  let products = ''

  for (let i = 0; i < 3; i++) {
    const name = faker.commerce.productName()
    products += `<div>${name}</div>`
  }

  el.innerHTML = products
}

export { mount }
