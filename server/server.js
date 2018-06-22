const express = require('express');
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')


const isDev = process.env.NODE_ENV = "development"


const app = express();



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
