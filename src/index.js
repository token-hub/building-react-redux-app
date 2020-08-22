import React from 'react';
import { render } from 'react-dom';
import App from './App';
import configureStore from './redux/configureStore';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

/*
const store = configureStore()
 */

render( 
	// <Provider store={store}>
	<Provider store={configureStore}>
		<Router>
			<App />
		</Router> 
	</Provider>
	, document.getElementById('app')
);