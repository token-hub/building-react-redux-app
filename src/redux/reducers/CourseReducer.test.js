import CourseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

it('should add course when passed CREATE_COURSE_SUCCESS', () => {
	const initialState = [
		{ title: "a" },
		{ title: "b" },
		{ title: "c" },
	];

	const newCourse = {
		title: 'd'
	};

	const action = actions.createCourseSuccess(newCourse);

	// act
	const newState = CourseReducer(initialState, action);

	// assert
	expect(newState.length).toEqual(4);
	expect(newState[0].title).toEqual('a');
	expect(newState[1].title).toEqual('b');
	expect(newState[2].title).toEqual('c');
	expect(newState[3].title).toEqual('d');
})

it('should update course when passed UPDATE_COURSE_SUCCESS', () => {
	const initialState = [
		{ id: 1, title: "a" },
		{ id: 2, title: "b" },
		{ id: 3, title: "c" }
	];

	const course = {
		id: 2, title: 'New Title'
	};

	const action = actions.updateCourseSuccess(course);

	// act
	const newState = CourseReducer(initialState, action);
	const updatedCourse = newState.find(a => a.id == course.id);
	const untouchedCourse = newState.find(a => a.id == 1);

	// assert
	expect(updatedCourse.title).toEqual('New Title');
	expect(untouchedCourse.title).toEqual('a');
	expect(newState.length).toEqual(3);
})