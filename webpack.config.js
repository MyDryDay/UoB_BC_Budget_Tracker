const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');

const config = {
    entry: {
        index: './public/index.js',
        database: './public/database.js',
    },
    output: {
        path: __dirname + '/public/dist',
        filename: '[name].bundle.js',
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
        ],
    },
    plugins: [new WebpackPwaManifest({
        filename: 'manifest.json',
        inject: false,
        fingerprints: false,
        name: 'Online/Offline Budget Tracker',
        short_name: 'Budget Tracker PWA',
        orientation: 'portrait',
        display: 'standalone',
        start_url: '/',
        description: 'A personal budget tracker with online & offline functionality',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: path.resolve('public/icons/icon-512x512.png'),
                sizes: [72, 96, 128, 192, 256, 384, 512],
                destination: path.join('assets', 'icons'),
            },
        ],

    }),
    ],
};

module.exports = config;