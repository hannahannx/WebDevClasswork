const path = require('path');

module.exports = {
    mode: 'development',
    entry: './public/index.js',
    output: {
        path: path.resolve(__dirname, 'public/dist'),
        filename: 'bundle.js'
    },
    optimization: {
        minimize: false
    },
    module: {
        rules: [
            //if its css process using css loaders
            {test: /\.css/i, use: ['style-loader','css-loader']},
            //.png 
            {
                test:/\.png/i,
                type:"asset/resource"
            },
        ]
    },
};