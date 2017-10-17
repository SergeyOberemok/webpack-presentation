var webpack = require('webpack');
var path = require('path');

module.exports = {
    entry: {
        app: './src/js/index.js',
        vendor: './src/js/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
};