import { dummyStudentUserData } from '@/constant/dummy-data';
import StudentCourseCard from './StudentCourseCard';
import { useQuery } from '@tanstack/react-query';
import { fetchEnrollCourses } from '@/features/authentication/service/services';
import { useSearchParams } from 'react-router-dom';
import { useMyCourses } from '@/store/useMyCourses';
import { use, useEffect } from 'react';

interface Props {
  categoryId: number;
}

const StudentCourses = ({ categoryId }: Props) => {


  const [searchParams, setSearchParams] = useSearchParams();
  const {
    data: enrolledCourses,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () => fetchEnrollCourses(),
    queryKey: ['courses', 'enrolled'],
  });
  const { setCourses } = useMyCourses();

  useEffect(() => {
    setCourses(enrolledCourses?.data);
    
    console.log(enrolledCourses?.data , "enrolled-courses-fetch")

  }, [enrolledCourses]);

  return (
    <div>
      <StudentCourseCard
        categoryId={categoryId}
        enrollments={enrolledCourses}
      />
    </div>
  );
};

export default StudentCourses;
