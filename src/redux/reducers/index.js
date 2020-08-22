import { combineReducers } from 'redux';
import courses from './CourseReducer';
import authors from './AuthorReducer';

const RootReducer = combineReducers({
	courses,
	authors
})

export default RootReducer