import { fetchCourses } from '@/features/authentication/service/services';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import StudentCourseCard from './StudentCourseCard';

import DiamondIcon from './diamond-icon';
import CoursesLoader from '../Courses/CoursesLoader';

interface Props {
  categoryId: number;
}
const IndexCourses = ({ categoryId }: Props) => {

    console.log(categoryId)
  const {
    data: courses,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => fetchCourses(`category=${categoryId===0 ? "" : categoryId}`),
    queryKey: ['courses' , `category=${categoryId}`],
  });
  if (isLoading) return <CoursesLoader count={8} />;
  if (courses)
    return (
      <div>
        {categoryId === 0 && <StudentCourseCard enrollments={courses} />}
        {categoryId !== 0 &&  <StudentCourseCard enrollments={courses} />}
      </div>
    );
};

export default IndexCourses;
