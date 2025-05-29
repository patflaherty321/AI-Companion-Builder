const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  const isElectron = process.env.ELECTRON_BUILD === 'true';
  
  return {
    mode: argv.mode || 'development',
    entry: './src/index.tsx',
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    target: isElectron ? 'electron-renderer' : 'web',
    node: isElectron ? {
      __dirname: false,
      __filename: false,
    } : undefined,
    externals: isElectron ? {
      'electron': 'require("electron")',
    } : {},
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        "path": false,
        "fs": false,
        "os": false,
        "crypto": false,
      },
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devServer: {
      static: {
        directory: path.join(__dirname, 'dist'),
      },
      compress: true,
      port: 3000,
      hot: true,
      open: false,
      historyApiFallback: true,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
    ],
  };
};
