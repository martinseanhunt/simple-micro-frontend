const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  mode: 'development',
  devServer: {
    port: 8081,
  },
  plugins: [
    // Loads bundled files in to /public/index.html
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    // Using to connect micro front ends
    new ModuleFederationPlugin({
      name: 'products',
      // The remote entry point to our micro front end. This is a sererate bundle to our
      // regular budle. They're both created so we can still run our micro front end in isolation (bundled in
      // to dist/main.js). remoteEnty is emitting a second set of files from webpack which are exposed to other
      // micro front ends.

      // remoteEntry is kind of a manifest containing all the differnet files and dependencies that this micro front end
      // is exposing vua the module federation plugin. Tells other fe services (i.e. our container) how to load
      // resources from this fe service.
      filename: 'remoteEntry.js',

      // telling the plugin which modules are to be exposed and the name on which to expose them. These can then be
      // imported in to modules in other services using [name]/[exposes.key] e.g. import 'products/ProductsIndex'
      exposes: {
        './ProductsIndex': './src/index',
      },
    }),
  ],
}
