import * as types from './ActionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './ApiStatusActions';

export const loadCoursesSuccess = courses => {
	return {
		type: types.LOAD_COURSES_SUCCESS,
		courses
	}
}

export const updateCourseSuccess = course => {
	return {
		type: types.UPDATE_COURSE_SUCCESS,
		course
	}	
}

export const createCourseSuccess = course => {
	return {
		type: types.CREATE_COURSE_SUCCESS,
		course
	}	
}

export const deleteCourseOptimistic = course => {
	return {
		type: types.DELETE_COURSE_OPTIMISTIC,
		course
	}
}

export const loadCourses = () => {
	return dispatch => {
		
		dispatch(beginApiCall())

		return courseApi.getCourses()
			.then(courses => {
				dispatch(loadCoursesSuccess(courses));
			})
			.catch(error => {
				dispatch(apiCallError())
				throw error;
			}) 
	}
}

export const saveCourse = course => {
	return dispatch => {

		dispatch(beginApiCall())
		return courseApi.saveCourse(course)
			.then(saveCourse => {
				course.id
					? dispatch(updateCourseSuccess(saveCourse))
					: dispatch(createCourseSuccess(saveCourse));
			})
			.catch(error => {
				dispatch(apiCallError())
				throw error;
			}) 
	}
}

export const deleteCourse = course => {
	return dispatch => {
		dispatch(deleteCourseOptimistic(course));
		return courseApi.deleteCourse(course.id);
	}
}