import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import RootReducer from './reducers';
import reduxImmutablesStateInvariant from 'redux-immutable-state-invariant';
import ReduxThunk from 'redux-thunk';
/*const configureStore = (initialState) => {
	return createStore(
		RootReducer,
		initialState,
		composeWithDevTools( 
			applyMiddleware(reduxImmutablesStateInvariant())
		)
	);
}

export default configureStore*/

const configureStore = createStore(
	RootReducer,
	composeWithDevTools(
		applyMiddleware(reduxImmutablesStateInvariant(), ReduxThunk)
	)
);

export default configureStore
