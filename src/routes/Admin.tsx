import {
  Navigate,
  NonIndexRouteObject,
  RouteObject,
  useRoutes,
} from 'react-router-dom';
import {
  AllCourses,
  CourseDetails,
  InstructorDetails,
  NewCourse,
} from './elements';

// import CourseDetailPage from '@/pages/course/CourseDetailPage';
import { useAuthStore } from '@/store/authStore';
import { CoursePageTesting, Login, MainLayout, Register } from './elements';
import Loader from '@/components/Loading';
import CourseDetailPage from '@/pages/StudentCourseDetails/CourseDetailPage';
import CourseRoute from './Course.route';
import VideoPlayer from '@/pages/StudentCourseDetails/components/VideoPlayer';
import Dashboard from '@/pages/Dashboard/Dashboard';

export default function Admin() {
  const { authUser } = useAuthStore();

  return useRoutes([
    {
      path: '/',
      errorElement: <Navigate to="/login" />,
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
        {
          path: 'instructor/:instructorId',
          element: <InstructorDetails />,
        },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/" replace />,
    },
  ]);
}
