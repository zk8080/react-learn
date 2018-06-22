const axios = require('axios')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')
const path = require('path')
const proxy = require('http-proxy-middleware')
const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
    return new Promise( (reslove, reject) => {
        axios.get('http://localhost:3002/public/index.html')
            .then( res => {
                reslove(res.data)
            })
            .catch( err => {
                reject(err)
            })
    } )
}

const Module = module.constructor
const mfs = new MemoryFs
const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs
let serverBundle
serverCompiler.watch({}, (err, stats) => {
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => {
        console.log(err)
    });
    stats.warnings.forEach(warn => {
        console.log(warn)
    });
    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename,
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf8') //生成文件字符串
    //把字符串转化成一个模块
    const m = new Module()
    m._compile(bundle, 'server-etry.js')
    serverBundle = m.exports.default
})

module.exports = (app) => {
    app.use('/public', proxy({ //代理静态资源
        target: 'http://localhost:3002'
    }))


    app.get('*', (req, res) => {
        getTemplate().then( template => {
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- APP -->',content))
        })
    })
}
