import { LOAD_AUTHORS_SUCCESS } from './ActionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './ApiStatusActions';

export const loadAuthorsSuccess = authors => {
	return {
		type: LOAD_AUTHORS_SUCCESS,
		authors
	}
}

export const loadAuthors = () => {
	return dispatch => {
		dispatch(beginApiCall())
		return authorApi.getAuthors()
			.then( response => {
				dispatch(loadAuthorsSuccess(response))
			} )
			.catch( error => {
				dispatch(apiCallError())
				throw error;
			})
	}
}