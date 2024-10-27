const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: './src/app.js',
    mode: 'development',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    devServer: {
        static: {
            directory: path.join(__dirname, '/'),
        },
        compress: true,
        port: 9000,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html"
        }),
        new CopyPlugin({
            patterns: [
                { from: "templates", to: "templates" },
                { from: "css", to: "css" },
                //{ from: "fonts", to: "static/fonts" },
                { from: "images", to: "images" },
            ],
        }),
    ],
};