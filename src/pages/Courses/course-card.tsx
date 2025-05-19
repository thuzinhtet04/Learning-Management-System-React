import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Link, useNavigate } from 'react-router-dom';
import { Course } from '../studentCourse/types';
import { formatPrice } from '@/utils';
import { useQuery } from '@tanstack/react-query';
import { useMyCourses } from '@/store/useMyCourses';

interface Props {
  course: Course;
}

export default function CourseCard({ course }: Props) {
  const nav = useNavigate();
  // const {
  //   data: instructor,
  //   isLoading,
  //   isError,
  // } = useQuery({
  //   queryKey: ['instructor', course.instructorId],
  //   queryFn: () => getInstructorById(course.instructorId),
  //   // staleTime: 60 * 1000,
  // });

  // if (isLoading) return <div>Loading...</div>;
  // if (isError) return <div>Something Wrong</div>;
  // if (!instructor) return null;

  const { courses: Mycourses } = useMyCourses();
  const handleClick = (id: number) => {
    if (Mycourses?.find((course) => course.id === id)) {
      nav('/course-details/' + id);
    } else {
      nav('/courses/' + id);
    }
  };

  console.log(course);
  return (
    <div
      onClick={() => {
        handleClick(course.id);
      }}
      className={
        ' border-[#575757] p-2 border border-1 bg-teal-400 dark:text-black rounded-md flex flex-col h-full'
      }
    >
      <div className="flex-grow">
        {/* Image section */}

        <div className="relative  bg-white">
          <img
            src={course.thumbnail}
            alt="lms"
            className="w-full rounded-t-md"
          />
          <div
            className={
              'absolute top-1 right-2 py-0.5 px-1.5 rounded-full bg-yellow-500'
            }
          >
            {course.level}
          </div>
        </div>

        {/* Content section */}
        <div className="m-2 mt-1 flex flex-col flex-grow">
          <div className="font-bold text-lg mt-1">{course.course_name}</div>
          <div className="mt-0.5 text-sm text-slate-700">
            {course.description!.slice(0, 50)}...
          </div>
        </div>
      </div>

      {/* Instructor and price */}
      <div className="mt-auto m-2">
        <Link
          to={`/instructor/${course.instructor_user.laravel_through_key}`}
          className="flex items-center justify-between gap-1"
        >
          {course.instructor_id}
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                src={course?.instructor_user.profile_photo!}
                alt="profile_photo"
              />
              <AvatarFallback>
                {course.instructor_user.username.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-sm font-semibold">
              {course?.instructor_user.username}
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-[11px] text-slate-700">
              {course.students.length} students
            </div>
            <div className="text-sm text-slate-700">
              {formatPrice(parseInt(course.current_price))}
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
