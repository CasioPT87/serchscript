const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const clientConfig = {
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  entry: {
    react: {
      import: [path.resolve(__dirname, "./src/index.js"), path.resolve(__dirname, "./src/styles/styles.scss")],
      chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
    assetModuleFilename: 'images/[name][ext]'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      // CSS rules
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './',
            }
          },
          { loader: "css-loader" },
          { loader: 'sass-loader' }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};

module.exports = [clientConfig];
