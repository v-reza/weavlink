import React from "react";
import { BookmarkIcon } from "@heroicons/react/outline";
const navigation = [
  { name: "My Items", href: "#", icon: BookmarkIcon, current: true },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({ postedJobs }) => {
  return (
    <div className="hidden lg:block h-max lg:col-span-3 xl:col-span-2 bg-white dark:bg-slate-800 rounded-lg shadow sticky top-24">
      <nav aria-label="Sidebar" className="top-4 divide-y divide-gray-300">
        <div className="pb-6 space-y-1 mt-2 px-0">
          <div className="px-2">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={classNames(
                  "group flex items-center px-3 py-2 text-sm font-medium rounded-md dark:text-white"
                )}
                aria-current={item.current ? "page" : undefined}
              >
                <item.icon
                  className={classNames(
                    "flex-shrink-0 -ml-1 mr-3 h-6 w-6 dark:text-white"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate dark:text-slate-300">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
          <div className="mt-0">
            <div className="mt-2 relative">
              <div
                className="absolute inset-0 flex items-center"
                aria-hidden="true"
              >
                <div className="w-full border-t border-gray-300 dark:border-slate-600" />
              </div>
            </div>
          </div>
          <div className="mt-0">
            <div className="border-l-4 border-blue-500 flex items-center justify-between px-4 mt-6 cursor-pointer">
              <div className="dark:text-blue-300 dark:hover:text-slate-200 cursor-pointer w-full">
                <span>Posted Jobs</span>
              </div>
              <span className="dark:text-slate-200 text-sm">
                {postedJobs?.length}
              </span>
            </div>
          </div>
          <div className="mt-0">
            <div className="flex items-center justify-between px-4 mt-4 cursor-pointer">
              <div className="dark:text-slate-300 dark:hover:text-slate-200 cursor-pointer w-full">
                <span>My Jobs</span>
              </div>
              <span className="dark:text-slate-200 text-sm">12</span>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
