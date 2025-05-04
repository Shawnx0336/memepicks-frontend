const path = require('path');

module.exports = {
  entry: './webpack-entry.js',
  output: {
    filename: 'privy-sdk.js',
    path: path.resolve(__dirname, 'public/js'),
    library: 'Privy',
    libraryTarget: 'window'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            sourceType: 'unambiguous'
          }
        }
      }
    ]
  },
  experiments: {
    outputModule: true
  }
};
