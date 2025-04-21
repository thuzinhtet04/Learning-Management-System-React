import React, { FormEvent, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const SearchInput = ({
  onSubmit,
}: {
  onSubmit: (e: FormEvent<HTMLFormElement>, search: string) => void;
}) => {
  const [search, setSearch] = useState<string>('');
  const [searchParams] = useSearchParams();
  return (
    <form
      onSubmit={(e) => {
        onSubmit(e, search);
      }}
    >
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="search"
          onChange={(e) => {
            if (e.target.value !== '') setSearch(e.target.value);
          }}
          defaultValue={searchParams.get('search') as string}
          className="block w-full p-2  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
        />
        <button
          type="submit"
          className="text-white border-l   absolute bottom-0 right-0 h-full bg-gray-700 hover:bg-gray-800   font-medium rounded-lg rounded-s-none text-sm px-4 py-2 "
        >
          <svg
            className="w-4 h-4 text-white "
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchInput;
