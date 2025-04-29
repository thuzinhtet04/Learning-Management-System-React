import { dummyStudentUserData } from '@/constant/dummy-data';
import StudentCourseCard from './StudentCourseCard';
import { useQuery } from '@tanstack/react-query';
import { fetchEnrollCourses } from '@/features/authentication/service/services';
import { useSearchParams } from 'react-router-dom';

interface Props {
  categoryId: number;
}

const StudentCourses = ({ categoryId }: Props) => {
  //! need to  fix my-course

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: enrolledCourses,
    isLoading,
    isError,
  } = useQuery({
    queryFn: () =>
      fetchEnrollCourses(
        `${categoryId !== 0 ? 'category=' + categoryId : ''}${
          searchParams.toString() ? searchParams.toString() + '&' : '&'
        }`
      ),
    queryKey: ['courses', 'enrolled', categoryId, searchParams.toString()],
  });

  // const customEnrollments = enrolledCourses?.filter(
  //   (data) => data.course?.categoryId === categoryId
  // );

  // if (!dummyStudentUserData.enrollments)
  //   return <div>enrollments not found</div>;

  console.log(enrolledCourses, "parent")
  return (
    <div>
      {categoryId === 0 && (
        <StudentCourseCard enrollments={enrolledCourses} />
      )}
      {/* {categoryId !== 0  && (
        <StudentCourseCard enrollments={customEnrollments} />
      )} */}
    </div>
  );
};

export default StudentCourses;
