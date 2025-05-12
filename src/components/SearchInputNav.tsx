import SearchInputPopover from '@/Layouts/Navigation/SearchInputPopover';
import { Search } from 'lucide-react';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface props {
  pathname: string;
  setSearchText: (search: string) => void;
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const SearchInputNav = ({
  pathname,
  setSearchText,
  search,
  setSearch,
}: props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const nav = useNavigate();
  return (
    <div className="">
      {pathname.includes('/course-details/') ? (
        <SearchInputPopover />
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearchText(search);
            // handleSearch(e, search);
            if (pathname === '/courses') {
              const params = Object.fromEntries(searchParams.entries());
              setSearchParams({ ...params, search: search });
            } else {
              nav(`/courses?search=${search}`);
            }
          }}
          className="flex justify-between items-center px-3 border border-gray-300 rounded-full"
        >
          <input
            type="text"
            name="search"
            defaultValue={searchParams.get('search')!}
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
  );
};

export default SearchInputNav;
