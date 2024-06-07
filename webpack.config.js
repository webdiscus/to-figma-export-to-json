const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlBundlerPlugin({
      // define pages (key is output filename w/o `.html`)
      entry: {
        index: 'build/ui.html', // => dist/index.html
      },
      js: {
        // JS output filename, used if `inline` option is false (defaults)
        filename: 'js/[name].[contenthash:8].js',
        inline: true, // inlines JS into HTML
      },
      css: {
        // CSS output filename, used if `inline` option is false (defaults)
        filename: 'css/[name].[contenthash:8].css',
        inline: true, // inlines CSS into HTML
      },
      minify: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'build/manifest.json', to: 'manifest.json' },
        { from: 'build/code.js', to: 'code.js' }
      ]
    })
  ],
  mode: 'production',
};
