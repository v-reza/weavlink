import React from "react";
import {
  BookmarkIcon,
  BellIcon,
  CashIcon,
  ClipboardCheckIcon,
  CalendarIcon,
  BriefcaseIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
const navigation = [
  { name: "My Jobs", href: "#", icon: BookmarkIcon, current: true },
  { name: "Job alerts", href: "#", icon: BellIcon, current: false },
  { name: "Salary", href: "#", icon: CashIcon, current: false },
  { name: "Skills Test", href: "#", icon: ClipboardCheckIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SidebarRecommended = ({ listJobs }) => {
  const navigate = useNavigate();
  return (
    <div
      className={classNames(
        "overflow-hidden lg:block flex-grow h-max sm:col-span-4 xs:col-span-4 lg:col-span-4 xl:col-span-4 bg-white dark:bg-slate-800 rounded-lg shadow sticky top-24"
      )}
    >
      <nav
        aria-label="Sidebar"
        className={classNames(
          listJobs.length > 13 ? "h-screen" : "h-max",
          "top-4 divide-y divide-gray-300 flex-grow overflow-y-auto"
        )} //h-screen if you want to scroll
      >
        <div className="pb-6 space-y-1 mt-4 px-3">
          <h2 className="mb-3 dark:text-white text-md flex items-center justify-center">
            Job Recommended for you
          </h2>
          {listJobs.map((listJob) => (
            <div
              onClick={() =>
                navigate("/job/collections/recommended/" + listJob._id)
              }
              className="dark:bg-transparent rounded-md border dark:border-slate-600 shadow"
              key={listJob._id}
            >
              <div className="cursor-pointer block hover:bg-gray-50 dark:hover:bg-slate-800">
                <div className="px-4 py-4 flex items-center sm:px-6">
                  <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                    <div className="truncate">
                      <div className="flex text-sm">
                        <p className="font-medium text-indigo-600 dark:text-[#70B5F9] truncate">
                          {listJob?.title}
                        </p>
                        <p className="ml-1 flex-shrink-0 font-normal text-gray-500 dark:text-slate-400">
                          in {listJob?.company?.companyName}
                        </p>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500 dark:text-slate-400">
                          <BriefcaseIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-slate-400"
                            aria-hidden="true"
                          />
                          <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-500">
                            {listJob?.jobType}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex">
                        <div className="flex items-center text-sm text-gray-500 dark:text-slate-400">
                          <CalendarIcon
                            className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-slate-400"
                            aria-hidden="true"
                          />
                          <p>
                            Closing on{" "}
                            <time dateTime={listJob?.closed}>
                              {listJob?.closed}
                            </time>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex-shrink-0 sm:mt-0 sm:ml-5">
                      <div className="flex overflow-hidden -space-x-1">
                        {/* {position.applicants.map((applicant) => (
                    <img
                      key={applicant.email}
                      className="inline-block h-6 w-6 rounded-full ring-2 ring-white dark:ring-transparent"
                      src={applicant.imageUrl}
                      alt={applicant.name}
                    />
                  ))} */}
                      </div>
                    </div>
                  </div>
                  <div className="ml-5 flex-shrink-0">
                    <ChevronRightIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default SidebarRecommended;
