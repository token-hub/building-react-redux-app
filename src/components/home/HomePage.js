import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
	return (
		<div className="jumbotron">
			<h1>Pluralsight Administration</h1>
			<p>React with redux .............</p>
			<Link to='/about'>
				<button className='btn btn-lg btn-primary'>About</button>
			</Link>
		</div>
	)
}

export default HomePage