import {
  Navigate,
  // NonIndexRouteObject,
  // RouteObject,
  useRoutes,
} from 'react-router-dom';
import {
  AllCourses,
  CourseDetails,
  InstructorDetails,
  NewCourse,
} from './elements';

// import CourseDetailPage from '@/pages/course/CourseDetailPage';
// import { useAuthStore } from '@/store/authStore';
import { CoursePageTesting, Login, MainLayout, Register } from './elements';
import Loader from '@/components/Loading';
import CourseDetailPage from '@/pages/StudentCourseDetails/CourseDetailPage';
import CourseRoute from './Course.route';
import VideoPlayer from '@/pages/StudentCourseDetails/components/VideoPlayer';
import Dashboard from '@/pages/Dashboard/Dashboard';
import StudentProfile from '@/pages/profile/studentProfile';
import CreateLessons from '@/pages/NewCourse/components/CreateLessons';
import EditCourse from '@/pages/NewCourse/EditCourse';
import LessonDataTable from '@/pages/InstructorDashboard/lesson-data-table';
import UpdateLessonForm from '@/pages/NewCourse/components/update-lesson-form';

export default function Admin() {
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
          path: 'courses/edit',
          element: <EditCourse />,
        },
        {
          path: 'lessons',
          element: <LessonDataTable />,
        },
        {
          path: '/lessons/new',
          element: <CreateLessons />,
        },
        {
          path: '/lessons/:lessonId/edit',
          element: <UpdateLessonForm />,
        },
        {
          path: 'courses/:courseId',
          element: <CourseDetails />,
        },
        {
          path: 'profile',
          element: <StudentProfile />,
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
