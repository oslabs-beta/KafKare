const path = require('path');

module.exports = {
  mode: 'development',
  entry: './main.ts',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        // Converts jsx to ES5
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        // use: { //For windows users, instead of the presets here, put in a .babelrc file with the presets.
        //   presets: ['@babel/preset-env', '@babel/preset-react'],
        // },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
};
