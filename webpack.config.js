const path = require('path');

const clientConfig = {
    mode: 'development',
    entry: './client/app.js',
    output: {
        path: path.resolve(__dirname, 'client/dist'),
        filename: 'main.js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};

module.exports = [clientConfig];