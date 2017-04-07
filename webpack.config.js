var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    // filename: "[name].[contenthash].css",
    filename: "bundle.css",
    disable: process.env.NODE_ENV === "development"
});

module.exports = {
  entry: ['./app/components/index.js'],
  output: {
    path: path.resolve(__dirname, 'app/build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          },{
            loader: 'sass-loader'
          }],
          fallback: "style-loader"
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [
            'react',
            'latest',
            'stage-3',
            // 'react-hmre',
          ]
        }
      }
    ]
  },
  plugins: [
    extractSass
  ],
  devtool: 'source-map'
}
