import { Navigate, useRoutes } from 'react-router-dom';
import { Login, Register, Dashboard } from './elements';
import {
  AllCourses,
  CourseDetails,
  InstructorDetails,
  NewCourse,
} from './elements';
import CourseDetailPage from '@/pages/StudentCourseDetails/CourseDetailPage';

export default function UnAuth() {
  return useRoutes([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/login',
      element: <Login />,
    },
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: 'courses',
      element: <AllCourses />,
    },
    {
      path: 'courses/new',
      element: <NewCourse />,
    },
    {
      path: 'courses/:courseId',
      element: <CourseDetails />,
    },
    {
      path: 'instructor/:instructorId',
      element: <InstructorDetails />,
    },
    {
      path: '*',
      element: <div>
        <h1>Not found</h1>
        <a href="/login">back to Login</a>
      </div>,
    },
  ]);
}
