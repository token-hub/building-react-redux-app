import { LOAD_AUTHORS_SUCCESS } from './ActionTypes';
import * as authorApi from '../../api/authorApi';

export const loadAuthorsSuccess = authors => {
	return {
		type: LOAD_AUTHORS_SUCCESS,
		authors
	}
}

export const loadAuthors = () => {
	return dispatch => {
		return authorApi.getAuthors()
			.then( response => {
				dispatch(loadAuthorsSuccess(response))
			} )
			.catch( error => {
				throw error
			})
	}
}