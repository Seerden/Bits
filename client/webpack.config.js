const path = require('path');
const miniCss = require('mini-css-extract-plugin');

module.exports = {
    output: {
        path: path.join(__dirname, "dist"),
        filename: 'bundle.js',
    },
    devServer: {
        port: 3000,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'ts-loader',
                }
            },
            {
                test: /\.scss$/,
                use: [
                    miniCss.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.js', '.js', '.ts'],
        alias: {
            components: path.resolve(__dirname, 'src', 'components/'),
            hooks: path.resolve(__dirname, 'src', 'hooks/'),
        }
    },
    plugins: [new miniCss()]
};