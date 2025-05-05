import { useEffect, useState } from 'react';
import CourseCard from './course-card';
import ExploreNavigationMenu from './explore-navigation-menu.';
import { useDebounce } from '@uidotdev/usehooks';
import { useSearchContext } from '@/provider/search-provider';
import { useQuery } from '@tanstack/react-query';
import { getAllCourses } from '@/services';
import { useLocation, useSearchParams } from 'react-router-dom';
import { Course } from '../studentCourse/types';
import { fetchCourses } from '@/features/authentication/service/services';

interface AllCoursePagiResponse {
  message: string;
  data: Course[];
  current_page: number;
  last_page: number;
  next_page_url: number;
  per_page: number;
  prev_page_url: number;
  total: number;
}

export default function AllCourses() {
  const [category, setCategory] = useState(0);
  const { search: param, state } = useLocation();
  const { searchValue } = state || {};
  console.log(searchValue, 'state');
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchText, setSearchText } = useSearchContext();

  useEffect(() => { const params = Object.fromEntries(searchParams.entries());
   
    setSearchParams({
      ...params,
      category: `${category}`,
    }); //not replace , just add the param to original params
    if (searchValue) {
      setSearchParams({ ...params, search: searchValue });
    }
  }, [category , state]);

  const {
    data: allCourses,
    isError,
    isLoading,
  } = useQuery<AllCoursePagiResponse>({
    queryKey: ['allCourses', searchText, category, param],
    queryFn: () => getAllCourses(searchText, category),
    staleTime: 60 * 1000,
  });

  if (isError) return <div>Something Wrong</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!allCourses) return <h1>There is no course for this specific part</h1>;

  console.log(
    allCourses?.data.filter((course) => course!.category?.id === category),
    'filter course'
  );
  // console.log('searchCourses.length >>>', searchCourses.length);

  return (
    <main>
      <div className="flex gap-3 items-center mb-3">
        <div className="text-lg font-bold mb-1">All Courses</div>
        <ExploreNavigationMenu onCategoryId={setCategory} category={category} />
        {/* <SearchInput search={search} onSearch={setSearch} /> */}
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {category === 0 &&
          allCourses?.data.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        {category !== 0 &&
          allCourses?.data
            .filter((course) => course!.category?.id === category)
            .map((course) => <CourseCard key={course.id} course={course} />)}
      </div>
    </main>
  );
}
