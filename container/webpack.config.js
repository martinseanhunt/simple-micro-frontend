const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  devServer: {
    port: 8080,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    new ModuleFederationPlugin({
      // Don't actually need to provide a name for hosts, only remotes but adding
      // here for clarity.
      name: 'container',
      // List different micro-FEs that the container can search to find modules
      remotes: {
        // The key specifies the name we import modules from e.g. [key]/ProductsIndex products/ProductsIndex
        // products@http://localhost:8081/remoteEntry.js = ["name" of remote]@[url to remote entry file]
        products: 'products@http://localhost:8081/remoteEntry.js',
        cart: 'cart@http://localhost:8082/remoteEntry.js',
      },
    }),
  ],
}
