import { writeFile } from '../utils/fs';

const webpackConfig = `
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const isProd = env.production || argv.mode === 'production';

  return {
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      name: isProd ? '[name]_[contenthash].js' : '[name].js'
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    devtool: isProd ? null : 'inline-source-map',
    devServer: {
      port: 8080,
      host: '0.0.0.0',
      contentBase: path.join(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'public/index.html')
      }),
      new MiniCssExtractPlugin({
        filename: isProd ? '[name]_[contenthash].css' : '[name].css'
      })
    ]
  };
};
`.trim();

export const generateWebpackConfig = async () => {
  writeFile('webpack.config.js', webpackConfig);
};
