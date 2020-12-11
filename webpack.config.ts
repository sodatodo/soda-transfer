import * as path from 'path';
import * as webpack from 'webpack';
import Copy from 'copy-webpack-plugin';
// import TerserPlugin from 'terser-webpack-plugin';

// const nodeEnv = process.env.NODE_ENV || 'development';
// const isProd = nodeEnv === 'production';

const globOptions = { ignore: ['**/node_modules/**'] };

const config: webpack.Configuration[] = [
  {
    mode: 'production',
    entry: './app/index.ts',
    output: {
      path: path.resolve(__dirname, 'dist'),
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
            to: '.',
          },
        ],
      }),
    ],
  },
  {
    mode: 'production',
    name: 'hyper',
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devtool: 'cheap-module-source-map',
    entry: './lib/index.tsx',
    output: {
      path: path.join(__dirname, 'target', 'renderer'),
      filename: 'bundle.js',
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
    target: 'electron-renderer',
  },
];

export default config;
