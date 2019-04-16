import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './redux/store/configureStore'

import App from './App';

const store = configureStore()

// store.subscribe(() => {
//     console.log('state', store.getState())
// })

const ele = (
    <Provider store={store}>
        <App />
    </Provider>
)


ReactDOM.render(ele, document.getElementById('root'));

