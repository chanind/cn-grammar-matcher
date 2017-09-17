var path = require('path');
var webpack = require('webpack');
var Clean = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const output = process.env.OUTPUT || '/dist';

var config = {
  entry: {
    demo: path.resolve(__dirname, 'demo/index.js'),
  },
  output: {
    path: path.join(__dirname, output),
    publicPath: '/',
    filename: 'js/[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['stage-3', 'react'],
        },
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          'css-loader?sourceMap&modules&camelCase=dashes!sass-loader?sourceMap'
        ),
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=5120',
      },
    ],
  },
  node: {
    net: 'empty',
    fs: 'empty',
    tls: 'empty',
  },
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  resolve: {
    alias: {
      mods: path.resolve(__dirname, 'js', 'mods'),
      css: path.resolve(__dirname, 'css'),
      pics: path.resolve(__dirname, 'pics'),
    },
  },
  devtool: 'source-map',
  plugins: [
    new Clean(['dist']),
    new webpack.DefinePlugin({
      'process.env': {
        NLP_HOST: JSON.stringify(process.env.NLP_HOST),
      },
    }),
    new ExtractTextPlugin('css/[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'demo/index.ejs',
      chunks: ['demo'],
    }),
    new CopyWebpackPlugin([{ from: path.resolve(__dirname, 'demo/assets') }]),
  ],
};

module.exports = config;
