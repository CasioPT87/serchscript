const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

const clientConfig = {
  context: __dirname,
  mode: "production",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new Dotenv({
      path: path.resolve(__dirname, '../front.prod.env'),
    })
  ],
  entry: {
    react: {
      import: [path.resolve(__dirname, "./src/utils/SPA/index.js"), path.resolve(__dirname, "./src/styles/styles.scss"), path.resolve("./public/logo.png")],
    },
  },
  devtool: 'inline-source-map',
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
      // typescript rules
      {
        test: /\.(ts|tsx)?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
