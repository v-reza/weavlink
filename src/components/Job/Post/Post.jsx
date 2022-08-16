/* eslint-disable jsx-a11y/no-redundant-roles */
import { LinearProgress, Skeleton } from "@mui/material";
import React, { Suspense } from "react";
import ListPost from "./shared/ListPost";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Post = ({ jobs }) => {
  return (
    <div className="mt-4">
      <h1 className="sr-only">Recent questions</h1>
      <ul role="list" className="space-y-4">
        <div className="overflow-hidden sm:rounded-md">
          <ul role="list" className="divide-y divide-gray-200">
            <section aria-labelledby="who-to-follow-heading">
              <div className="bg-white rounded-lg shadow dark:bg-slate-800">
                <div className="p-6">
                  <h2 className="text-base font-medium text-gray-900 dark:text-white">
                    More jobs for you
                  </h2>
                  <div className="mt-6 flow-root">
                    <ul role="list" className="-my-4 divide-y divide-gray-200">
                      <div
                        className={classNames(
                          jobs.length > 0
                            ? "shadow-md dark:bg-slate-700 dark:shadow-slate-700"
                            : "dark:bg-transparent",
                          "bg-white  overflow-hidden rounded-md"
                        )}
                      >
                        <ul
                          role="list"
                          className={classNames(
                            jobs.length > 0
                              ? "divide-y dark:divide-slate-600"
                              : "",
                            " divide-gray-300"
                          )}
                        >
                          <Suspense fallback={<LinearProgress />}>
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
                          </Suspense>
                        </ul>
                      </div>
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
};

export default Post;
