import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { fetchCourses } from '../utils/apiRequests'

function Courses() {
	const [courses, setCourses] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		// Fetch courses data when component is mounted
		fetchCourses()
			.then((data) => setCourses(data))
			.catch((error) => {
				console.error('Error getting courses  ', error)
				navigate('/error')
			})
	}, [navigate])

	return (
		<div className='wrap main--grid'>
			{courses.map((course, index) => (
				<Link key={index} className='course--module course--link' to={`/courses/${course.id}`}>
					<h2 className='course--label'>Course</h2>
					<h3 className='course--title'>{course.title}</h3>
				</Link>
			))}
			<Link className='course--module course--add--module' to='/courses/create'>
				<span className='course--add--title'>
					<svg version='1.1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px' viewBox='0 0 13 13' className='add'>
						<polygon points='7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 '></polygon>
					</svg>
					New Course
				</span>
			</Link>
		</div>
	)
}

export default Courses
