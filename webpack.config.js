// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');

// PLUGINS
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PugLintPlugin = require('puglint-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const { extendDefaultPlugins } = require('svgo');

const isProduction = process.env.NODE_ENV == 'production';

const HTMLFileOptions = fileName => ({
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
    filename: 'js/[name].bundle.js',
    clean: true,
  },
  target: 'web',
  devServer: {
    open: true,
    host: 'localhost',
  },
  devtool: isProduction ? false : 'source-map',
  plugins: [
    new HtmlWebpackPlugin(HTMLFileOptions('index')),
    new HtmlWebpackPlugin(HTMLFileOptions('deluxthreads')),
    new PugLintPlugin({
      files: '**/*.pug',
      config: Object.assign({ emitError: true }, require('./.pug-lintrc.json')),
    }),
    new StylelintPlugin(),
    new ESLintPlugin(),

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        include: path.resolve(__dirname, 'src'),
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
      new MiniCssExtractPlugin({ filename: 'css/styles.min.css' }),
      new ImageMinimizerPlugin({
        minimizerOptions: {
          // Lossless optimization with custom option
          // Feel free to experiment with options for better result for you
          plugins: [
            ['gifsicle', { interlaced: true }],
            ['jpegtran', { progressive: true }],
            ['optipng', { optimizationLevel: 5 }],
            // Svgo configuration here https://github.com/svg/svgo#configuration
            [
              'svgo',
              {
                plugins: extendDefaultPlugins([
                  {
                    name: 'removeViewBox',
                    active: false,
                  },
                  {
                    name: 'addAttributesToSVGElement',
                    params: {
                      attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
                    },
                  },
                ]),
              },
            ],
          ],
        },
      })
    );
  } else {
    config.mode = 'development';
  }
  return config;
};
