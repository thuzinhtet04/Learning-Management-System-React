/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ChevronDown,
  Eye,
  MoreHorizontal,
  Pencil,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Course, CourseResponse } from '../studentCourse/types';
import { CourseTableType } from './types';
import { useMemo, useState } from 'react';
import { useColumnOptions } from './columns';
import { formatPrice } from '@/utils';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { af } from 'date-fns/locale';
import {
  deleteLesson,
  fetchCourseByInstructor,
  fetchLessons,
} from '@/services';
import { useAuthStore } from '@/store/authStore';

type Props = {
  courses: CourseResponse;
  setPageIndex: React.Dispatch<React.SetStateAction<string>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function LessonDataTable() {
  const [sorting, setSorting] = useState<SortingState>([]);

  const [page, setPage] = useState(1);
  const { authUser } = useAuthStore();

  const {
    data: lessons,
    refetch,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['lessons', page, authUser?.data.username],
    queryFn: () => fetchLessons(page),
    staleTime: 60 * 1000,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: deleteLesson,
    mutationKey: ['lessons', page, authUser?.data.username],
  });
  console.log(lessons);

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        {/* <Input
          placeholder="Search Course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        /> */}

        <Link to={'/lessons/new'}>
          <Button>Create New lesson</Button>
        </Link>
      </div>
      <div className="rounded-md border">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Details
                </th>
                <th scope="col" className="px-6 py-3">
                  Publish
                </th>
                <th scope="col" className="px-6 py-3">
                  Course Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {lessons?.data.data.map((lesson, index) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {lesson.title}
                  </th>
                  <td className="px-6 py-4">{lesson.lesson_detail}</td>
                  <td className="px-6 py-4">{lesson.is_available}</td>
                  <td className="px-6 py-4">{lesson.course_id}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <a
                        href={`/lessons/${lesson.id}/edit`}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Edit
                      </a>
                      <button
                        className=" border border-red-400 p-1"
                        onClick={() => {
                          console.log(lesson.id, lesson.course_id);
                          mutate({
                            courseId: lesson.course_id,
                            lessonId: lesson.id,
                          });
                          refetch();
                        }}
                      >
                       {!isPending ? "Delete" : "..."}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(lessons.prev_page_url ?? page - 1)}
            disabled={lessons?.data.current_page == 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(lessons.next_page_url ?? page + 1)}
            disabled={
              lessons?.data.current_page === lessons?.data.last_page
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
