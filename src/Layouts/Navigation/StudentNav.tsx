import { ModeToggle } from '@/components/mode-toggle';
import { useAuthStore } from '@/store/authStore';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';
import SearchInputPopover from '@/Layouts/Navigation/SearchInputPopover';
import { Search } from 'lucide-react';
import { useSearchContext } from '@/provider/search-provider';
import { useMyCourses } from '@/store/useMyCourses';
import { FormEvent, useState } from 'react';
// import { Search } from 'lucide-react';
const StudentNav = () => {
  const { authUser, token } = useAuthStore();
  const [search, setSearch] = useState<string>('');
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log('pathname >>>', pathname);
  const { setSearchText } = useSearchContext();
  // console.log('searchText >>>', searchText);
  const nav = useNavigate();
  const { courses, getCourseByName } = useMyCourses();
  console.log(token);

  const handleSearch = async (
    e: FormEvent<HTMLFormElement>,
    search: string
  ) => {
    e.preventDefault();
    setSearchParams({ search: search });
  };
  return (
    <header className="h-20 w-full  flex justify-between items-center px-2  border-slate-600">
      <div className="flex justify-between items-center">
        <SidebarTrigger variant={'outline'} />

        <Separator orientation="vertical" className="mr-2 h-4" />

        {authUser ? (
          <Link to="/" className="text-xl font-bold ">
            {authUser.data.username}{' '}
          </Link>
        ) : (
          <p>
            {' '}
            You are in Guest Mode,please <a href="/login">SignIn</a> here{' '}
          </p>
        )}
      </div>

      <div className="flex flex-row gap-2 justify-between items-center ">
        <div className="">
          {pathname.includes('/course-details/') ? (
            <SearchInputPopover />
          ) : (
            <form
              onSubmit={(e) => {
                // e.preventDefault();
                handleSearch(e, search);
                nav('/courses');
              }}
              className="flex justify-between items-center px-3 border border-gray-300 rounded-full"
            >
              <input
                type="text"
                name="search"
                placeholder="Explore Courses..."
                className="w-full   bg-red-500 max-w-xs p-2  text-sm outline-none   "
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
              <button>
                <Search className="w-5" />
              </button>
            </form>
          )}
        </div>
        <div className="flex flex-row  gap-2 justify-between items-center">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};

export default StudentNav;
