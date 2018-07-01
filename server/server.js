const express = require('express');
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')
const favicon = require('serve-favicon')
const bodyParser = require('body-parser')
const session = require('express-session')

const isDev = process.env.NODE_ENV = "development"


const app = express();

//解析json格式请求
app.use(bodyParser.json())
//解析formdata格式请求
app.use(bodyParser.urlencoded({extended: false}))

app.use(session({
  maxAge: 10 * 60 *1000,
  name: 'tid',
  resave: false, //每次请求是否重新生成cookieid
  saveUninitialized: false,
  secret: 'react mobx', //加密cookie所需字符串
}))

app.use(favicon(path.join(__dirname, '../favicon.ico')))

app.use('/api/user', require('./util/handle-login'))
app.use('/api', require('./util/proxy'))

if( !isDev ){
    const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')
    const serverEntry = require('../dist/server-entry.js').default
    app.use('/public', express.static(path.join(__dirname, '../dist')))
    app.get('*', (req, res) => {
        const appString = ReactSSR.renderToString(serverEntry)
        template.replace('<app></app>', appString)
        res.send(template.replace('<!-- APP -->', appString))
    })
}else{
    const devStatic = require('./util/dev-static.js')
    devStatic(app)
}

app.listen( 3333, () => {
    console.log( 'server listen in port 3333' )
})
