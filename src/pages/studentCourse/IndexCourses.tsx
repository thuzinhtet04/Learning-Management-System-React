import { fetchCourses } from '@/features/authentication/service/services';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import StudentCourseCard from './StudentCourseCard';

import DiamondIcon from './diamond-icon';
import CoursesLoader from '../Courses/CoursesLoader';
import { useSearchParams } from 'react-router-dom';
import NoAuthCourseCard from './NoauthCourseCard';

interface Props {
  categoryId: number;
}
const IndexCourses = ({ categoryId }: Props) => {
  const [searchParams , setSearchParams] = useSearchParams();
 console.log("fresh",searchParams.toString())


  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => fetchCourses(`${ categoryId!==0 ? ( "category="+categoryId+"&") : "" }${searchParams.toString() ? searchParams.toString()+"&" : "&"  }`),
    queryKey: ['courses' , `category=${categoryId}&search=${searchParams.toString()}`],
  });
  if (isLoading) return <CoursesLoader count={8} />;
  if (courses)
    return (
      <div>
        <NoAuthCourseCard  enrollments={courses} />
      </div>
    );
};

export default IndexCourses;
