import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import myReducer from './reducers/index';
import {listAll} from './Actions/index';

//create store
const store = createStore(myReducer);

/*
Because list all is default so we don't have to dispatch this action
when you check reducer you'll see default case is return state, which is return all value from localStorage
store.dispatch(listAll());
*/
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store} >
    	<App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
