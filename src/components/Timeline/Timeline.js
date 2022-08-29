/* eslint-disable @next/next/no-img-element */
import useNotif from "@/hooks/useNotif";
import { axiosGet, axiosPut } from "@/utils/axiosInstance";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatAltIcon,
  DotsVerticalIcon,
  ShareIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import React, { useEffect, useState, Fragment } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ReactCarousel } from "react-responsive-carousel";
import { format } from "date-fns";
import useUser from "@/hooks/useUser";
import useFolder from "@/hooks/useFolder";
import classNames from "@/utils/classNames";
import useAuth from "@/hooks/useAuth";
import useHeader from "@/hooks/useHeader";
import { useRouter } from "next/router";
import {
  SkeletonDescription,
  SkeletonImage,
  SkeletonProfile,
  SkeletonText,
} from "@/uiComponents/Skeleton";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDoubleTap } from "use-double-tap";

const Timeline = ({ post }) => {
  /* Hooks */
  const { dispatch: dispatchNotif } = useNotif();
  const { token } = useAuth();
  const { user: currentUser } = useUser();
  const headers = useHeader(token);
  const folder = useFolder();
  /* End Hooks */
  /* State */
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const [loadingSSR, setLoadingSSR] = useState(true);
  const [likesDoubleTap, setLikesDoubleTap] = useState(false);
  const [isLikes, setIsLikes] = useState(false);
  /* End State */

  /* useEffect */
  useEffect(() => {
    const getPostUser = async () => {
      try {
        const res = await axiosGet(`/users/${post.userId}`);
        setUser(res.data);
        setLoadingSSR(false);
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    };
    getPostUser();
    setIsLiked(post.likes.includes(currentUser?._id));
  }, [post.userId, currentUser?._id, post.likes]);

  /* End useEffect */

  /* Action */
  const handleLike = async (e, postId) => {
    e.preventDefault();
    try {
      await axiosPut(`/posts/${postId}/like`, null, headers);
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  };

  const bind = useDoubleTap(async (event) => {
    try {
      setLikesDoubleTap(true);
      setTimeout(() => {
        setLikesDoubleTap(false);
      }, 500);
      const res = await axiosPut(`/posts/${post._id}/like`, null, headers);
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
      setIsLikes(res.data.message === "liked" ? false : true)  
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  });

  /* End Action */

  const username = user.username
    ? user.username
    : user.firstname + user.lastname + "-" + user._id;

  return (
    <>
      {!loadingSSR ? (
        <article aria-labelledby={"question-title-" + post._id}>
          <div>
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                <img
                  onClick={() =>
                    router.push(
                      "/profile/" + username.replace(" ", "-").toLowerCase()
                    )
                  }
                  className="cursor-pointer h-10 w-10 rounded-full"
                  src={
                    user.profilePicture ? user.profilePicture : "/avatar.png"
                  }
                  referrerPolicy="no-referrer"
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  <span
                    onClick={() =>
                      router.push(
                        "/profile/" + username.replace(" ", "-").toLowerCase()
                      )
                    }
                    className="cursor-pointer hover:underline text-slate-300"
                  >
                    {user.firstname && user.firstname + " " + user.lastname}
                  </span>
                </p>
                <p className="text-sm text-slate-400">
                  <span className="cursor-pointer hover:underline">
                    <time dateTime={post.createdAt}>
                      {format(
                        new Date(post.createdAt),
                        "MMM d, yyyy, kk:mm:ss"
                      )}
                    </time>
                  </span>
                </p>
              </div>
              <div className="flex-shrink-0 self-center flex">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                      <span className="sr-only">Open options</span>
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
                    <Menu.Items className="z-40 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {currentUser?._id === user._id && (
                          <Menu.Item>
                            {({ active }) => (
                              <div
                                onClick={() => handleDeletePost(post._id)}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "cursor-pointer flex px-4 py-2 text-sm"
                                )}
                              >
                                <TrashIcon
                                  className="mr-3 h-5 w-5 text-red-400"
                                  aria-hidden="true"
                                />
                                <span className="text-red-500">
                                  Delete Post
                                </span>
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
          </div>
          {/* Carousel */}
          {post.images?.length > 0 && (
            <div className="flex flex-col justify-center items-center mt-4 gallery-carousel">
              <ReactCarousel
                showThumbs={false}
                showStatus={false}
                dynamicHeight={true}
              >
                {post.images?.map((img, index) => (
                  <div key={index} {...bind} className="relative select-none">
                    <div
                      className={`${
                        likesDoubleTap ? "opacity-100" : "opacity-0"
                      } transition-all duration-700 absolute z-10 flex text-center w-full h-full items-center justify-center mx-auto text-white`}
                    >
                      {!isLikes ? (
                        <ThumbUpIcon
                          className="h-14 w-14 text-indigo-500"
                          aria-hidden="true"
                        />
                      ) : (
                        <ThumbDownIcon
                          className="h-14 w-14 text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                    <LazyLoadImage
                      alt="Images"
                      effect="blur"
                      src={folder + img}
                    />
                  </div>
                ))}
              </ReactCarousel>
            </div>
          )}
          <div
            className="mt-4 text-sm text-base space-y-4 text-slate-400"
            dangerouslySetInnerHTML={{ __html: `<p>${post.desc}</p>` }}
          />
          <div className="mt-6 flex justify-between space-x-8">
            <div className="flex space-x-6">
              <span className="inline-flex items-center text-sm">
                <button
                  onClick={(e) => handleLike(e, post._id)}
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <ThumbUpIcon
                    className={classNames(
                      isLiked ? "text-indigo-500" : "text-gray-400",
                      "h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-slate-400">{likes}</span>
                  <span className="sr-only">likes</span>
                </button>
              </span>
              <span className="inline-flex items-center text-sm">
                <button
                  onClick={() => {
                    !hiddenComments.includes(post._id)
                      ? setHiddenComments([...hiddenComments, post._id])
                      : setHiddenComments([
                          ...hiddenComments.filter((id) => id !== post._id),
                        ]);
                  }}
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <ChatAltIcon
                    className={classNames(
                      post.comments.some(
                        (comment) => comment.userId === currentUser._id
                      )
                        ? "text-indigo-500"
                        : "text-gray-400",
                      "h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-slate-400">
                    {post.comments.length}
                  </span>
                  <span className="sr-only">replies</span>
                </button>
              </span>
            </div>
            <div className="flex text-sm">
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <ShareIcon className="h-5 w-5" aria-hidden="true" />
                  <span className="font-medium text-slate-400">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
      ) : (
        <>
          <div className="flex items-center space-x-2">
            <SkeletonProfile />
            <div className="mt-4">
              <SkeletonText />
              <SkeletonText />
            </div>
          </div>
          <SkeletonImage />
          <div className="mt-2">
            <SkeletonDescription />
          </div>
        </>
      )}
    </>
  );
};

export default Timeline;
