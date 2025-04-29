import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Breadcrumb from './components/Breadcrumb';
import Description from './components/Description';
import VideoPlayer from './components/VideoPlayer';
import Tabs from './components/Tabs';
import Modules from './components/Modules';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { courseDetails, InstructorUser, lesson } from '../studentCourse/types';
import { CourseDetailsResponse } from '../CourseDetails/types';
import API from '@/features/authentication/service/api';
import { useQuery } from '@tanstack/react-query';
import { fetchCourseDetails } from '@/features/authentication/service/services';

interface Module {
  title: string;
  duration: string;
  details?: { title: string; duration: string }[];
}

const CourseDetailPage = () => {
  const { courseId } = useParams();
  console.log(courseId, ' courseId');
  const [lessons, setLessons] = useState<lesson[]>([]);
  const [courseData, setCourseData] = useState<courseDetails>();
  const [instructor, setInstructor] = useState<InstructorUser>();
  const [lessonIndex, setLessonIndex] = useState<number>(0);
  useEffect(() => {
    async function getCourseById() {
      const res = await API.get('/courses/' + courseId);
      // const response = await fetch(`${API_BASE_URL}/courses/${courseId}`);
      const data = (await res.data) as CourseDetailsResponse;
      console.log(data, 'data');
      setCourseData(data.data);
      setInstructor(data.data?.instructor_user!);
      setLessons(data.data?.lessons);
    }
    getCourseById();
  }, [courseId]);
  const nav = useNavigate();

  console.log(lessons![lessonIndex]?.title , courseData?.course_name)
    return (
      <main>
        {/* Breadcrumb */}
        <Breadcrumb
          courseName={courseData!?.course_name!}
          lessonTitle={lessons![lessonIndex]?.title}
        />
        {/* Course Content */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr,350px] gap-6 p-2">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" className="p-0" onClick={() => nav(-1) }>
                <ChevronLeft className="h-4 w-4"  />
              </Button>
              <h1 className="text-xl text-gray-700 font-extrabold">
                {courseData?.course_name}
              </h1>
            </div>

            {/* Video Player Placeholder */}
            <VideoPlayer videoLink={lessons![lessonIndex]?.videoUrl} />

            {/* Tabs */}
            <Tabs />

            {/* Description */}
            <Description />
          </div>

          {/* Course Modules */}

          <Modules lessons={lessons!} setLessonIndex={setLessonIndex} />
        </div>
      </main>
    );
};

export default CourseDetailPage;
