import './assets/main.less';
import 'flexboxgrid/css/flexboxgrid.css';

import React from 'react';
import ReactDOM from 'react-dom';

/* REDUX Store */
import {  applyMiddleware, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import pdfReportApp from './store/reducers';
const logger = createLogger({});
let store = createStore(pdfReportApp,applyMiddleware(logger));

import { Provider } from 'react-redux'

import App from './App.js';

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root'));