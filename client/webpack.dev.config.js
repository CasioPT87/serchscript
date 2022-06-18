const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const clientConfig = {
  mode: "development",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
  ],
  entry: {
    react: {
      import: [path.resolve(__dirname, "./src/utils/SPA/index.js"), path.resolve(__dirname, "./src/styles/styles.scss")],
    },
  },
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    clean: true,
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
      }
    ],
  },
  /**
  The optimization.runtimeChunk: 'single' was added because in this example we have more than one entrypoint on a single HTML page.
  Without this, we could get into trouble described here. Read the Code Splitting chapter for more details.
  */
  // optimization: {
  //   runtimeChunk: 'single',
  // },
};

module.exports = [clientConfig];
