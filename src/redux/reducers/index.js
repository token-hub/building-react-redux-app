import { combineReducers } from 'redux';
import courses from './CourseReducer';
import authors from './AuthorReducer';
import apiCallProgress from './ApiStatusReducer';

const RootReducer = combineReducers({
	courses,
	authors,
	apiCallProgress
})

export default RootReducer