import React, {useEffect} from 'react';
import * as CourseActions from '../../redux/actions/CourseActions';
import * as AuthorActions from '../../redux/actions/AuthorActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import CourseList from './CourseList';

const CoursesPage = ({ courses, actions, authors }) => {

	const { loadCourses, loadAuthors } = actions;
	
	useEffect( () => { 
		if ( courses.length < 1) {
			loadCourses(); 
			loadAuthors();
		}
	}, [] );

	return (
		<React.Fragment>
			<h1>Courses</h1>
			<CourseList courses={courses} />
		</React.Fragment>
	)
}

const mapStateToProps = state => {
	const courses = state.authors.length > 0 
		? state.courses.map( course => {
			return {
				...course,
				authorName: state.authors.find( author => author.id == course.authorId).name
			}
		} )
		: [];

	return {
		courses: courses,
		authors: state.authors
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			loadCourses:  bindActionCreators(CourseActions.loadCourses, dispatch),
			loadAuthors:  bindActionCreators(AuthorActions.loadAuthors, dispatch)
		}
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);