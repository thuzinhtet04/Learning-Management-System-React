import { useEffect, useState } from 'react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Course, courses } from '../../pages/studentCourse/types';
import { API_BASE_URL } from '@/config/serverApiConfig';
import { AllCourseResponse } from '../../pages/Courses/types';
import { useDebounce } from '@uidotdev/usehooks';
import { Link } from 'react-router-dom';
import { useMyCourses } from '@/store/useMyCourses';

export default function SearchInputPopover() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [search, setSearch] = useState('');
  const { courses, getCourseByName, filteredCourses } = useMyCourses();
  const [resultCourses, setCourses] = useState<Course[] | undefined>(courses);
  useEffect(() => {

    setCourses(getCourseByName(search));
  }, [search]);
  console.log(resultCourses, 'resultcourse');

  return (
    <div>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger asChild>
          <input
            value={search}
            type="text"
            placeholder="Search Enrolled Courses"
            className="w-full max-w-xs p-2 border  text-sm outline-none bg-transparent  "
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onFocus={() => setPopoverOpen(true)}
            onBlur={() => setPopoverOpen(false)}
          />
        </PopoverTrigger>
        <PopoverContent className="w-80 sm:w-[450px] md:w-[600px] mr-20 sm:mr-20">
          {search && resultCourses?.length === 0 && (
            <div className="font-semibold h-20">
              There is no Course , Sorry 😢
            </div>
          )}
          <div className="grid gap-4">
            {search && resultCourses?.length !== 0
              && resultCourses?.map((searchCourse) => (
                  <div
                    // to={`/course-details/${searchCourse.id}`}
                    className="flex items-center gap-2 border border-gray-700 p-5 rounded-md "
                    key={searchCourse.id}
                    // onClick={() => setSearch('')

                    // }
                  >
                    <img
                      src={searchCourse.thumbnail}
                      className="w-24 rounded-md"
                    />
                    <div className="font-semibold text-xs ">
                      <p className=" text-base text-teal-500">
                        {searchCourse.course_name}
                      </p>
                      <p>{searchCourse.instructor_user.username}</p>
                    </div>
                  </div>
                )) }
              { !search && courses?.map((course) => (
                  <div
                    // to={`/course-details/${searchCourse.id}`}
                    className="flex items-center gap-2 border border-gray-700 p-5 rounded-md "
                    key={course.id}
                    // onClick={() => setSearch('')

                    // }
                  >
                    <img src={course.thumbnail} className="w-24 rounded-md" />
                    <div className="font-semibold text-xs ">
                      <p className=" text-base text-teal-500">
                        {course.course_name}
                      </p>
                      <p>{course.instructor_user.username}</p>
                    </div>
                  </div>
                ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
