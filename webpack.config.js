const webpack = require('webpack')
module.exports = {
    entry: [
      './public/app.jsx'
    ],
    plugins:[
      new webpack.DefinePlugin({
   'process.env': {
     'NODE_ENV': JSON.stringify('production')
   }
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
         New: 'public/components/New.jsx',
         Tasks: 'public/components/Tasks.jsx',
         AppCss: 'public/css/style.css',
         Socket: 'public/socket.io.js',
         Chat: 'public/components/Chat.jsx'
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
