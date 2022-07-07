const path = require("path")

module.exports = {
    entry: path.resolve(__dirname, './client/src/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader"
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            }
        ]
    },
    devServer: {
        static: path.resolve(__dirname, "client", "src"),
        port: 3000,
        historyApiFallback: true,
    },
    mode: "development"
}