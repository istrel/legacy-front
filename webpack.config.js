var path = require('path');

var autoprefixer = require('autoprefixer-core');
var cssnext = require('cssnext');
var doiuse = require('doiuse');
var wordwrap = require('wordwrap');
var csswring = require('csswring');
var nested = require('postcss-nested');

require('colors');

module.exports = {
    entry: {
        app: ['./src/js/app.js']
    },
    output: {
        path: require('path').resolve('build'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            // needed by bootstrap
            { test: /\.(woff|woff2)$/,  loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
            { test: /\.ttf$/,    loader: 'file-loader' },
            { test: /\.eot$/,    loader: 'file-loader' },
            { test: /\.svg$/,    loader: 'file-loader' }
        ]
    },
    postcss: [
        nested,
        cssnext,
        autoprefixer,
        csswring
    ],

    resolve: {
        root: path.join(__dirname, 'src/js')
    },

    plugins: []
};
