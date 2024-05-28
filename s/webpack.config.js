const path = require('path');

module.exports = {
  mode: 'production',
  entry: './index.js',  // Update the entry point based on your project structure
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: "/\.js$/",
        exclude: "/node_modules/",
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};