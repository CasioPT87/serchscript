const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const clientConfig = {
  mode: "production",
  entry: {
    react: path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    // clean: true,
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     title: "SSR react",
  //   }),
  // ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
    ],
  },
};

module.exports = [clientConfig];
