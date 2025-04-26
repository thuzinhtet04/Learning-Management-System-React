import { useEffect, useState } from 'react';
import { courseDetails, InstructorUser, users } from '../studentCourse/types';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { CourseDetailsResponse, UserResponse } from './types';
import { useParams } from 'react-router-dom';

import CourseTabs from './course-tabs';
import InstructorInfoCard from './instructor-info-card';
import CourseShareCard from './course-share-card';
import CoursePurchaseCard from './course-purchase-card';
import CourseHeader from './course-header';
import API from '@/features/authentication/service/api';

export default function CourseDetails() {
  const { courseId } = useParams();

  const [courseData, setCourseData] = useState<courseDetails>();
  const [instructor, setInstructor] = useState<InstructorUser>();
  console.log(courseData)

  useEffect(() => {
    async function getCourseById() {
      const res = await API.get("/courses/"+courseId);
      // const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
      const data = (await res.data) as CourseDetailsResponse;
      // console.log(data)
      setCourseData(data.data);
      setInstructor(data.data?.instructor!)
    }
    getCourseById();
  }, [courseId]);

  console.log(courseData , instructor)


  if (!courseData || !instructor) return null;

  const { lessons } = courseData;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Course Main Content - Left Side (2/3 width on large screens) */}
        <div className="lg:col-span-2 space-y-8">
          {/* Course Header */}
          <CourseHeader courseData={courseData} />

          {/* Course Tabs */}
          <CourseTabs courseData={courseData} lessons={lessons} />
        </div>

        {/* Course Sidebar - Right Side (1/3 width on large screens) */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            {/* Course Purchase Card */}
            <CoursePurchaseCard courseData={courseData} />

            {/* Instructor Card */}
            <InstructorInfoCard
              courseData={courseData}
              instructor={instructor}
            />

            {/* Share Card */}
            {/* <CourseShareCard /> */}
          </div>
        </div>
      </div>
    </div>
  );
}
