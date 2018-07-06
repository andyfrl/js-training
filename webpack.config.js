const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/public'),
        filename: 'index_bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, '/public'),
        proxy: [{
            context: ['/employees', '/add_employee'],
            target: 'http://localhost:3001'
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
                template: './public/index.html'
        })
    ]
}
