import { LOAD_AUTHORS_SUCCESS } from '../actions/ActionTypes';

const AuthorReducer = (state = [], action) => {
	switch(action.type) {
		case LOAD_AUTHORS_SUCCESS:
			return action.authors
		default:
			return state
	}
}

export default AuthorReducer