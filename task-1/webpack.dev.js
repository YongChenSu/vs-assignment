const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const webpack = require('webpack');
const envConst = require('./environment');

module.exports = {
  entry: {
    component: './src/preview.jsx',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'preview'),
    filename: '[name].bundle.js',
    libraryTarget: 'umd',
  },
  devtool: 'eval-source-map',
  devServer: {
    static: [path.resolve(__dirname, 'preview')],
    hot: true,
    port: envConst.PORT,
    host: envConst.HOST,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-react',
                {
                  runtime: 'automatic',
                },
              ],
            ],
            plugins: [require.resolve('react-refresh/babel')],
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|gif)$/,
        type: 'asset',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      title: 'Hot Module Replacement',
      template: './index.html',
      filename: 'index.html',
      chunks: ['component'],
    }),
    new webpack.DefinePlugin({
      LOCAL: true,
    }),
  ],
};
