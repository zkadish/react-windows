var path = require('path');

module.exports = {
  entry: ['./app/components/app.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        loader: ['style', 'css', 'sass']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: [
            'react',
            'latest',
            'stage-3'
          ]
        }
      }
    ]
  },
  devtool: 'source-map'
}
