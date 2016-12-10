const webpack = require('webpack')
module.exports = {
    entry: [
      'script!jquery/dist/jquery.min.js',
      'script!foundation-sites/dist/js/foundation.min.js',
      './public/app.jsx'
    ],
    externals:{
      jquery:'jQuery'
    },
    plugins:[
      new webpack.ProvidePlugin({
        '$' : 'jquery',
        'jQuery' : 'jquery'
      })
    ],
    output: {
        path: __dirname,
        filename: './public/bundle.js'
    },
    resolve:{
        root: __dirname,
        alias:{
         Home: 'public/components/Home.jsx',
         NavBar : 'public/components/Navbar.jsx',
         Dashboard : 'public/components/Dashboard.jsx',
         Update: 'public/components/Update.jsx',
         Create: 'public/components/Create.jsx',
         Select: 'public/components/Select.jsx',
         AppCss: 'public/css/style.css'
        },
        extensions: ['', '.js', '.jsx']
    },
    module:{
        loaders:[{
            loader:'babel',
            test: /\.jsx?/,
            exclude: /(node_modules|bower_components)/
        }]
    }
};
