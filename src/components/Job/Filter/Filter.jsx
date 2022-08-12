import { FilterIcon, SearchIcon } from "@heroicons/react/solid";
import React from "react";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Filter = ({
  setOpenNewPost,
  recent,
  setRecent,
  mostLiked,
  setMostLiked,
  mostComments,
  setMostComments,
}) => {
  const tabs = [
    {
      id: 1,
      name: "Recent",
      href: "#",
      current: recent ? true : false,
      onClick: () => setRecent(!recent),
      // onclick: setRecent(!recent),
    },
    {
      id: 2,
      name: "Most Liked",
      href: "#",
      current: mostLiked ? true : false,
      // onclick: setMostLiked(!mostLiked),
    },
    {
      id: 3,
      name: "Most Comments",
      href: "#",
      current: mostComments ? true : false,
      // onclick: setMostComments(!mostComments),
    },
  ];
  const tabClick = (tabId) => {
    // console.log(tabId === "1")
    if (tabId === 1 || tabId === "1") {
      setRecent(true);
      setMostLiked(false);
      setMostComments(false);
    } else if (tabId === 2 || tabId === "2") {
      setMostLiked(true);
      setRecent(false);
      setMostComments(false);
    } else if (tabId === 3 || tabId === "3") {
      setMostComments(true);
      setRecent(false);
      setMostLiked(false);
    }
  };
  return (
    <div className="flex space-x-4">
      <div className="flex-1 min-w-0">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="search"
            name="search"
            id="search"
            className="text-slate-400 border bg-white text-gray-600 border-gray-300 dark:border-0 rounded-md shadow-sm hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700 block w-full pl-10 sm:text-sm dark:focus:bg-transparent focus:outline-none "
            placeholder="Search"
          />
        </div>
      </div>
      <button
        type="button"
        className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm dark:border-0 dark:bg-slate-800 dark:hightlight-white/5 dark:hover:bg-slate-700 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-gray-500 dark:focus:ring-slate-700"
      >
        <FilterIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        <span className="sr-only">Search</span>
      </button>
    </div>
  );
};

export default Filter;
