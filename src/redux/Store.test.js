import { createStore } from 'redux';
import rootReducer from './reducers';
import * as courseActions from './actions/courseActions';

it(" Should handle creating courses", () => {
	// arrange
	const store = createStore(rootReducer, {});
	const course = {
		title: "Clean Code"
	}

	// act 
	const action = courseActions.createCourseSuccess(course);
	store.dispatch(action);

	// assert
	const createdCourse = store.getState().courses[0];
	expect(createdCourse).toEqual(course);
})
