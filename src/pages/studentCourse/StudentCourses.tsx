import { dummyStudentUserData } from '@/constant/dummy-data';
import StudentCourseCard from './StudentCourseCard';
import { useQuery } from '@tanstack/react-query';

interface Props {
  categoryId: number;
}

const StudentCourses = ({ categoryId }: Props) => {
  const {data  :  enrolledCourses , isLoading , isError} = useQuery({
queryFn : fetchEnrolledCourses,
queryKey : ["courses" , "enrolled"]
  })
 
  const customEnrollments = enrolledCourses?.filter(
    (data) => data.course?.categoryId === categoryId
  );

  if (!dummyStudentUserData.enrollments)
    return <div>enrollments not found</div>;

  return (
    <div>
      {categoryId === 0 && (
        <StudentCourseCard enrollments={dummyStudentUserData.enrollments} />
      )}
      {categoryId !== 0 && customEnrollments && (
        <StudentCourseCard enrollments={customEnrollments} />
      )}
    </div>
  );
};

export default StudentCourses;
