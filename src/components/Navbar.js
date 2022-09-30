/* eslint-disable @next/next/no-img-element */
import React, { useContext, useEffect } from "react";
import { Fragment, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  BellIcon,
  MenuIcon,
  XIcon,
  OfficeBuildingIcon,
  UserGroupIcon,
} from "@heroicons/react/outline";
import useAuth from "@/hooks/useAuth";
import Notification from "@/uiComponents/Notification";
import useHeader from "@/hooks/useHeader";
import { axiosGet } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import useUser from "@/hooks/useUser";
import SearchModal from "./SearchModal";
import RememberLogout from "./RememberLogout";
import useNotif from "@/hooks/useNotif";
import axios from "axios";
import useGlobal from "@/hooks/useGlobal";
import classNames from "@/utils/classNames";
import { useCookies } from "react-cookie";
import SlideNotifications from "./SlideNotifications";
import useSocket from "@/hooks/useSocket";
import {
  UsersIcon,
  HomeIcon,
  BriefcaseIcon,
  ChatIcon,
} from "@heroicons/react/solid";
import Link from "next/link";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [isSSR, setIsSSR] = useState(false);
  const [isNewNotifications, setIsNewNotifications] = useState(false);
  const [socketId, setSocketId] = useState(null);
  /* Hooks */
  const [cookie, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const { token, dispatch, isAuthenticated } = useAuth();
  const headers = useHeader(token);
  const { user } = useUser();
  const { dispatch: dispatchNotif } = useNotif();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { socket } = useSocket();

  /* End Hooks */

  useEffect(() => {
    setIsSSR(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    let onMounted = false;
    if (isAuthenticated && !onMounted) {
      try {
        const getIpAddress = async () => {
          const res = await axios.get("https://geolocation-db.com/json/");
          dispatchGlobal({
            type: "GLOBAL_STATE",
            payload: {
              ...selector,
              ipAddress: res.data.IPv4,
            },
          });
        };
        getIpAddress();
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    }
    return () => {
      onMounted = true;
    };
  }, [isAuthenticated]);

  useEffect(() => {
    socket?.on("isNewNotifications", (data) => {
      if (openNotifications) {
        setIsNewNotifications(false);
      } else {
        setIsNewNotifications(data.isNew);
      }
    });

    socket?.on("getUsers", (data) => {
      const thisUser = data.find((u) => u.userId === user?._id);
      setSocketId(thisUser?.socketId);
    });
  }, [openNotifications, socket, user?._id]);

  const username = user?.firstname + user?.lastname + "-" + user?._id;

  const navigation = [
    {
      name: "Home",
      href: "/",
      current: router.pathname === "/" ? true : false,
      notif: true,
      icon: HomeIcon,
    },
    {
      name: "My Network",
      href: "/",
      current: false,
      icon: UsersIcon,
    },
    {
      name: "Jobs",
      href: "/job",
      current: router.pathname === "/job" ? true : false,
      icon: BriefcaseIcon,
      // notif: true,
    },
    { name: "Messaging", href: "/messaging", current: false, icon: ChatIcon },
  ];
  const userNavigation = [
    {
      name: "My Profile",
      href: "#",
      onclick: () =>
        router.push(
          "/profile/" + username.replace(" ", "-").toLowerCase(),
          null,
          { shallow: true }
        ),
    },
    {
      name: "My Company",
      href: "#",
      onclick: () => router.push("/my-company", null, { shallow: true }),
    },
    {
      name: "Settings",
      href: "#",
      onclick: () => router.push("/settings", null, { shallow: true }),
    },
  ];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const keydownCtrlK = (e) => {
    if (e.keyCode === 81 && e.ctrlKey) {
      setOpen(true);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownCtrlK);

    return () => {
      document.removeEventListener("keydown", keydownCtrlK);
    };
  }, [keydownCtrlK]);

  const navigationIcon = (icon) => {
    if (icon === "Home") {
      return <HomeIcon className="w-5 h-5" />;
    } else if (icon === "My Network") {
      return <UsersIcon className="w-5 h-5" />;
    } else if (icon === "Jobs") {
      return <BriefcaseIcon className="w-5 h-5" />;
    } else if (icon === "Messaging") {
      return <ChatIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="sticky top-0 z-40">
      {isSSR ? (
        <>
          <Disclosure as="nav" className="bg-slate-900/75">
            {({ open }) => (
              <>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="relative h-16 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          onClick={() =>
                            router.push("/", null, { shallow: true })
                          }
                          className="rounded-lg bg-amber-400 hover:bg-amber-500 cursor-pointer h-10 w-auto"
                          src="/weavlink-logo.png"
                          alt="Workflow"
                        />
                      </div>

                      {/* Links section */}
                      <div className="hidden lg:block lg:ml-10">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <Link key={item.name} href={item.href}>
                              <div
                                key={item.name}
                                // onClick={() =>
                                //   router.push(item.href, null, { shallow: true })
                                // }
                                className={classNames(
                                  item.current
                                    ? "border-b border-amber-500 text-white"
                                    : "hover:text-slate-300 rounded-md",
                                  "cursor-pointer px-3 py-3 text-sm font-medium text-white inline-flex relative"
                                )}
                                aria-current={item.current ? "page" : undefined}
                              >
                                <div className="flex items-center flex-col">
                                  {navigationIcon(item.name)}
                                  <span>{item.name}</span>
                                  {item.notif && (
                                    <>
                                      <span className="absolute inline-flex  right-0 rounded-full h-3 w-3 bg-rose-500"></span>
                                      <span className="animate-ping absolute right-0 inline-flex rounded-full bg-rose-400 opacity-75 h-3 w-3"></span>
                                    </>
                                  )}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 px-2 flex justify-center lg:ml-6 lg:justify-end">
                      {/* Search section */}
                      <div className="max-w-lg w-full lg:max-w-xs">
                        <button
                          onClick={() => setOpen(true)}
                          type="button"
                          className="hidden w-full lg:flex items-center text-sm leading-6 text-slate-400 rounded-md ring-1 ring-slate-900/10 shadow-sm py-1.5 pl-2 pr-3 hover:ring-slate-300 bg-slate-800 highlight-white/5 hover:bg-slate-700"
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
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                            <circle
                              cx="11"
                              cy="11"
                              r="6"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></circle>
                          </svg>
                          Quick search...
                          <span className="ml-auto pl-3 flex-none text-xs font-semibold">
                            Ctrl + Q
                          </span>
                        </button>
                        <label htmlFor="search" className="sr-only">
                          Search
                        </label>
                      </div>
                    </div>
                    <div className="flex lg:hidden">
                      {/* Mobile menu button */}
                      <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="ml-auto mr-4 inline-flex items-center justify-center hover:text-slate-600 lg:hidden text-slate-400 hover:text-slate-300"
                      >
                        <span className="sr-only">Search</span>
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="m19 19-3.5-3.5"></path>
                          <circle cx="11" cy="11" r="6"></circle>
                        </svg>
                      </button>
                      <Disclosure.Button className="bg-slate-900 p-2 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <MenuIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>

                    {/* Actions section */}
                    <div className="hidden lg:block lg:ml-4">
                      <div className="flex items-center">
                        <button
                          onClick={() => {
                            setOpenNotifications(true);
                            socket?.emit("openNotifications", {
                              senderId: user?._id,
                            });
                          }}
                          type="button"
                          className="bg-slate-900 flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">View notifications</span>
                          <BellIcon
                            className={classNames(
                              isNewNotifications
                                ? "text-rose-500 opacity-75 animate-pulse"
                                : "",
                              "h-6 w-6 "
                            )}
                            aria-hidden="true"
                          />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="ml-3 relative flex-shrink-0">
                          <div>
                            <Menu.Button className="bg-slate-900 rounded-full flex text-sm text-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="rounded-full h-8 w-8"
                                src={
                                  user?.profilePicture
                                    ? user.profilePicture
                                    : "/avatar.png"
                                }
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
                            <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-slate-800 ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <span className="block py-2 px-4 text-sm font-medium text-slate-300">
                                Account
                              </span>
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    className={classNames(
                                      active ? "bg-slate-700" : "",
                                      "cursor-pointer block py-1 px-4 text-sm text-amber-500"
                                    )}
                                  >
                                    Try Premium for free
                                  </div>
                                )}
                              </Menu.Item>

                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <div
                                      onClick={item.onclick}
                                      className={classNames(
                                        active ? "bg-slate-700" : "",
                                        "cursor-pointer block py-1 px-4 text-sm text-slate-400"
                                      )}
                                    >
                                      {item.name}
                                    </div>
                                  )}
                                </Menu.Item>
                              ))}

                              <span className="block py-2 px-4 text-sm font-medium text-slate-300">
                                Manage
                              </span>
                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={() =>
                                      router.push(
                                        "/my-items/posted-jobs",
                                        null,
                                        { shallow: true }
                                      )
                                    }
                                    className={classNames(
                                      active ? "bg-slate-700" : "",
                                      "cursor-pointer block py-1 px-4 text-sm text-slate-400"
                                    )}
                                  >
                                    Job Posting Account
                                  </div>
                                )}
                              </Menu.Item>

                              <div className="mt-2 relative">
                                <div
                                  className="absolute inset-0 flex items-center"
                                  aria-hidden="true"
                                >
                                  <div className="w-full border-t border-slate-600" />
                                </div>
                              </div>

                              <Menu.Item>
                                {({ active }) => (
                                  <div
                                    onClick={() => {
                                      cookie?.remembertoken?.filter(
                                        (item) =>
                                          item.id === user?._id &&
                                          item.ipAddress === selector?.ipAddress
                                      ).length > 0
                                        ? dispatch({ type: "LOGOUT" }) &&
                                          router.push("/") &&
                                          socket?.emit("removeUsers", {
                                            socketId: socketId,
                                          })
                                        : setOpenLogout(true);
                                    }}
                                    className={classNames(
                                      active ? "bg-slate-700" : "",
                                      "cursor-pointer block py-2 px-4 text-sm text-slate-400"
                                    )}
                                  >
                                    Logout
                                  </div>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="bg-slate-900/95 border-b border-gray-200 lg:hidden">
                  <div className="px-2 pt-2 pb-3 space-y-1">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        onClick={() =>
                          router.push(item.href, null, { shallow: true })
                        }
                        className={classNames(
                          item.current
                            ? "bg-slate-500 text-white"
                            : "hover:bg-slate-500",
                          "block px-3 py-2 rounded-md font-medium text-white"
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
                          src={
                            user?.profilePicture || "/assets/profile-image.jpg"
                          }
                          referrerPolicy="no-referrer"
                          alt=""
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-white">
                          {user?.firstname} {user?.lastname}
                        </div>
                        <div className="text-sm font-medium text-slate-300">
                          {user?.email}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setOpenNotifications(true);
                          socket?.emit("openNotifications", {
                            senderId: user?._id,
                          });
                        }}
                        className="ml-auto bg-slate-900  flex-shrink-0 rounded-full p-1 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">View notifications</span>
                        <BellIcon
                          className={classNames(
                            selector?.isNewNotifications
                              ? "text-rose-500 opacity-75 animate-pulse"
                              : "",
                            "h-6 w-6 "
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                    <div className="mt-3 px-2 space-y-1">
                      <Disclosure.Button
                        as="a"
                        className="block rounded-md py-2 px-3 text-base font-medium text-amber-500 hover:bg-gray-100 "
                      >
                        Try Premium for free
                      </Disclosure.Button>
                      {userNavigation.map((item) => (
                        <Disclosure.Button
                          key={item.name}
                          as="a"
                          href={item.href}
                          onClick={item.onclick}
                          className="block rounded-md py-2 px-3 text-base font-medium hover:bg-gray-100 text-white "
                        >
                          {item.name}
                        </Disclosure.Button>
                      ))}
                      <Disclosure.Button
                        onClick={() =>
                          router.push("/my-items/posted-jobs", null, {
                            shallow: true,
                          })
                        }
                        as="a"
                        className="block rounded-md py-2 px-3 text-base font-medium hover:bg-gray-100 text-white "
                      >
                        Job Posting Account
                      </Disclosure.Button>
                      <Disclosure.Button
                        onClick={() => setOpenLogout(true)}
                        as="a"
                        className="block rounded-md py-2 px-3 text-base font-medium hover:bg-gray-100 text-white "
                      >
                        Logout
                      </Disclosure.Button>
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
          <SlideNotifications
            open={openNotifications}
            setOpen={setOpenNotifications}
          />
        </>
      ) : null}
      <SearchModal open={open} setOpen={setOpen} />
      <RememberLogout open={openLogout} setOpen={setOpenLogout} />
    </div>
  );
};

export default Navbar;
