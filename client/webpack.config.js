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
    // react: path.resolve(__dirname, "./src/index.js"),
    // styles: path.resolve(__dirname, "./src/styles/styles.css")
    react: {
      import: [path.resolve(__dirname, "./src/index.js"), path.resolve(__dirname, "./src/styles/styles.css")],
      // dependOn: ["/\.css$/"],
      chunkLoading: false, // Disable chunks that are loaded on demand and put everything in the main chunk.
    },
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
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
      // CSS rules
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: './',
              // include: /\.css$/
            }
          },
          { loader: "css-loader" },
        ]
      }
    ],
  },
};

module.exports = [clientConfig];
