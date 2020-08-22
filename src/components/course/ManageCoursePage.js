import React, {useEffect, useState} from 'react';
import { loadCourses, saveCourse } from '../../redux/actions/CourseActions';
import { loadAuthors } from '../../redux/actions/AuthorActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';

// import { bindActionCreators } from 'redux';
// import * as CourseActions from '../../redux/actions/CourseActions';
// import * as AuthorActions from '../../redux/actions/AuthorActions';

// const ManageCoursesPage = ({ courses, actions, authors }) => {
	// const { loadCourses, loadAuthors } = actions;
	
const ManageCoursesPage = ({ courses, authors, loadCourses, loadAuthors, saveCourse, ...props }) => {

	const [course, setCourse] = useState({ ...props.course });
	const [errors, setError] = useState({});

	const onChange = e => {
		const { name, value } = e.target;
		setCourse( prevCourse => ({
			...prevCourse,
			[name]: name === "authorId" ? parseInt(value, 10) : value
		}))
	}

	const handleSave = e => {
		e.preventDefault();
		saveCourse(course);
	}

	useEffect( () => { 
		if (courses.length > 0) {
			loadCourses(); 
			loadAuthors();
		}
	}, [] );

	return (
		<CourseForm course={course} authors={authors} error={errors}  onSave={handleSave} onChange={onChange} />
	)
}

const mapStateToProps = state => {
	return {
		courses: state.courses,
		authors: state.authors,
		course: newCourse
	}
}

const mapDispatchToProps = {
	loadCourses,
	loadAuthors,
	saveCourse
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		actions: {
// 			loadCourses:  bindActionCreators(CourseActions.loadCourses, dispatch),
// 			loadAuthors:  bindActionCreators(AuthorActions.loadAuthors, dispatch)
// 		}
// 	}
// }

ManageCoursesPage.propTypes = {
	course: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadCourses: PropTypes.func.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);