const path = require('path');

module.exports = {
  entry: './node_modules/@privy-io/js-sdk-core/dist/cjs/client/Privy.js',
  output: {
    filename: 'privy-sdk.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'Privy',
    libraryTarget: 'umd'
  },
  mode: 'production'
};
