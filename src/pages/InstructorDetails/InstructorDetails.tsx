import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { useEffect, useState } from 'react';
import { UserResponse } from '../CourseDetails/types';
import {  Course, instructor, users } from '../studentCourse/types';
import { AllCourseResponse } from '../Courses/types';
import CourseCard from '../Courses/course-card';
import { useParams } from 'react-router-dom';
import API from '@/features/authentication/service/api';
import { LucideBadgeCheck, LucideChefHat, LucideHardHat, LucideMail, LucidePhone } from 'lucide-react';

export default function InstructorDetails() {
  const { instructorId } = useParams();

  const [instructor, setInstructor] = useState<instructor>();
  const [courses, setCourses] = useState<Course[]>();

  useEffect(() => {
    async function getInstructorById() {
      const response = await API.get(`/instructors/${instructorId}`);
      const data = (await response.data) as UserResponse;
      console.log(data  , "instructor details");
      setInstructor(data.data);
      setCourses(data.data.courses)
    }
    getInstructorById();
  }, [instructorId]);

  // const studentCount = courses?.length
  //   ? courses?.reduce((prev, cur) => cur.studentCount + prev, 0)
  //   : 0;

  if (!instructor) return <div>Instructor not found</div>;

  return (
    <div className="container mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-1 flex flex-col items-center">
          <Avatar className="w-40 h-40">
            <AvatarImage
              src={instructor?.user.profile_photo}
              alt="profilePhoto"
              className='object-cover'
            />
  
            <AvatarFallback className="text-9xl">
              {instructor.user.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="mt-2 font-semibold">
            {instructor?.user.username.toUpperCase()}
          </div>
          <div className="text-slate-900 dark:text-slate-200">Instructor</div>

          <div className="flex items-center gap-2">
            {courses?.length && (
              <div className="text-muted-foreground text-sm">
                {courses?.length} courses
              </div>
            )}
            {/* {!!studentCount && ( */}
            {/* <div className="text-muted-foreground text-sm"> */}
            {/* <div className="text-slate-700 dark:text-slate-400 text-sm"> */}
            {/* {studentCount} students */}
            {/* </div> */}
            {/* )} */}
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="font-semibold text-lg mb-5">
            About {instructor?.user.username}
          </div>
        <div className="flex flex-col gap-5">
        <div className='flex gap-2'> <LucideMail />  {instructor.user.email}</div>
          <div className='flex gap-2'><LucideBadgeCheck /> {instructor.edu_background}</div>
          <div className='flex gap-2'><LucidePhone /> {instructor.user.phone ?? "No Phone Number"}</div>
        </div>
          <div className="font-semibold text-lg mt-5">Instructor's Course</div>
          <div className="grid grid-cols-2 gap-3 mt-2">
            {courses?.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
