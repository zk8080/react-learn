import React from 'react'
import ReactDOM from 'react-dom'
import App from './views/App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'mobx-react'
import {AppContainer} from 'react-hot-loader'

import appState from './store/app-state'
// ReactDOM.render(<App/>, document.getElementById('root'))

const root = document.getElementById('root');
//页面渲染函数
const render = Component => {
    ReactDOM.hydrate(
        <AppContainer>
          <Provider appState={appState}>
            <BrowserRouter>
              <Component/>
            </BrowserRouter>
          </Provider>
        </AppContainer>,
        root
    )
}

render(App)

//热更新替换html
if( module.hot ){
    module.hot.accept('./views/App.jsx', () => {
        const NextApp = require('./views/App.jsx').default
        // ReactDOM.hydrate(<NextApp />, document.getElementById('root'))
        render(NextApp)
    })
}
