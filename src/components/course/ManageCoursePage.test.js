import React from 'react';
import { mount } from 'enzyme';
import { authors, newCourse, courses } from '../../../tools/mockData';
import { ManageCoursePage } from './ManageCoursePage';

const render = (args) => {
	const defaultProps = {
		authors,
		courses,
		history: {},
		loadCourses: jest.fn(),
		loadAuthors: jest.fn(),
		saveCourse: jest.fn(),
		course: newCourse,
		match: {}
	}

	const props = {...defaultProps, ...args};
	return mount(<ManageCoursePage {...props} />)
}

it(" sets error when attempting to save an empty title field", () => {
	const wrapper = render();
	wrapper.find("form").simulate("submit");
	const error = wrapper.find(".alert").first();
	expect(error.text()).toBe("Title is required");
})