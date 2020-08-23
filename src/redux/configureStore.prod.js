import { createStore, applyMiddleware } from 'redux';
import RootReducer from './reducers';
import ReduxThunk from 'redux-thunk';

const configureStore = createStore(
	RootReducer,
	applyMiddleware(ReduxThunk)
);

export default configureStore
