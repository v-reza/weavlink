/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeIcon,
  DotsVerticalIcon,
  FlagIcon,
  StarIcon,
  BriefcaseIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import useFolder from "../../../../hooks/useFolder";
import { format } from "timeago.js";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListPostedJobs({ job }) {
  const folder = useFolder();
  const navigate = useNavigate()
  return (
    <div className="bg-white py-5 mt-4 dark:bg-transparent">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={folder + "/noCompany.png"}
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900" onClick={() => navigate(`/hiring/jobs/${job._id}/detail`)}>
            <span className="dark:text-white hover:underline hover:cursor-pointer">
              {job.company.companyName}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            <span className="dark:text-slate-400">{job.title}</span>
          </p>
          <p className="text-sm text-gray-500">
            <span className="dark:text-slate-400">{job.location}</span>
          </p>
          <div className="text-sm text-gray-500">
            <span className="text-blue-400">
              {job.isActive ? "Published" : "Draft"}
            </span>
            <span className="dark:text-slate-400">
              {" "}
              • Created {format(job.createdAt)}
            </span>
          </div>
        </div>
        <div className="flex-shrink-0 self-center flex">
          <Menu as="div" className="relative z-30 inline-block text-left">
            <div>
              <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                <span className="sr-only">Open options</span>
                <DotsVerticalIcon className="h-5 w-5" aria-hidden="true" />
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-300"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <BriefcaseIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span className="dark:text-slate-400">Manage Job</span>
                      </a>
                    )}
                  </Menu.Item>
                  {!job.isActive && (
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active
                              ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-300"
                              : "text-gray-700",
                            "flex px-4 py-2 text-sm"
                          )}
                        >
                          <TrashIcon
                            className="mr-3 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <span className="dark:text-slate-400">Delete Draft</span>
                        </a>
                      )}
                    </Menu.Item>
                  )}
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="mt-2">
        {/* <span className="text-sm font-sm dark:text-slate-300">
          {jobs?.company?.companyAddress} •{" "}
          {jobs?.company?.companyMembers?.length} Employees
        </span> */}
      </div>
      <div className="mt-3">
        {/* <p className="text-base dark:text-slate-200">
          {jobs?.company?.companyDescription}
        </p> */}
      </div>
    </div>
  );
}
