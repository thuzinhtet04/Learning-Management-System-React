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
      path: 'course-details/:courseId',
      element: <CourseDetailPage />,
    },
    {
      path: 'courses/new',
      element: <NewCourse />,
    },
    {
      path: 'courses/:courseId',
      element: <CourseDetails />,
    },
  ]);
}
