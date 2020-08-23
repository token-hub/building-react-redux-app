import React, {useEffect, useState} from 'react';
import { loadCourses, saveCourse } from '../../redux/actions/CourseActions';
import { loadAuthors } from '../../redux/actions/AuthorActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CourseForm from './CourseForm';
import { newCourse } from '../../../tools/mockData';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

// import { bindActionCreators } from 'redux';
// import * as CourseActions from '../../redux/actions/CourseActions';
// import * as AuthorActions from '../../redux/actions/AuthorActions';

// const ManageCoursePage = ({ courses, actions, authors }) => {
	// const { loadCourses, loadAuthors } = actions;
	
export const ManageCoursePage = ({ courses, authors, loadCourses, loadAuthors, saveCourse, history, ...props }) => {

	const [course, setCourse] = useState({ ...props.course });
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);
	
	const onChange = e => {
		const { name, value } = e.target;
		setCourse( prevCourse => ({
			...prevCourse,
			[name]: name === "authorId" ? parseInt(value, 10) : value
		}))
	}

	const formIsValid = () => {
		const {title, authorId, category} = course;
		const errors = {};

		if (!title) errors.title = 'Title is required';
		if (!authorId) errors.author = 'Author is required';
		if (!category) errors.category = 'Category is required';

		setErrors(errors);
		return Object.keys(errors).length == 0;
	}

	const handleSave = e => {
		e.preventDefault();
		if (!formIsValid()) return;
		setSaving(true);
		saveCourse(course)
		.then( () => {
			toast.success('Course Saved!');
			history.push('/courses');
		} )
		.catch( error => {
			setSaving(false);
			setErrors({ onSave: error.message });
		} )
	}

	useEffect( () => { 
		if (courses.length < 1) {
			loadCourses(); 
		} else {
			setCourse({...props.course})
		}

		if (authors.length < 1) {
			loadAuthors();
		}
	}, [props.course] );

	return	course.length === 0 || authors.length === 0 
		? ( <Spinner /> )
		: (
			<CourseForm 
				course={course} 
				authors={authors} 
				errors={errors}  
				onSave={handleSave} 
				saving={saving}
				onChange={onChange} 
			/>
		)
}

const mapStateToProps = (state, ownProps) => {
	const slug = ownProps.match.params.slug;
	
	const course = slug && state.courses.length > 0 
		? state.courses.find( course => course.slug === slug ) 
		: newCourse

	return {
		courses: state.courses,
		authors: state.authors,
		course
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

ManageCoursePage.propTypes = {
	course: PropTypes.object.isRequired,
	courses: PropTypes.array.isRequired,
	authors: PropTypes.array.isRequired,
	loadCourses: PropTypes.func.isRequired,
	loadAuthors: PropTypes.func.isRequired,
	saveCourse: PropTypes.func.isRequired,
	history: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);