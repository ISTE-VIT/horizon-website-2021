const path = require('path')
const coordinators = require('./coordinators')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackPwaManifest = require('webpack-pwa-manifest')
// const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  entry: {
   technica: path.join(__dirname, './src/technica/technica.js'),
    horizon: path.join(__dirname, './src/horizon.js'),
    common: path.join(__dirname, './src/common.js'),
  },

  module: {
    rules: [{ test: /\.ejs$/i, use: [{ loader: 'ejs-easy-loader' }] }],
  },
  plugins: [
    // new WebpackPwaManifest({
    //   name: 'Horizon',
    //   short_name: 'Horizon',
    //   orientation: 'portrait',
    //   description: `ISTE-VIT's annual tech fest`,
    //   background_color: '#000',
    //   'theme-color': '#000',
    //   filename: 'manifest.json',
    //   // serviceWorker: '',
    //   //   crossorigin: 'use-credentials', //can be null, use-credentials or anonymous
    //   icons: [
    //     {
    //       src: path.resolve('src/assets/horizon-logo.png'),
    //       sizes: [96, 128, 192, 256, 384, 512, 1024], // multiple sizes
    //     },
    //     // {
    //     //   src: path.resolve('src/assets/large-icon.png'),
    //     //   size: '1024x1024', // you can also use the specifications pattern
    //     // },
    //     {
    //       src: path.resolve('src/assets/horizon-logo.png'),
    //       size: '1024x1024',
    //       purpose: 'maskable',
    //     },
    //   ],
    //   //   apple : tr
    // }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/webdev/webdev.ejs'),
      filename: path.join(__dirname, '/dist/webdev/index.html'),
      chunks: ['webdev', 'common'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/codeasymptote/codeasymptote.ejs'),
      filename: path.join(__dirname, '/dist/codeasymptote/index.html'),
      chunks: ['codeasymptote', 'common'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/photonix/photonix.ejs'),
      filename: path.join(__dirname, '/dist/photonix/index.html'),
      chunks: ['photonix', 'common'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/automate/automate.ejs'),
      filename: path.join(__dirname, '/dist/automate/index.html'),
      chunks: ['automate', 'common'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/technica/technica.ejs'),
      filename: path.join(__dirname, '/dist/technica/index.html'),
      chunks: ['technica', 'common'],
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src/horizon.ejs'),
      filename: path.join(__dirname, '/dist/index.html'),
      chunks: ['horizon', 'common'],
      coordinators,
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // exclude: [/\.(?:html|js|css)$/],
    //   runtimeCaching: [
    //     {
    //       // Match any request that ends with .png, .jpg, .jpeg or .svg.
    //       // urlPattern: /\.(png|jpg|jpeg|svg|pdf)$/,
    //       // Apply a cache-first strategy.
    //       // handler: 'staleWhileRevalidate',
    //       // options: {
    //       //   // Use a custom cache name.
    //       //   // cacheName: 'images',
    //       //   // Only cache 10 images.
    //       //   // expiration: {
    //       //   //   maxEntries: 10,
    //       //   // },
    //       // },
    //     },
    //   ],
    // }),
  ],
}
