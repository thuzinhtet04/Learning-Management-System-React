import ProgressDemo from '@/components/ProgreeDemo';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import { memo, useEffect, useMemo, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import DiamondIcon from './diamond-icon';
import {
  Course,
  CourseResponse,
  enrollment,
  enrollmentWithCourse,
  isEnrollmentArray,
} from './types';
import { courseDummyCategory } from '@/constant/dummy-data';
import { useCategories } from '@/store/useCategories';
import { useAuthStore } from '@/store/authStore';
import { useMyCourses } from '@/store/useMyCourses';
import { Heading1 } from 'lucide-react';

const colors = [
  'bg-indigo-300',
  'bg-red-300',
  'bg-green-300',
  'bg-blue-300',
  'bg-yellow-500',
  'bg-purple-300',
];

const StudentCourseCard = memo(
  ({
    enrollments,
    categoryId,
  }: {
    enrollments: CourseResponse;
    categoryId: number;
  }) => {
    const navigate = useNavigate();
    const { authUser } = useAuthStore();
    const { getCategoryById } = useCategories();
    const handleContinueClick = (id: number) => {
      navigate(`/course-details/${id}`);
    };
    const [courseData, setCourseData] = useState< unknown[] | undefined>();
    const { getCourseByCategory, courses, setCourses, filteredCourses } =
      useMyCourses();
    console.log(courses, ' courses at student course card');

    useEffect(() => {
      console.log("chage category id " , categoryId)
      setCourseData(
        filteredCourses?.map(({ instructor_user, ...course }) => ({
          ...course,
          instructor: instructor_user,
        }))
      );
    }, [categoryId]);


    // const courseData = useMemo(() => {
    //   return filteredCourses?.map(({ instructor_user, ...course }) => ({
    //     ...course,
    //     instructor: instructor_user,
    //   }));
    // }, [categoryId , courses , filteredCourses]);

    console.log(courseData, categoryId, 'courseDAta');

    return (
      <>
        <div className="grid md:grid-cols-3 gap-4">
          {courseData?.map((item) => (
            <Card
              key={item.id}
              style={{
                backgroundImage: `url(${item.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundBlendMode: 'overlay',
              }}
              className={` ${
                item.thumbnail ? 'bg-black/50' : colors[item.id % colors.length]
              } rounded-[30px] border-[#000]  border-2 `}
            >
              <CardHeader className="flex flex-row justify-between items-center ">
                <CardTitle>
                  <div className="border-[1px] border-[#000] text-xl p-2 bg-yellow-400 rounded-[12px] ">
                    {item.course_name}
                  </div>
                </CardTitle>
                {/* <div className="flex gap-2"> */}
                <div className="flex">
                  <DiamondIcon level={item.level} />
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <h1 className="font-semibold text-sm italic">
                  {' '}
                  # {item.category?.name}
                </h1>
                <div>
                  <div className="flex flex-row space-y-3 justify-between items-center">
                    {item.current_price !== item.original_price ? (
                      <p>
                        {' '}
                        <span className=" line-through text-bold text-lg">
                          {item.original_price}
                        </span>{' '}
                        <span className="  text-bold text-2xl">
                          {item.current_price}
                        </span>
                      </p>
                    ) : (
                      <p className=" text-bold text-2xl">
                        {item.original_price}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar>
                    <AvatarImage
                      src={
                        item.instructor?.profile_photo ??
                        'https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-855.jpg?t=st=1745149180~exp=1745152780~hmac=c9856d3624a26dbf70a13a771e92adcfda094a0f1ddaf828a1628cd879ada4fd&w=740'
                      }
                      alt={item.instructor?.username}
                    />
                    <AvatarFallback
                      className={`${
                        colors[item.id % colors.length]
                      } filter hue-rotate-180 border `}
                    >
                      {item.instructor?.username.slice(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <h1>{item.instructor?.username}</h1>
                </div>
                {authUser ? (
                  <Button
                    className="bg-orange-600 text-md rounded-lg hover:bg-orange-700"
                    onClick={() => navigate(`/course-details/${item.id}`)}
                  >
                    Watch
                  </Button>
                ) : (
                  <Button
                    className="bg-orange-600 text-md rounded-lg hover:bg-orange-700"
                    onClick={() => navigate(`/courses/${item.id}`)}
                  >
                    Enroll
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
        <div>
          {courseData?.length === 0 && (
            <h1 className=" text-3xl text-center text-red-300 ">
              There is no course , Explore more field or categpry{' '}
            </h1>
          )}
        </div>
      </>
    );
  }
  // }
);

export default StudentCourseCard;
