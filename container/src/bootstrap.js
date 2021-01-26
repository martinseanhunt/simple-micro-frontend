// importing our products list from the products fe service. This looks for a div with id="dev-products"
// which we've added to the index.html in this fe service and renders a list of products to it.

// since our refactor we're now importin gmount functions so we can control exactly what element
// we render the micro FE's app to.
import { mount as mountProducts } from 'products/ProductsIndex'
import { mount as mountCart } from 'cart/CartIndex'

// Now we can use a div ID that we know exists in this container
const productsContainer = document.querySelector('#dev-products')
mountProducts(productsContainer)

const cartContainer = document.querySelector('#dev-cart')
mountCart(cartContainer)

console.log('I am the container')
