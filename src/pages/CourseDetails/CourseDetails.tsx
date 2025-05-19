import { useEffect, useState } from 'react';
import { courseDetails, InstructorUser, lesson } from '../studentCourse/types';
// import { API_BASE_URL } from '@/config/serverApiConfig';
// import { CourseDetailsResponse, UserResponse } from './types';
import { Navigate, useParams } from 'react-router-dom';

import CourseTabs from './course-tabs';
import InstructorInfoCard from './instructor-info-card';
// import CourseShareCard from './course-share-card';
import CoursePurchaseCard from './course-purchase-card';
import CourseHeader from './course-header';
// import API from '@/features/authentication/service/api';
import { useQuery } from '@tanstack/react-query';
import { getCourseById } from '@/features/authentication/service/services';

export default function CourseDetails() {
  const { courseId } = useParams();
  const [courseData, setCourseData] = useState<courseDetails>();
  const [instructor, setInstructor] = useState<InstructorUser>();

  const { data, isLoading } = useQuery({
    queryKey: ['courses', 'noAuth'],
    queryFn: () => getCourseById(courseId!),
  });

  useEffect(() => {
    console.log('detiala');
    setCourseData(data?.data);
    setInstructor(data?.data?.instructor_user);
  }, [data, isLoading]);

  if (isLoading) return <p>Loading ...</p>;

  if (!parseInt(courseId!)) return <Navigate to="/" />;
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Main Content - Left Side (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <CourseHeader courseData={courseData!} />

          {/* Course Tabs */}
          <CourseTabs
            courseData={courseData!}
            lessons={courseData?.lessons as lesson[]}
          />
        </div>

        {/* Course Sidebar - Right Side (1/3 width on large screens) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Course Purchase Card */}
            <CoursePurchaseCard courseData={courseData!} />

            {/* Instructor Card */}
            <InstructorInfoCard
              courseData={courseData!}
              instructor={instructor!}
            />

            {/* Share Card */}
            {/* <CourseShareCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
