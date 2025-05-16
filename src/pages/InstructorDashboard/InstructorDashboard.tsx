import { fetchCourseByInstructor } from '@/services';
import { useQuery } from '@tanstack/react-query';
import CourseDataTable from './course-data-table';
import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { useCategories } from '@/store/useCategories';
import { CategoryInterface } from '../studentCourse/types';
import { fetchCategories } from '@/features/authentication/service/services';

const InstructorDashboard = () => {
  const { authUser } = useAuthStore();
  // const [pageIndex, setPageIndex] = useState(1);
  const [url, setUrl] = useState(
    '/courses?instructor=' + authUser?.data.username
  );
  const { setCategories } = useCategories();

  const {
    data: allCourses,
    refetch,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['allCourses', 'instructor', authUser?.data.username, url],
    queryFn: () => fetchCourseByInstructor(url),
    staleTime: 60 * 1000,
  });

  const { data } = useQuery<CategoryInterface[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    meta: {
      errorMessage: 'Failed to fetch Categories',
    },
  });
  useEffect(() => {
   
    if (data) {
      console.log(data , 'cate')
      setCategories(data);
    }
  }, [data]);

  if (isError) return <div>Something Wrong</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!allCourses) return null;

  return (
    <div>
      <div className="font-semibold">Instructor Dashboard</div>

      <CourseDataTable
        courses={allCourses}
        setPageIndex={setUrl}
        refetch={refetch}
      />
    </div>
  );
};

export default InstructorDashboard;
