/* eslint-disable jsx-a11y/no-redundant-roles */
import { LinearProgress, Skeleton } from "@mui/material";
import React, { Suspense } from "react";
import { useState } from "react";
import useFolder from "../../../hooks/useFolder";
import ListPostedJobs from "./shared/ListPostedJobs";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PostedJob({ postedJobs }) {
  const folder = useFolder();
  const [isFilter, setIsFilter] = useState(false);
  
  return (
    <div>
      <h1 className="sr-only">Recent questions</h1>
      <ul role="list" className="space-y-4">
        <div className="overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            <section aria-labelledby="who-to-follow-heading">
              <div className="bg-white rounded-lg shadow dark:bg-slate-800">
                <div className="p-6">
                  <h2 className="text-base font-medium text-gray-900 dark:text-white">
                    Posted Jobs
                  </h2>
                  {postedJobs.length > 0 ? (
                    <>
                      <div className="mt-8 pb-16 flow-root">
                        <ul
                          role="list"
                          className="-my-4 flex items-center space-x-4"
                        >
                          <button
                            onClick={() => setIsFilter(false)}
                            type="button"
                            className={classNames(
                              !isFilter
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-gray-400",
                              "inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md"
                            )}
                          >
                            Draft
                          </button>
                          <button
                            onClick={() => setIsFilter(true)}
                            type="button"
                            className={classNames(
                              isFilter
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "bg-gray-400",
                              "inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md"
                            )}
                          >
                            Published
                          </button>
                        </ul>
                        <div className="mt-8">
                          <div className="mt-4 relative">
                            <div
                              className="absolute inset-0 flex items-center"
                              aria-hidden="true"
                            >
                              <div className="w-full border-t border-gray-300 dark:border-slate-700" />
                            </div>
                          </div>
                        </div>
                        <Suspense fallback={<LinearProgress />}>
                          {postedJobs
                            .filter((job) => job.isActive === isFilter)
                            .map((job) => (
                              <ListPostedJobs job={job} key={job._id}/>
                            ))}
                        </Suspense>
                      </div>
                    </>
                  ) : (
                    <div className="mt-8 pb-16 flow-root">
                      <ul
                        role="list"
                        className="-my-4 divide-y divide-gray-200"
                      >
                        <div className="bg-transparent overflow-hidden rounded-md">
                          <div>
                            <div className="flex items-center justify-center">
                              <img
                                src={folder + "/noJob.png"}
                                alt=""
                                width={150}
                                height={150}
                              />
                            </div>

                            <p className="mt-4 dark:text-slate-300 text-base font-medium text-center">
                              No posted jobs under this category yet.
                            </p>
                            <p className="dark:text-slate-400 text-sm text-center">
                              Jobs that you post will show up here.
                            </p>
                          </div>
                          {/* <Suspense fallback={<LinearProgress />}>
                            {jobs.length > 0 ? (
                              jobs.map((job) => (
                                <ListPost jobs={job} key={job._id} />
                              ))
                            ) : (
                              <>
                                <Skeleton variant="rounded" height={80} />
                                <br />
                                <Skeleton variant="rounded" height={80} />
                                <br />
                                <Skeleton variant="rounded" height={80} />
                              </>
                            )}
                          </Suspense> */}
                        </div>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </ul>
        </div>
        {/* <div className="overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            <section aria-labelledby="who-to-follow-heading">
              <div className="bg-white rounded-lg shadow dark:bg-slate-800">
                <div className="p-6">
                  <h2 className="text-base font-medium text-gray-900 dark:text-white">
                    More jobs for you
                  </h2>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-4 divide-y divide-gray-200">
                      <ListPost />
                    </ul>
                  </div>
                  <div className="mt-8">
                    <div className="cursor-pointer w-full block text-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 dark:bg-slate-700 dark:border-2 dark:border-slate-700 dark:text-white dark:highlight-white/5 dark:hover:bg-slate-800">
                      View all
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </ul>
        </div> */}
      </ul>
    </div>
  );
}
