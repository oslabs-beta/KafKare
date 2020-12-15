const e = require('express');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: path.resolve(__dirname, './src/index.js'), // This is the start of the dependency graph that webpack will build from.
  output: {
    // This is where we want webpack to build our bundle.
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  //React hot loader
  plugins: [new webpack.HotModuleReplacementPlugin()],
  // We need this for our webpack dev server
  devServer: {
    publicPath: 'http://localhost:8080/dist/',
    proxy: {
      // Webpack dev server does not hit the backend. But if we want a request that use the backend, we need a proxy that says if there's a fetch on /api, redirect any request to localhost:3000.
      '/': 'http://localhost:3000/',
    },
    //below line is for  hot module replacement
    hot: true,
  },
  module: {
    rules: [
      {
        // Converts tsx to ES5
        test: /\.tsx?$/i,
        exclude: /(node_modules)/,
        loader: 'ts-loader',
        // use: { //For windows users, instead of the presets here, put in a .babelrc file with the presets.
        //   presets: ['@babel/preset-env', '@babel/preset-react'],
        // },
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
      {
        test: /\.(css|scss)$/i,
        use: [
          // Creates `style` nodes from JS strings (reads this loader last)
          'style-loader',
          // Translates CSS into CommonJS (reads this second)
          'css-loader',
          // Compiles Sass to CSS (reads this first)
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
};
