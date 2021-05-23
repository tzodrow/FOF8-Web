import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { store, history } from './reducers/store';
import { App } from './App';

ReactDOM.render(
    <React.Fragment>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <App
                />
            </ConnectedRouter>
        </Provider>
    </React.Fragment>,
    document.getElementById('root')
);