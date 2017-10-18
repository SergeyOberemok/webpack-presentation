var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var inProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        app: './src/js/index.js',
        vendor: './src/js/vendor.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: inProduction ?
                    ExtractTextPlugin.extract({
                        use: ['css-loader']
                    }) :
                    ['style-loader', 'css-loader']
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'fonts/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: 'images/[name].[ext]'
                    }
                }]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['env']
                        }
                    },
                    {
                        loader: 'eslint-loader'
                    }
                ]
            },
            {
                test: /\.s[ac]ss$/,
                exclude: /node_modules/,
                use: inProduction ?
                    ExtractTextPlugin.extract({
                        use: ['css-loader', 'sass-loader']
                    }) :
                    ['style-loader', 'css-loader', 'sass-loader']
            }
        ]
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),

        new webpack.DefinePlugin({
            'process.env.inProduction': inProduction
        })
    ],
    devServer: {
        hot: true,
        host: 'localhost',
        port: 9000,
        proxy: {
            '/': 'http://localhost:3000'
        },
        contentBase: path.resolve(__dirname, 'dist')
    }
};

if (inProduction) {
    module.exports.plugins.push(new ExtractTextPlugin('[name].css'));

    module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
        sourceMap: false,
        exclude: /node_modules/
    }));
} else {
    module.exports.plugins.push(new webpack.HotModuleReplacementPlugin());
}