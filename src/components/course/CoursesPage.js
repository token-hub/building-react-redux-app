import React, {useEffect, useState} from 'react';
import * as CourseActions from '../../redux/actions/CourseActions';
import * as AuthorActions from '../../redux/actions/AuthorActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import CourseList from './CourseList';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

const CoursesPage = ({ courses, actions, authors, loading }) => {
	const { loadCourses, loadAuthors, deleteCourse } = actions;
	const [state, setState] = useState(false);

	useEffect( () => { 
		if (courses.length < 1) {
			loadCourses(); 
		}

		if (authors.length < 1) {
			loadAuthors();
		}
	}, [] );

	// const  handleDeleteCourse = course => {
	// 	toast.success("Course deleted!");
		
	// 	deleteCourse(course)
	// 	.catch(error => {
	// 		toast.error("Delete Failed. " + error.message, { autoClose: false } );
	// 	});
	// }

	const  handleDeleteCourse = async course => {
		toast.success("Course deleted!");
		try {
			await deleteCourse(course);
		} catch (error) {
			toast.error("Delete Failed. " + error.message, { autoClose: false } );
		}
	}


	return (
		<React.Fragment>
			{ state === true && <Redirect to='/course' /> }
			<h1>Courses</h1>		
			{ 
				loading 
				? <Spinner />
				: 
					<React.Fragment>
						<button 
							className='btn btn-primary btn-lg' 
							style={{ marginBottom: '20px' }}
							onClick={ () => setState(true) } 
						> 
							Add Course 
						</button>
						<CourseList 
							handleDeleteCourse={handleDeleteCourse}
							courses={courses} 
							/>
					</React.Fragment>
			}
			
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
		authors: state.authors,
		loading: state.apiCallProgress > 0
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: {
			loadCourses:  bindActionCreators(CourseActions.loadCourses, dispatch),
			loadAuthors:  bindActionCreators(AuthorActions.loadAuthors, dispatch),
			deleteCourse: bindActionCreators(CourseActions.deleteCourse, dispatch),
		}
	}
}

CoursesPage.propTypes = {
	courses: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired,
	authors: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);