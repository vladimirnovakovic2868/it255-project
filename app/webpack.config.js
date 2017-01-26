'use strict';

const webpack = require("webpack");
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

module.exports = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: "./index.jsx",
    },
    output: {
        filename: "[name].bundle.js",
        // path: __dirname + "/dist/assets",
        path: path.join(__dirname, "/dist/assets"),
        publicPath: "/assets",            // New
    },
        devServer: {
        contentBase: __dirname + "/src",  // New
    },
    plugins: [
        new ExtractTextPlugin({filename: 'css/app.css', allChunks: true })
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{
                    loader: "babel-loader",
                    options: { presets: ['es2015', 'stage-0', 'react'] }
                }],
            },
            {
                test: /\.(sass|scss)$/,
                // loader: ExtractTextPlugin.extract('css!sass')
                use: ["style-loader",
                    "css-loader",
                    "sass-loader",],
            },
        ],
    },
    performance: {
        hints: false
    },
};