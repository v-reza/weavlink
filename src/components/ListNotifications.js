/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useHeader from "@/hooks/useHeader";
import useNotif from "@/hooks/useNotif";
import useSocket from "@/hooks/useSocket";
import useUser from "@/hooks/useUser";
import { axiosDelete } from "@/utils/axiosInstance";
import classNames from "@/utils/classNames";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { format } from "timeago.js";

const ListNotifications = ({ person, setRefreshNotifications, onlineUsers }) => {
  const [isOnline, setIsOnline] = useState(false);
  const { selector } = useGlobal();
  const router = useRouter();
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch: dispatchNotif } = useNotif();

  /* check is Online users */
  useEffect(() => {
    const checkIsOnline = onlineUsers?.find(
      (online) => online.userId === person.users?._id
    );
    setIsOnline(checkIsOnline ? true : false);
  }, [person.users?._id, onlineUsers]);

  const handleDelete = async () => {
    try {
      await axiosDelete(`/notifications/${person._id}`, headers).then(() => {
        setRefreshNotifications(true);
      });
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  };

  return (
    <li key={person._id}>
      <div className="relative group py-6 px-5 flex items-center">
        <a className="-m-1 flex-1 block p-1">
          <div className="absolute inset-0" aria-hidden="true" />
          <div className="flex-1 flex items-center min-w-0 relative">
            <span className="flex-shrink-0 inline-block relative">
              <img
                className="h-10 w-10 rounded-full"
                src={person.users?.profilePicture || "/avatar.png"}
                alt=""
              />
              <span
                className={classNames(
                  isOnline ? "bg-green-400" : "bg-gray-300",
                  "absolute top-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white"
                )}
                aria-hidden="true"
              />
            </span>
            <div className="ml-4 truncate">
              <p className="text-sm font-medium text-slate-300 truncate">
                {person.users?.firstname + " " + person.users?.lastname}
              </p>
              <p className="text-sm text-slate-500 truncate">
                {person.text} {format(person.createdAt)}
              </p>
            </div>
          </div>
        </a>
        <Menu
          as="div"
          className="ml-2 flex-shrink-0 relative inline-block text-left"
        >
          <Menu.Button className="group relative w-8 h-8 bg-transparent rounded-full inline-flex items-center justify-center">
            <span className="sr-only">Open options menu</span>
            <span className="flex items-center justify-center h-full w-full rounded-full">
              <DotsVerticalIcon
                className="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </span>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute z-10 top-0 right-9 w-48 rounded-md shadow-lg bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() =>
                        router.push(`/profile/${person.users.username}`)
                      }
                      className={classNames(
                        active
                          ? "bg-slate-800/50 text-slate-400"
                          : "text-slate-300",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      View profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => handleDelete()}
                      className={classNames(
                        active
                          ? "bg-slate-800/50 text-slate-400"
                          : "text-slate-300",
                        "block px-4 py-2 text-sm cursor-pointer"
                      )}
                    >
                      Delete
                    </div>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </li>
  );
};

export default ListNotifications;
