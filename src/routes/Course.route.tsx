import React from 'react'
import {


 
    AllCourses,
    CourseDetails,
    InstructorDetails,
    NewCourse,
  } from './elements';
import CourseDetailPage from '@/pages/StudentCourseDetails/CourseDetailPage';
import { NonIndexRouteObject } from 'react-router-dom';
const CourseRoute = () : NonIndexRouteObject[] => {
  return (
    [
   
        {
          path: 'courses',
          element: <AllCourses />,
        },
        {
          path : 'course-details/:courseId',
          element : <CourseDetailPage/>

        },
        {
          path: 'courses/new',
          element: <NewCourse />,
        },
        {
          path: 'courses/:courseId',
          element: <CourseDetails />,
        },
   



      ]
  )
}

export default CourseRoute