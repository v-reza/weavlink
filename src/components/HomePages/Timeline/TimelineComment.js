/* eslint-disable @next/next/no-img-element */
import React, { Fragment, useEffect, useState } from "react";
import { format as formatTime } from "timeago.js";
import { useRouter } from "next/router";
import { axiosDelete, axiosGet } from "@/utils/axiosInstance";
import { SkeletonProfile } from "@/uiComponents/Skeleton";
import {
  DotsHorizontalIcon,
  LinkIcon,
  TrashIcon,
  FlagIcon,
} from "@heroicons/react/outline";
import { HeartIcon, ThumbUpIcon, EmojiHappyIcon } from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import classNames from "@/utils/classNames";
import useUser from "@/hooks/useUser";
import useNotif from "@/hooks/useNotif";
import useAuth from "@/hooks/useAuth";
import useLoading from "@/hooks/useLoading";
import useHeader from "@/hooks/useHeader";
import useGlobal from "@/hooks/useGlobal";
const TimelineComment = ({ post, comment }) => {
  /* State */
  const [user, setUser] = useState(null);
  const [openLike, setOpenLike] = useState(false);
  /* End State */

  /* Hooks */
  const { user: currentUser } = useUser();
  const router = useRouter();
  const { dispatch: dispatchNotif } = useNotif();
  const { token } = useAuth();
  const { dispatch: dispatchLoading } = useLoading();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const headers = useHeader(token);
  /* End Hooks */

  /* useEffect */
  useEffect(() => {
    const getUserComments = async () => {
      try {
        const res = await axiosGet(`/users/${comment?.userId}`);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserComments();
  }, [comment?.userId]);
  /* End useEffect */

  /* Action */
  const handleDeleteComment = async (id) => {
    try {
      dispatchLoading({ type: "PROCESSING" });
      await axiosDelete(`/posts/${post._id}/deleteComment/${id}`, headers).then(
        () => {
          dispatchLoading({ type: "FINISHED" });
          dispatchNotif({
            type: "SUCCESS",
            message: "Comment deleted successfully",
          });
          dispatchGlobal({
            type: "GLOBAL_STATE",
            payload: {
              ...selector,
              refreshTimeline: true,
            },
          });
        }
      );
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  };
  /* End Action */

  const username = user?.firstname + user?.lastname + "-" + user?._id;

  return (
    <>
      <li key={comment._id} className="py-4">
        <div
          className="flex space-x-3 bg-slate-700/50 rounded-md p-2"
          onMouseOver={() => setOpenLike(false)}
        >
          {!user?.profilePicture ? (
            <SkeletonProfile />
          ) : (
            <img
              className="cursor-pointer h-6 w-6 rounded-full mt-2 "
              src={user?.profilePicture}
              onClick={() =>
                router.push(
                  "/profile/" + username.replace(" ", "-").toLowerCase()
                )
              }
              alt=""
              referrerPolicy="no-referrer"
            />
          )}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3
                className="text-sm font-medium cursor-pointer text-white"
                onClick={() =>
                  router.push(
                    "/profile/" + username.replace(" ", "-").toLowerCase()
                  )
                }
              >
                {user?.firstname} {user?.lastname}
              </h3>
              <div className="text-sm text-gray-500">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="bg-transparent rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
                      <DotsHorizontalIcon
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
                    <Menu.Items className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-transparent text-slate-400"
                                  : "text-slate-300",
                                "block px-4 py-2 text-xs font-medium flex items-center"
                              )}
                            >
                              <LinkIcon
                                className="h-5 w-5 mr-4"
                                aria-hidden="true"
                              />
                              Copy link to comment
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-transparent text-slate-400"
                                  : "text-slate-300",
                                "block px-4 py-2 text-xs font-medium flex items-center"
                              )}
                            >
                              <FlagIcon
                                className="h-5 w-5 mr-4"
                                aria-hidden="true"
                              />
                              Report
                            </a>
                          )}
                        </Menu.Item>
                        {currentUser?._id === comment?.userId && (
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => handleDeleteComment(comment._id)}
                                className={classNames(
                                  active
                                    ? "bg-transparent text-slate-400"
                                    : "text-slate-300",
                                  "cursor-pointer block px-4 py-2 text-xs font-medium flex items-center"
                                )}
                              >
                                <TrashIcon
                                  className="h-5 w-5 mr-4"
                                  aria-hidden="true"
                                />
                                Delete
                              </div>
                            )}
                          </Menu.Item>
                        )}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>

            <p className="text-sm text-slate-400/80 break-all">
              {comment.text}
            </p>

            <div className="mt-4">
              <span className="text-xs font-medium text-slate-400 mt-4">
                {formatTime(comment.createdAt)}
              </span>
            </div>
          </div>
        </div>
        <div
          onMouseOver={() => setOpenLike(true)}
          className={classNames(
            openLike ? "block" : "hidden",
            "-mt-10 bg-slate-800 border border-slate-600 px-4 py-2 w-max rounded-md absolute"
          )}
        >
          <div className="flex items-center justify-between space-x-4">
            <ThumbUpIcon
              className="animate-bounce-short cursor-pointer hover:animate-none transition ease-in-out delay-300 hover:-translate-y-2  hover:scale-110 duration-300 h-8 w-8 text-blue-500"
              aria-hidden="true"
            />
            <HeartIcon
              className="animate-bounce-short cursor-pointer hover:animate-none transition ease-in-out delay-300 hover:-translate-y-2  hover:scale-110 duration-300 h-8 w-8 text-rose-500"
              aria-hidden="true"
            />
            <EmojiHappyIcon
              className="animate-bounce-short cursor-pointer hover:animate-none transition ease-in-out delay-300 hover:-translate-y-2  hover:scale-110 duration-300 h-8 w-8 text-sky-300"
              aria-hidden="true"
            />
          </div>
        </div>
        <div
          className="hover:bg-slate-700 px-2 mt-2 w-max rounded-md"
          onMouseOver={() => setOpenLike(true)}
          onMouseLeave={() => setOpenLike(false)}
        >
          <span className="text-xs cursor-pointer pl-2 pr-2 text-left font-medium text-slate-300">
            Like
          </span>
        </div>
      </li>
    </>
  );
};

export default TimelineComment;
