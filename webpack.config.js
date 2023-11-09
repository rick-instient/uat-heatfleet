const prerenderWebpackPlugin = require('prerender-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.bundle.js',
  },
  optimization: {
    minify: true,
    treeShaking: true,
  },
  plugins: [
    new prerenderWebpackPlugin({
      routesFile: './user-route',
    }),
  ],
};