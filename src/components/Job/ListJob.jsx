/* eslint-disable jsx-a11y/no-redundant-roles */
/* This example requires Tailwind CSS v2.0+ */
import { CalendarIcon } from "@heroicons/react/outline";
import {
  CheckIcon,
  FilterIcon,
  LinkIcon,
  PencilIcon,
  SearchIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import { LocationMarkerIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import { axiosDelete } from "../../helper/axiosHelper";
import useAuth from "../../hooks/useAuth";
import useHeader from "../../hooks/useHeader";
import useNotif from "../../hooks/useNotif";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListJob({
  jobs,
  setIsNewJob,
  setOpenPublishJob,
  setJobPublish,
  setRedirectJobDetail,
  setJobDetail,
}) {
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useNotif();
  const handleDelete = async (jobId) => {
    try {
      await axiosDelete("/jobs/" + jobId, headers)
        .then(() => {
          dispatch({
            type: "NOTIF_SUCCESS",
            title: "Success",
            message: "Job has been deleted",
          });
          setIsNewJob(true);
        })
        .catch(() => {
          dispatch({
            type: "NOTIF_ERROR",
            title: "Error",
            message: "You are not authorized to do this action",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex-1 relative  flex overflow-hidden">
      <main className="flex-1 relative  overflow-y-auto focus:outline-none xl:order-last">
        <article>
          {/* Profile header */}
          <div>
            <form className="mt-6 flex space-x-4 px-6" action="#">
              <div className="flex-1 min-w-0">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <SearchIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="search"
                    name="search"
                    id="search"
                    className="focus:ring-pink-500 focus:border-pink-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="inline-flex justify-center px-3.5 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
              >
                <FilterIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                <span className="sr-only">Search</span>
              </button>
            </form>
            <div className="bg-white shadow overflow-hidden sm:rounded-md mt-6 h-screen">
              {jobs.length > 0 ? (
                <ul role="list" className="divide-y divide-gray-200">
                  {jobs.map((job) => (
                    <li key={job._id}>
                      <div className="cursor-pointer block hover:bg-gray-50">
                        <div className="px-4 py-4 sm:px-6">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-medium text-indigo-600 truncate">
                              {job.title}
                            </p>
                            <div className="ml-2 flex-shrink-0 flex gap-2">
                              <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {job.jobType}
                              </p>
                              <p
                                className={classNames(
                                  job.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800",
                                  "px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                )}
                              >
                                {job.isActive ? "Published" : "Not Published"}
                              </p>

                              <Menu
                                as="div"
                                className="relative inline-block text-left"
                              >
                                <div>
                                  <Menu.Button className="-my-2 p-2 rounded-full bg-white flex items-center text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                                    <span className="sr-only">
                                      Open options
                                    </span>
                                    <DotsVerticalIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </Menu.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter="transition ease-out duration-100"
                                  enterFrom="transform opacity-0 scale-95"
                                  enterTo="transform opacity-100 scale-100"
                                  leave="transition ease-in duration-75"
                                  leaveFrom="transform opacity-100 scale-100"
                                  leaveTo="transform opacity-0 scale-95"
                                >
                                  <Menu.Items className="z-20 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                      <Menu.Item>
                                        {({ active }) => (
                                          <div
                                            className={classNames(
                                              "cursor-pointer flex justify-between px-4 py-2 text-sm"
                                            )}
                                          >
                                            <button
                                              onClick={() => {
                                                setJobDetail(job);
                                                setRedirectJobDetail(true);
                                              }}
                                              type="button"
                                              className="inline-flex w-full items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                                            >
                                              <LinkIcon
                                                className="-ml-1 mr-2 h-5 w-5 text-gray-300"
                                                aria-hidden="true"
                                              />
                                              View
                                            </button>
                                          </div>
                                        )}
                                      </Menu.Item>
                                      <Menu.Item>
                                        {({ active }) => (
                                          <div
                                            className={classNames(
                                              "cursor-pointer flex justify-between px-4 py-2 text-sm"
                                            )}
                                          >
                                            <button
                                              type="button"
                                              className="inline-flex w-full items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                                            >
                                              <PencilIcon
                                                className="-ml-1 mr-2 h-5 w-5 text-gray-300"
                                                aria-hidden="true"
                                              />
                                              Edit
                                            </button>
                                          </div>
                                        )}
                                      </Menu.Item>
                                      {!job.isActive && (
                                        <Menu.Item>
                                          {({ active }) => (
                                            <div
                                              className={classNames(
                                                "cursor-pointer flex justify-between px-4 py-2 text-sm"
                                              )}
                                            >
                                              <button
                                                onClick={() => {
                                                  setOpenPublishJob(true);
                                                  setJobPublish(job);
                                                }}
                                                type="button"
                                                className="inline-flex w-full items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                                              >
                                                <CheckIcon
                                                  className="-ml-1 mr-2 h-5 w-5"
                                                  aria-hidden="true"
                                                />
                                                Publish
                                              </button>
                                            </div>
                                          )}
                                        </Menu.Item>
                                      )}
                                      <Menu.Item>
                                        {({ active }) => (
                                          <div
                                            className={classNames(
                                              "cursor-pointer flex justify-between px-4 py-2 text-sm"
                                            )}
                                          >
                                            <button
                                              onClick={() =>
                                                handleDelete(job._id)
                                              }
                                              type="button"
                                              className="inline-flex w-full items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-500 hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-rose-500"
                                            >
                                              <TrashIcon
                                                className="-ml-1 mr-2 h-5 w-5"
                                                aria-hidden="true"
                                              />
                                              Delete
                                            </button>
                                          </div>
                                        )}
                                      </Menu.Item>
                                    </div>
                                  </Menu.Items>
                                </Transition>
                              </Menu>
                            </div>
                          </div>
                          <div className="mt-2 sm:flex sm:justify-between">
                            <div className="sm:flex">
                              <div className="flex items-center text-sm text-gray-500">
                                <CalendarIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <p>
                                  Closing on{" "}
                                  <time dateTime={job.closed}>
                                    {job.closed}
                                  </time>
                                </p>
                              </div>
                              <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                <LocationMarkerIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                {job.location}
                              </p>
                            </div>
                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0"></div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="ml-6 text-gray-600 mt-10">No jobs found</span>
              )}
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
