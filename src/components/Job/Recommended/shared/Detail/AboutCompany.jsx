/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  CodeIcon,
  DotsVerticalIcon,
  FlagIcon,
  StarIcon,
} from "@heroicons/react/solid";
import useFolder from "../../../../../hooks/useFolder";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function AboutCompany({ jobs }) {
  const folder = useFolder();
  return (
    <div className="bg-white px-4 py-5 sm:px-6 mt-2 dark:bg-transparent rounded-md border dark:border-slate-600">
      <h2 className="dark:text-white font-md text-md">About the Company</h2>
      <div className="flex space-x-3 mt-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={
              jobs?.company?.companyLogo
                ? jobs.company.companyLogo
                : folder + "/noCompany.png"
            }
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-900">
            <span className="dark:text-white hover:underline hover:cursor-pointer">
              {jobs?.company?.companyName}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            <span className="dark:text-slate-400">
              {jobs?.company?.companyFollowers?.length} Followers
            </span>
          </p>
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
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <StarIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Add to favorites</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <CodeIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Embed</span>
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "flex px-4 py-2 text-sm"
                        )}
                      >
                        <FlagIcon
                          className="mr-3 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Report content</span>
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <div className="mt-2">
        <span className="text-sm font-sm dark:text-slate-300">
          {jobs?.company?.companyAddress} •{" "}
          {jobs?.company?.companyMembers?.length} Employees
        </span>
      </div>
      <div className="mt-3">
        <p className="text-base dark:text-slate-200">{jobs?.company?.companyDescription}</p>
      </div>
    </div>
  );
}
