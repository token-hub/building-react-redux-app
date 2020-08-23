import React from 'react';
import CourseForm from './CourseForm';
import { shallow } from 'enzyme';

const renderCourseForm = (args) => {
	const defaultProps = {
		authors: [],
		course: {},
		saving: false,
		errors: {},
		onSave: () => {},
		onChange: () => {}
	}

	const props = {...defaultProps, ...args};
	return shallow( <CourseForm {...props} /> )
}

it('renders from and header', () => {
	const wrapper = renderCourseForm();
	
	expect(wrapper.find("h2").text()).toEqual("Add Course");
})

it('labels save buttons as "Save" when not saving', () => {
	const wrapper = renderCourseForm();
	expect(wrapper.find("button").text()).toBe("Save");
})

it('labels save buttons as "Saving..." when not saving', () => {
	const wrapper = renderCourseForm({ saving: true });
	expect(wrapper.find("button").text()).toBe("Saving...");
})