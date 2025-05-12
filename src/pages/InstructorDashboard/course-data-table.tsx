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
  useQuery,
} from '@tanstack/react-query';
import { useDebounce } from '@uidotdev/usehooks';
import { af } from 'date-fns/locale';
import { fetchCourseByInstructor } from '@/services';
import { useAuthStore } from '@/store/authStore';

type Props = {
  courses: CourseResponse;
  setPageIndex: React.Dispatch<React.SetStateAction<string>>;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
};

export default function CourseDataTable({
  courses,
  setPageIndex,
  refetch,
}: Props) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [search, setSearch] = useState('');
  console.log(courses, 'courses');
  const bounce = useDebounce(search, 200);
  const { authUser } = useAuthStore();

  const {
    data: searchCourses,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ['allCourses', 'instructor', authUser?.data.username, bounce],
    queryFn: () =>
      fetchCourseByInstructor(
        '/courses?instructor=' + authUser?.data.username,
        '&search=' + bounce
      ),
    staleTime: 60 * 1000,
  });

  const data = useMemo(() => {
    if (search && searchCourses) {
      return searchCourses?.data.map((data) => ({
        id: data.id,
        categoryName: data.course_name,
        courseName: data.course_name,
        currentPrice: parseFloat(data.current_price),
        totalIncome: parseFloat(data.current_price) * data.students.length,
        studentCount: data.students.length,
      }));
    }
    return courses?.data.map((data) => ({
      id: data.id,
      categoryName: data.course_name,
      courseName: data.course_name,
      currentPrice: parseFloat(data.current_price),
      totalIncome: parseFloat(data.current_price) * data.students.length,
      studentCount: data.students.length,
    }));
  }, [courses, searchCourses]);

  const totalIncome = data.reduce((prev, cur) => prev + cur.totalIncome, 0);

  const columns = useColumnOptions(refetch);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    onSortingChange: setSorting,
    // onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    pageCount: courses?.last_page ?? -1,
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search Course..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Link to={'/courses/new'}>
          <Button>Create New Course</Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  // colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 font-medium text-green-500 ">
          Total Income :{' '}
          <span className=" text-white">{formatPrice(totalIncome)}</span>
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(courses.next_page_url ?? '')}
            disabled={courses.current_page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(courses.prev_page_url ?? '')}
            disabled={
              courses.current_page === courses.last_page ||
              courses.current_page < courses.last_page
            }
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
