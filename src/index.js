import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import {ConnectedRouter } from 'react-router-redux'
import App from './container/App'
import configureStore, {history} from './store/configureStore'

const store = configureStore()

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <Component />
                </ConnectedRouter>
            </Provider>
        </AppContainer>,
        document.getElementById('root')
    )
}

render(App)

if(module.hot) {
    module.hot.accept('./container/App.js', () => {
        const NextApp = require('./container/App.js').default
        render(NextApp)
    })
}