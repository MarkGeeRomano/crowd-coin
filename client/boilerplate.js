import React from 'react';
import { render } from 'react-dom';
import { connect } from 'react-redux';
//install routing deps
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from './store'

import App from './components/App';

render(
    <Provider store={store}>
        <BrowserRouter>
            <App/>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

window.store = store;