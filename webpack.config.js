const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: 'public/index.html',
    }),
    new CopyPlugin([
      {
        from: 'public/assets',
        to: 'assets',
      }
    ]),
  ],
  devServer: {
    contentBase: './dist',
    compress: true,
    disableHostCheck: true,
    port: 3000,
    host: '0.0.0.0',
    hot: true,
    inline: true,
  },
};
