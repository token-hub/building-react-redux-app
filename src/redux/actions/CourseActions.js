import * as types from './ActionTypes';
import * as courseApi from '../../api/courseApi';

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

export const loadCourses = () => {
	return dispatch => {
		return courseApi.getCourses()
			.then(courses => {
				dispatch(loadCoursesSuccess(courses));
			})
			.catch(error => {
				throw error;
			}) 
	}
}

export const saveCourse = course => {
	return dispatch => {
		return courseApi.saveCourse(course)
			.then(saveCourse => {
				course.id
					? dispatch(updateCourseSuccess(saveCourse))
					: dispatch(createCourseSuccess(saveCourse));
			})
			.catch(error => {
				throw error;
			}) 
	}
}
