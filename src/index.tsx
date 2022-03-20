import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/styles/index.scss';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import 'antd/dist/antd.css';
import { ConnectedRouter } from 'connected-react-router';
import { history } from 'utils';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
