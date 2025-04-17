import { Navigate, useRoutes } from 'react-router-dom';
import {
  Login,
  MainLayout,
  Register,
  AllCourses,
  CourseDetails,
  InstructorDetails,
  NewCourse,
} from './elements';

import Dashboard from '@/pages/Dashboard/Dashboard';
import CourseDetailPage from '@/pages/course/CourseDetailPage';
import { useAuthStore } from '@/store/authStore';
import { CoursePageTesting, Dashboard, Login, MainLayout, Register } from './elements';
import Loader from '@/components/Loading';
import CourseDetailPage from '@/pages/StudentCourseDetails/CourseDetailPage';

export default function Admin() {
  const { authUser } = useAuthStore();

  return useRoutes([
    {
      path: '/',
      element: <Navigate to="/" replace />,
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        {
          element: <Dashboard />,
          index: true,
        },
        {
          path: 'courses',
          element: <AllCourses />,
        },
        {
          path : 'coursedetails/:courseId',
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
        {
          path: 'instructor/:instructorId',
          element: <InstructorDetails />,
        },
        {
          path: 'coursedetails',
          element: <CourseDetailPage />,
        },

        {
          path: 'login',
          element: authUser ? <Navigate to="/" /> : <Login />,
        },
        {
          path: 'register',
          element: authUser ? <Navigate to="/" /> : <Register />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);
}
