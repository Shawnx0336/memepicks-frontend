const path = require('path');

module.exports = {
  entry: './node_modules/@privy-io/js-sdk-core/dist/cjs/index.js',
  output: {
    filename: 'privy-sdk.js',
    path: path.resolve(__dirname, 'public/js'),
    library: 'Privy',
    libraryTarget: 'var'
  },
  mode: 'production'
};
