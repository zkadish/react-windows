import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createStore from '../store/create-store';

import App from './App';

import '../scss/index.scss';

const Store = createStore();

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById('app'),
);

