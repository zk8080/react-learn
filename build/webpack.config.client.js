const path = require('path')
const HTMLPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
    entry: {
        app: path.join(__dirname, '../client/app.js')
    },
    output: {
        filename: '[name].[hash].js',//打包文件名 hash防止缓存
        path: path.join(__dirname,'../dist'),
        publicPath: '/public/',//静态资源访问路径前缀
    },
    module: {
        rules: [
            // {
            //     enforce: 'pre',
            //     test: /.(js|jsx)$/,
            //     loader: 'eslint-loader',
            //     exclude: [
            //         path.resolve(__dirname, "../node_modules")
            //     ]
            // },
            {
                test: /.jsx$/,
                loader: 'babel-loader',
            },
            {
                test: /.js$/,
                loader: 'babel-loader',
                exclude: [
                    path.join(__dirname, "../node_modules")
                ]
            }
        ]
    },
    plugins: [
        new HTMLPlugin({
            template: path.join(__dirname, '../client/template.html')
        })
    ]
}

if(isDev){
    config.entry = {
        app: [
            'react-hot-loader/patch', //热更新所需入口文件
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '3002',
        contentBase: path.join(__dirname,'../dist'),
        hot: true, //热更新
        overlay: { //错误信息提醒
            errors: true
        },
        publicPath: '/public/',//访问静态文件前缀
        historyApiFallback: {//
            index: '/public/index.html'
        }
    }
    config.plugins.push( new webpack.HotModuleReplacementPlugin() )
}

module.exports = config
