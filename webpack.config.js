const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './build/assets/js/ui.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
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
    new MiniCssExtractPlugin({
      filename: 'styles.css'
    }),
    new HtmlWebpackPlugin({
      template: 'build/ui.html',
      inject: 'body'
    }),
    new HtmlInlineCSSWebpackPlugin(),
    new ScriptExtHtmlWebpackPlugin({
      inline: 'bundle.js' // This will inline the bundle.js script
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
