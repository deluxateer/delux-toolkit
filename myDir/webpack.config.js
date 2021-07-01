// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
// PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';

const HTMLFileOptions = (fileName) => ({
  filename: `${fileName}.html`,
  template: `./views/${fileName}.pug`,
  chunks: [`${fileName}`],
  inject: 'body',
  favicon: path.resolve(__dirname, 'favicon.ico'),
});

const config = {
  context: path.resolve(__dirname, 'src'),
  entry: {
    index: './js/index.js',
    deluxthreads: './js/deluxthreads.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    clean: true,
  },
  devServer: {
    open: true,
    host: 'localhost',
  },
  devtool: isProduction ? false : 'source-map',
  plugins: [
    new HtmlWebpackPlugin(HTMLFileOptions('index')),
    new HtmlWebpackPlugin(HTMLFileOptions('deluxthreads')),
    new ESLintPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        options: { pretty: isProduction ? false : true },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(svg|png|jpg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/img/[hash][ext][query]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    preferRelative: true,
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = 'production';

    config.plugins.push(
      new MiniCssExtractPlugin({ filename: 'css/styles.min.css' })
    );
  } else {
    config.mode = 'development';
  }
  return config;
};
