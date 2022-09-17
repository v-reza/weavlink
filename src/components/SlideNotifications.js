/* eslint-disable @next/next/no-img-element */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import classNames from "@/utils/classNames";
import useGlobal from "@/hooks/useGlobal";
import useUser from "@/hooks/useUser";
import useAuth from "@/hooks/useAuth";
import useHeader from "@/hooks/useHeader";
import { axiosGet } from "@/utils/axiosInstance";
import { format } from "timeago.js";
import ListNotifications from "./ListNotifications";

const team = [
  {
    name: "Leslie Alexander",
    handle: "lesliealexander",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    status: "online",
  },
];

export default function SlideNotifications({ open, setOpen }) {
  const [notifications, setNotifications] = useState([]);
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { user } = useUser();
  const { token } = useAuth();
  const headers = useHeader(token);
  const [refreshNotifications, setRefreshNotifications] = useState(false);
  useEffect(() => {
    const getNotifications = async () => {
      const res = await axiosGet("/notifications", headers);
      setNotifications(res.data);
    };
    getNotifications();
    if (refreshNotifications) {
      setRefreshNotifications(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, refreshNotifications]);
  useEffect(() => {
    selector?.notifications?.receiverId === user?._id &&
      setRefreshNotifications(true);
  }, [selector?.notifications?.receiverId, user?._id]);
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-slate-800 shadow-xl overflow-y-scroll">
                  <div className="p-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-medium text-white">
                        Notification
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="bg-transparent rounded-md text-gray-400 hover:text-gray-500"
                          onClick={() => setOpen(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <ul
                    role="list"
                    className="flex-1 divide-y divide-slate-700 overflow-y-auto"
                  >
                    {notifications.length > 0 ?notifications.map((person) => (
                      <ListNotifications person={person} key={person._id} setRefreshNotifications={setRefreshNotifications} />
                    )): (
                      <div className="flex items-center justify-center">
                        <p className="text-white">No notifications</p>
                      </div>
                    )}
                  </ul>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
