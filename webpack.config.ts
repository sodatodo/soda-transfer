import * as path from 'path';
import * as webpack from 'webpack';
import Copy from 'copy-webpack-plugin';
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
// import TerserPlugin from 'terser-webpack-plugin';

// const nodeEnv = process.env.NODE_ENV || 'development';
// const isProd = nodeEnv === 'production';

const globOptions = { ignore: ['**/node_modules/**'] };

const config: webpack.Configuration[] = [
  {
    mode: 'production',
    entry: './app/index.ts',
    output: {
      path: path.resolve(__dirname, 'target'),
      filename: 'ignore_this.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'null-loader',
        },
      ],
    },
    plugins: [
      new Copy({
        patterns: [
          {
            from: './app/*.html',
            globOptions,
            to: path.resolve(__dirname, 'target'),
          },
        ],
      }),
    ],
  },
  {
    // mode: 'production',
    mode: 'development',
    name: 'hyper',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    // devtool: 'cheap-module-source-map',
    devtool: 'inline-source-map',
    entry: './lib/index.tsx',
    output: {
      path: path.join(__dirname, 'target', 'renderer'),
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: path.join(__dirname, 'target', 'app'),
    },
    module: {
      rules: [
        {
          test: /\.(|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
    ],
    target: 'electron-renderer',
  },
];

export default config;
