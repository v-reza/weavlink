import React, { useContext } from "react";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { SearchIcon } from "@heroicons/react/solid";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import useAuth from "../../hooks/useAuth";
import Notification from "../custom/Notifications/Notification";
import { FaSun, FaMoon } from "react-icons/fa";
import { ThemeContext } from "../../Theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import { UsersIcon } from "@heroicons/react/outline";
import { Combobox, Dialog } from "@headlessui/react";

const people = [
  { id: 1, name: "Leslie Alexander", url: "#" },
  // More people...
];

// const user = {
//   name: "Whitney Francis",
//   email: "whitneyfrancis@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
// };
const navigation = [
  { name: "Home", href: "/", current: true },
  { name: "Jobs", href: "#", current: false },
  { name: "Applicants", href: "#", current: false },
  { name: "Company", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Navbar = () => {
  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const { user } = useAuth();

  const { theme, setTheme } = useContext(ThemeContext);
  const username = user.firstname + user.lastname + "-" + user._id;

  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(true);

  const filteredPeople =
    query === ""
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

  const userNavigation = [
    {
      name: "Your Profile",
      href: "#",
      onclick: () =>
        navigate("/profile/" + username.replace(" ", "-").toLowerCase()),
    },
    { name: "Settings", href: "#", onclick: () => navigate("/settings") },
    {
      name: "Sign out",
      href: "#",
      onclick: () => dispatch({ type: "LOGOUT" }),
    },
  ];
  return (
    <div className="sticky top-0 z-50">
      <Notification />
      <Disclosure as="nav" className="bg-gray-50 dark:bg-slate-900/75">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative h-16 flex items-center justify-between border-b border-gray-200">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=rose&shade=500"
                      alt="Workflow"
                    />
                  </div>

                  {/* Links section */}
                  <div className="hidden lg:block lg:ml-10">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <div
                          key={item.name}
                          onClick={() => navigate(item.href)}
                          className={classNames(
                            item.current
                              ? "bg-gray-100 dark:bg-slate-500"
                              : "hover:text-gray-700",
                            "cursor-pointer px-3 py-2 rounded-md text-sm font-medium text-gray-900 dark:text-white"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                  {/* Search section */}
                  <div className="max-w-lg w-full lg:max-w-xs">
                    <button
                      type="button"
                      className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 dark:bg-slate-800 dark:highlight-white/5 dark:hover:bg-slate-700"
                    >
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        aria-hidden="true"
                        className="mr-3 flex-none"
                      >
                        <path
                          d="m19 19-3.5-3.5"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                        <circle
                          cx="11"
                          cy="11"
                          r="6"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></circle>
                      </svg>
                      Quick search...
                      <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                        Ctrl K
                      </span>
                    </button>
                    <label htmlFor="search" className="sr-only">
                      Search
                    </label>
                    {/* <div className="relative text-gray-400 focus-within:text-gray-500"> */}
                    {/* <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        <SearchIcon className="h-5 w-5" aria-hidden="true" />
                      </div> */}
                    {/* <input
                        id="search"
                        className="cursor-pointer block w-full bg-white py-2 pl-10 pr-3 border border-gray-300 rounded-md leading-5 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-rose-500 focus:border-rose-500 focus:placeholder-gray-500 sm:text-sm"
                        placeholder="Search"
                        type="search"
                        name="search"
                      /> */}
                    {/* <Combobox
                        as="div"
                        className="transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
                        onChange={(person) => (window.location = person.url)}
                      >
                        {filteredPeople.length > 0 && (
                          <Combobox.Options
                            static
                            className="scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                          >
                            {filteredPeople.map((person) => (
                              <Combobox.Option
                                key={person.id}
                                value={person}
                                className={({ active }) =>
                                  classNames(
                                    "cursor-default select-none px-4 py-2",
                                    active && "bg-indigo-600 text-white"
                                  )
                                }
                              >
                                {person.name}
                              </Combobox.Option>
                            ))}
                          </Combobox.Options>
                        )}

                        {query !== "" && filteredPeople.length === 0 && (
                          <p className="p-4 text-sm text-gray-500">
                            No people found.
                          </p>
                        )}
                      </Combobox> */}
                    {/* </div> */}
                  </div>
                </div>
                <div className="flex lg:hidden">
                  {/* Mobile menu button */}
                  <button
                    type="button"
                    class="ml-auto text-slate-500 inline-flex items-center justify-center hover:text-slate-600 lg:hidden dark:text-slate-400 dark:hover:text-slate-300"
                  >
                    <span class="sr-only">Search</span>
                    <svg
                      width="24"
                      height="24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m19 19-3.5-3.5"></path>
                      <circle cx="11" cy="11" r="6"></circle>
                    </svg>
                  </button>
                  <Disclosure.Button className="bg-gray-50 dark:bg-slate-900 p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-rose-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                {/* Actions section */}
                <div className="hidden lg:block lg:ml-4">
                  <div className="flex items-center">
                    <button
                      type="button"
                      className="mr-2 bg-gray-50 dark:bg-slate-900 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-rose-500"
                    >
                      <span className="sr-only">Theme Mode</span>
                      {theme === "dark" ? (
                        <FaSun
                          className="h-6 w-6"
                          aria-hidden="true"
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                        />
                      ) : (
                        <FaMoon
                          className="h-6 w-6"
                          aria-hidden="true"
                          onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                          }
                        />
                      )}
                    </button>
                    <button
                      type="button"
                      className="bg-gray-50 dark:bg-slate-900 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-rose-500"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-3 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-gray-50 dark:bg-slate-900 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-rose-500">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="rounded-full h-8 w-8"
                            src={user.profilePicture}
                            referrerPolicy="no-referrer"
                            alt=""
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
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <div
                                  onClick={item.onclick}
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "cursor-pointer block py-2 px-4 text-sm text-gray-700"
                                  )}
                                >
                                  {item.name}
                                </div>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="bg-gray-50 dark:bg-slate-900/95 border-b border-gray-200 lg:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current ? "bg-gray-100 dark:bg-slate-500 dark:text-white" : "hover:bg-gray-100 dark:hover:bg-slate-500",
                      "block px-3 py-2 rounded-md font-medium text-gray-900 dark:text-white"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="px-5 flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="rounded-full h-10 w-10"
                      src={user.profilePicture}
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800 dark:text-white">
                      {user.firstname} {user.lastname}
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-slate-300">
                      {user.email}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="mr-auto bg-gray-50 dark:bg-slate-900 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-rose-500"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    className="ml-auto bg-gray-50 dark:bg-slate-900 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-rose-500"
                  >
                    <span className="sr-only">Theme Mode</span>
                    {theme === "dark" ? (
                      <FaSun
                        className="h-6 w-6"
                        aria-hidden="true"
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      />
                    ) : (
                      <FaMoon
                        className="h-6 w-6"
                        aria-hidden="true"
                        onClick={() =>
                          setTheme(theme === "dark" ? "light" : "dark")
                        }
                      />
                    )}
                  </button>
                </div>
                <div className="mt-3 px-2 space-y-1">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      onClick={item.onclick}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-900 hover:bg-gray-100 dark:text-white "
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Navbar;
