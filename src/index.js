import './assets/main.less';
import 'flexboxgrid/css/flexboxgrid.css';

import React from 'react';
import ReactDOM from 'react-dom';

import Utils from './utils';

/* REDUX Store */
import {  applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk';

import asciiDiscountStoreApp from './store/reducers';
const logger = createLogger({});
let store = createStore(
	asciiDiscountStoreApp,
	applyMiddleware(logger),
	applyMiddleware(thunk)
);

import { Provider } from 'react-redux'

import App from './App.js';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));