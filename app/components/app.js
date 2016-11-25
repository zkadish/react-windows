import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import createStore from '../store/create-store'

import Form from './Form';

import '../css/app.scss';

const Store = createStore();

ReactDOM.render(
  <Provider store={Store}>
    <Form />
  </Provider>,
  document.getElementById('app')
);
