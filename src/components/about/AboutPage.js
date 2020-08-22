import React from 'react';
import { Link } from 'react-router-dom';

const AboutPage = () => {
	return (
		<div>
			<h2>About ..</h2>
			<Link to='/' >
				<button className='btn btn-md btn-primary'>Home</button>
			</Link>
		</div>
	)
}

export default AboutPage