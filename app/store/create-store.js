import { createStore, applyMiddleware, combineReducers } from 'redux';

// import SomeMiddleware from './somemiddleware';

import * as reducers from './reducers/app-reducer';

function Store(data) {
  const reducer = combineReducers(reducers);
  // const finalCreateStore = applyMiddleware(SomeMiddleware)(createStore);
  const store = createStore(reducer, data);
  
  return store;
}

export default Store;
