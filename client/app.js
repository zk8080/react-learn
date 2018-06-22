import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'
import {AppContainer} from 'react-hot-loader'

// ReactDOM.render(<App/>, document.getElementById('root'))

const root = document.getElementById('root');
//页面渲染函数
const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
            <Component/>
        </AppContainer>,
        root
    )
}

render(App)

//热更新替换html
if( module.hot ){
    module.hot.accept('./App.jsx', () => {
        const NextApp = require('./App.jsx').default
        // ReactDOM.hydrate(<NextApp />, document.getElementById('root'))
        render(NextApp)
    })
}
