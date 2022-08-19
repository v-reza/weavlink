/* eslint-disable jsx-a11y/no-redundant-roles */
/* This example requires Tailwind CSS v2.0+ */
import {
    BriefcaseIcon,
    CalendarIcon,
    ChevronRightIcon,
  } from "@heroicons/react/solid";
  import { useNavigate } from "react-router-dom";
  
  
  export default function ListPostedJobs() {
    const navigate = useNavigate()
    return (
      <>
        <li>
          <div className="cursor-pointer block hover:bg-gray-50 dark:highlight-white/5 dark:hover:bg-slate-800">
            <div className="px-4 py-4 flex items-center sm:px-6">
              <div className="min-w-0 flex-1 sm:flex sm:items-center sm:justify-between">
                <div className="truncate">
                  <div className="flex text-sm">
                    <p className="font-medium text-indigo-600 dark:text-[#70B5F9] truncate">
                      Title
                    </p>
                    <p className="ml-1 flex-shrink-0 font-normal text-gray-500 dark:text-slate-400">
                      {/* in {jobs?.company?.companyName} */}
                      asd
                    </p>
                  </div>
                  <div className="mt-2 flex">
                    <div className="flex items-center text-sm text-gray-500 dark:text-slate-400">
                      <BriefcaseIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-slate-400"
                        aria-hidden="true"
                      />
                      <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-500">
                        assd
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex">
                    <div className="flex items-center text-sm text-gray-500 dark:text-slate-400">
                      <CalendarIcon
                        className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400 dark:text-slate-400"
                        aria-hidden="true"
                      />
                      {/* <p>
                        Closing on{" "}
                        <time dateTime={jobs?.closed}>
                          {jobs?.closed}
                        </time>
                      </p> */}
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
        </li>
      </>
    );
  }
  