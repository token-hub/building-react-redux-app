import * as types from './ActionTypes';

export const beginApiCall = () => {
	return {
		type: types.BEGIN_API_CALL
	}
}

export const apiCallError = () => {
	return {
		type: types.API_CALL_ERROR
	}
}

export const actionTypeEndsInSuccess = type => {
	return type.substring(type.length - 8) === "_SUCCESS";
}