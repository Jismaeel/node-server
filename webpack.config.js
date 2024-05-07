const path = require('path');

module.exports = {
  entry: {
    contactform: './contactform.js',
    memberShipform: './memberShipform.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};
