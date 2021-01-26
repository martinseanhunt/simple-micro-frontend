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

      // filename is the file name of a manifest that the plugin will create which contains all the differnet files
      // and dependencies that this micro front end is exposing via the module federation plugin.
      // Tells other fe services (i.e. our container) how to load
      // resources from this fe service.
      filename: 'remoteEntry.js',

      // telling the plugin which modules are to be exposed and the path on which to expose them. These can then be
      // imported in to modules in other services using [name as defined in host]/[exposes key]
      // e.g. import 'products/ProductsIndex'
      exposes: {
        './ProductsIndex': './src/index',
      },

      // Shared are packages which maight be being used in multiple micro front ends. This makes sure the
      // package only needs to be loaded once by a host if multiple FE's use the package.

      // IMPORTANT NOTE: Marking a package as shared here causes it to be loaded asyncronously by this
      // fe-service so we get an error message if we try to run the development version of this service
      // in isolation (It works fine when being loaded by the container becuase the remoteEntry file handles
      // this automagically.).

      // If the multiple FE's are using significantly different versions (as defined by whatever rules
      // are set in package.json - ^ ~ etc) of the dependancy, the host will load both versios of the
      // dependency to avoid unexpected issues if a particular FE requires a diferent version for a good reason.

      // Can be a simple array
      shared: ['faker'],

      // Some packages (notably react) do not allow for muliple copies of the package to be loaded in to the browser
      // and will error. TO handle this we can explicitly tell module federation to only ever use a single verison
      // of a package, even if multiple versions are requested by markign it as a singleton. In this case the newest
      // requested version of a given package will be used by the container. A warning message will also be displayed
      // in the console.

      /* We would use this instead of the array structure above: 
      shared: {
        faker: {
          singleton: true
        }
      }
      */
    }),
  ],
}
