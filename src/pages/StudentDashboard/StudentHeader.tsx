import { Button } from '@/components/ui/button';
import LoaderButton from '@/components/ui/loaderButton';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { courseDummyCategory } from '@/constant/dummy-data';
import { fetchCategories } from '@/features/authentication/service/services';
import { useAuthStore } from '@/store/authStore';
import { useCategories } from '@/store/useCategories';
import { useQuery } from '@tanstack/react-query';
import { CategoryInterface } from '../studentCourse/types';
import { FormEvent, useEffect } from 'react';
import SearchInput from '@/components/SearchInput';
import API from '@/features/authentication/service/api';
import { useLocation, useSearchParams } from 'react-router-dom';
import { useMyCourses } from '@/store/useMyCourses';

interface Props {
  categoryId: number;
  setCategoryId: (id: number) => void;
}
const arr = Array.from({ length: 5 }).map((_, index) => index + 1);

export default function StudentHeader({ categoryId, setCategoryId }: Props) {
  const { categories, setCategories } = useCategories();
  const path = useLocation();
  const { data, isLoading, isError } = useQuery<CategoryInterface[], Error>({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    meta: {
      errorMessage: 'Failed to fetch Categories',
    },
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const { authUser } = useAuthStore();
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
  const { getCourseByCategory } = useMyCourses();
  const handleSearch = async (
    e: FormEvent<HTMLFormElement>,
    search: string
  ) => {
    e.preventDefault();
    setSearchParams({ search: search });
  };

  return (
    <header className="h-20 w-full mt-5 flex  justify-between  space-x-2 ">
      <div className="hidden md:block md:text-2xl font-bold mb-2 ">
        {authUser?.data.username ? 'My Courses' : 'Explore Courses'}
      </div>
      <div className="flex items-stretch  gap-1 ">
        {!authUser && <SearchInput onSubmit={handleSearch} />}

        <Button
          variant={`${categoryId === 0 ? 'default' : 'outline'}`}
          onClick={() => {
            setCategoryId(0);
            getCourseByCategory(0);
          }}
        >
          All Courses
        </Button>

        <ScrollArea className="max-w-[180px] md:max-w-md whitespace-nowrap mt-0 rounded-md pb-1">
          <div className="flex flex-row gap-1  justify-between items-center overflow-x-auto w-auto p-1 pb-2">
            {isLoading && arr.map((index) => <LoaderButton key={index} />)}
            {!isLoading &&
              !isError &&
              data!?.map((category) => (
                <Button
                  variant={`${
                    categoryId === category.id ? 'default' : 'outline'
                  }`}
                  key={category.id}
                  onClick={() => {
                    setCategoryId(category.id);
                    getCourseByCategory(category.id);
                  }}
                >
                  {category.name}
                </Button>
              ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </header>
  );
}
