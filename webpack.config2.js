var path = require('path');

module.exports = {
    entry: './src/main/js/app.js',
    devtool: 'sourcemaps',
    cache: true,
    mode: 'development',
    output: {
        path: __dirname,
        filename: './src/main/resources/static/built/bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
      },
    module: {
        rules: [
            {
                test: path.join(__dirname, '.'),
                exclude: /(node_modules)/,
                use: [{
                	loaders: ['react-hot', 'babel-loader'],
                    options: {
                        presets: ['@babel/preset-env',
                            '@babel/react',{
                            'plugins': ['@babel/plugin-proposal-class-properties']
                        }]
                    }
                }]
            },
            { test: /\.css$/, 
            	use: [
                    // style-loader
                    { loader: 'style-loader' },
                    // css-loader
                    {
                      loader: 'css-loader',
                      options: {
                        modules: true
                      }
                    }
                  ]
            }
        ]
    }
};