/* eslint-disable jsx-a11y/no-redundant-roles */
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { Fragment } from "react";
import {
  BookmarkIcon,
  BellIcon,
  CashIcon,
  ClipboardCheckIcon,
} from "@heroicons/react/outline";

const navigation = [
  { name: "Job alerts", href: "#", icon: BellIcon },
  { name: "Salary", href: "#", icon: CashIcon },
  { name: "Skills Test", href: "#", icon: ClipboardCheckIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MobileSidebar = () => {
  return (
    <div className="block lg:hidden mt-6">
      <div className="sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          <section aria-labelledby="who-to-follow-heading">
            <div className="bg-white rounded-lg shadow dark:bg-slate-800">
              <div className="p-6">
                <div className="flex items-center justify-between text-sm font-medium rounded-md dark:text-white">
                  <div className="flex items-center">
                    <BookmarkIcon className="flex-shrink-0 -ml-1 mr-3 h-6 w-6 dark:text-white" />
                    <span className="truncate">My Jobs</span>
                  </div>
                  <div className="flex items-center">
                    <Menu as="div" className="relative inline-block text-left">
                      <div>
                        <Menu.Button className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white dark:bg-slate-700 dark:text-white dark:border-0 dark:focus:ring-0 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                          More
                          <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5"
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
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
                          <div className="py-1">
                            {navigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active
                                        ? "bg-gray-100 text-gray-900"
                                        : "text-gray-700",
                                      "cursor-pointer group flex items-center px-4 py-2 text-sm dark:text-white"
                                    )}
                                  >
                                    <item.icon
                                      className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                      aria-hidden="true"
                                    />
                                    {item.name}
                                  </div>
                                )}
                              </Menu.Item>
                            ))}
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ul>
      </div>
    </div>
  );
};

export default MobileSidebar;
