const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: "./public/js/index.js",
    output: {
        filename: "./dist/main.js"
    },
    mode: "development",
    module: {
        rules: [
            {
                test: /\.css$/,
                // loader: 'css-loader' for using single loader
                use: [
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new webpack.ProgressPlugin({
            handler(percentage, message, ...args) {
                console.info(percentage, message, ...args);
              },
        })
    ]
}