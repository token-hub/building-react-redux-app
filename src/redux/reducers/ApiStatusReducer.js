import * as types from '../actions/ActionTypes';
import { actionTypeEndsInSuccess } from '../actions/ApiStatusActions';


const ApiStatusReducer = (state = 0, action) => {
	// switch(action.type) {
	// 	case types.BEGIN_API_CALL:
	// 		return state++;
	// 	default:
	// 		return state;
	// }

	if (action.type == types.BEGIN_API_CALL) {
		return state + 1;
	} else if (actionTypeEndsInSuccess(action.type) || action.type == types.API_CALL_ERROR) {
		return state - 1;
	}

	return state;
} 

export default ApiStatusReducer