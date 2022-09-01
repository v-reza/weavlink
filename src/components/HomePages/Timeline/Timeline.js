/* eslint-disable @next/next/no-img-element */
import useNotif from "@/hooks/useNotif";
import { axiosDelete, axiosGet, axiosPost, axiosPut } from "@/utils/axiosInstance";
import { Listbox, Menu, Transition } from "@headlessui/react";
import {
  ChatAltIcon,
  DotsVerticalIcon,
  ShareIcon,
  ThumbUpIcon,
  ThumbDownIcon,
  TrashIcon,
} from "@heroicons/react/solid";
import React, {
  useEffect,
  useState,
  Fragment,
  Suspense,
  useCallback,
  useRef,
} from "react";
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
import Card from "@/uiComponents/Card";
import {
  PaperClipIcon,
  PlusSmIcon,
  EmojiHappyIcon,
  FireIcon,
  HeartIcon,
  EmojiSadIcon,
  XIcon,
  QuestionMarkCircleIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import { Button, Tooltip } from "flowbite-react";
import useLoading from "@/hooks/useLoading";
import useGlobal from "@/hooks/useGlobal";
// import Picker from "emoji-picker-react";
const Picker = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});
const TimelineComment = dynamic(() => import("./TimelineComment"), {
  suspense: true,
  ssr: true,
});

const moods = [
  {
    name: "Excited",
    value: "excited",
    icon: FireIcon,
    iconColor: "text-white",
    bgColor: "bg-red-500",
  },
  {
    name: "Loved",
    value: "loved",
    icon: HeartIcon,
    iconColor: "text-white",
    bgColor: "bg-pink-400",
  },
  {
    name: "Happy",
    value: "happy",
    icon: EmojiHappyIcon,
    iconColor: "text-white",
    bgColor: "bg-green-400",
  },
  {
    name: "Sad",
    value: "sad",
    icon: EmojiSadIcon,
    iconColor: "text-white",
    bgColor: "bg-yellow-400",
  },
  {
    name: "Thumbsy",
    value: "thumbsy",
    icon: ThumbUpIcon,
    iconColor: "text-white",
    bgColor: "bg-blue-500",
  },
  {
    name: "I feel nothing",
    value: null,
    icon: XIcon,
    iconColor: "text-gray-400",
    bgColor: "bg-transparent",
  },
];

const Timeline = ({ post }) => {
  /* Hooks */
  const { dispatch: dispatchNotif } = useNotif();
  const { token } = useAuth();
  const { user: currentUser } = useUser();
  const headers = useHeader(token);
  const folder = useFolder();
  const { dispatch: dispatchLoading } = useLoading();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  /* End Hooks */
  /* State */
  const [user, setUser] = useState({});
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const router = useRouter();
  const [loadingSSR, setLoadingSSR] = useState(true);
  const [likesDoubleTap, setLikesDoubleTap] = useState(false);
  const [isLikes, setIsLikes] = useState(false);
  const [emoticon, setEmoticon] = useState(false);

  // Timeline Comments
  const commentLimit = 5;
  const [comments, setComments] = useState([]);
  const [loadMoreComments, setLoadMoreComments] = useState(commentLimit);
  const [selected, setSelected] = useState(moods[5]);
  const [openEmoji, setOpenEmoji] = useState(false);
  const commentRef = useRef();
  const [messageComments, setMessageComments] = useState("");
  // End Timeline Comments

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      setIsLikes(res.data.message === "liked" ? false : true);
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  });

  const onEmojiClick = (event, emojiObject) => {
    const cursor = commentRef.current.selectionStart;
    const text =
      messageComments.slice(0, cursor) +
      emojiObject.emoji +
      messageComments.slice(cursor);
    setMessageComments(text);
  };

  const handleDeletePost = async (id) => {
    try {
      dispatchLoading({ type: "PROCESSING " });
      await axiosDelete(`/posts/delete/${id}`, headers).then(() => {
        dispatchLoading({ type: "FINISHED" });
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            refreshTimeline: true,
          },
        });
        dispatchNotif({
          type: "NOTIF_SUCCESS",
          title: "Success",
          message: "Post deleted successfully",
        });
      });
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  };

  const handleComment = async (e, id) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (!messageComments) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: "Please enter a comment",
        });
        return;
      }

      try {
        dispatchLoading({ type: "PROCESSING " });
        await axiosPost(`/posts/${id}/comment`, { text: messageComments }, headers).then(() => {
          dispatchLoading({ type: "FINISHED" });
          dispatchGlobal({
            type: "GLOBAL_STATE",
            payload: {
              ...selector,
              refreshTimeline: true,
            }
          })
          setMessageComments("");
          setOpenEmoji(false);
          commentRef.current.focus();
          
        });
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    }
  }
  /* End Action */

  const username = user.username
    ? user.username
    : user.firstname + user.lastname + "-" + user._id;

  return (
    <>
      {!loadingSSR ? (
        <>
          <article
            aria-labelledby={"question-title-" + post._id}
            onClick={() => setOpenEmoji(false)}
          >
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
            <div className=" mt-6 flex items-center justify-between space-x-8">
              <div className="flex space-x-6">
                <div className="hover:bg-slate-500/50 rounded-lg px-1">
                  <span className="inline-flex items-start mt-1 justify-start text-sm">
                    <button
                      onClick={(e) => handleLike(e, post._id)}
                      type="button"
                      className="inline-flex space-x-2 mr-2 text-gray-400 hover:text-gray-500"
                    >
                      <ThumbUpIcon
                        className={classNames(
                          isLiked ? "text-indigo-500" : "text-gray-400",
                          "h-5 w-5"
                        )}
                        aria-hidden="true"
                      />
                      <span className="font-medium text-slate-400">
                        {likes}
                      </span>
                      <span className="sr-only">likes</span>
                    </button>
                  </span>
                </div>
                <span className="inline-flex items-center text-sm">
                  <button
                    onClick={() => {
                      !comments.includes(post._id)
                        ? setComments([...comments, post._id])
                        : setComments([
                            ...comments.filter((id) => id !== post._id),
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
          {comments.includes(post._id) && (
            <div className="flex items-start space-x-4 mt-6">
              <div className="flex-shrink-0">
                <img
                  className="inline-block h-10 w-10 rounded-full"
                  src={currentUser.profilePicture}
                  alt=""
                />
              </div>
              <div className="min-w-0 flex-1">
                <div>
                  <label htmlFor="comment" className="sr-only">
                    Add your comment
                  </label>
                  <div className="flex">
                    <div className="relative rounded-md shadow-sm w-full">
                      <input
                        type="text"
                        ref={commentRef}
                        value={messageComments}
                        onChange={(e) => setMessageComments(e.target.value)}
                        onKeyPress={(e) => handleComment(e, post._id)}
                        className="bg-transparent text-slate-300 block w-full text-xs pr-10 sm:text-sm border-2 border-slate-600 rounded-full focus:outline-0 focus:border-slate-500 focus:ring-0"
                        placeholder="Add a comment..."
                      />

                      <div className="absolute inset-y-0 right-0 pr-4 space-x-4 flex items-center cursor-pointer">
                        <EmojiHappyIcon
                          onClick={() => setOpenEmoji(!openEmoji)}
                          className="h-6 w-6 text-slate-300 "
                          aria-hidden="true"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                {openEmoji && (
                  <div className="mt-4 right-4 sm:right-4 md:right-20 lg:right-80 absolute">
                    <Picker
                      disableAutoFocus={true}
                      pickerStyle={{
                        background: "rgb(55 65 81)",
                        border: "none",
                        boxShadow: "0 0 0 0",
                      }}
                      disableSearchBar={true}
                      onEmojiClick={onEmojiClick}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="mt-2">
            <ul role="list" className="divide-y divide-slate-600">
              {comments.includes(post._id)
                ? post.comments
                    .sort((c1, c2) => {
                      return new Date(c2.createdAt) - new Date(c1.createdAt);
                    })
                    .slice(0, loadMoreComments)
                    .map((comment) => (
                      <Suspense fallback={<SkeletonText />} key={comment._id}>
                        <TimelineComment comment={comment} post={post} />
                      </Suspense>
                    ))
                : ""}
            </ul>
            {comments.includes(post._id) &&
              loadMoreComments < post.comments.length && (
                <div className="relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-slate-600" />
                  </div>
                  <div className="relative flex justify-center">
                    <button
                      onClick={() =>
                        setLoadMoreComments(loadMoreComments + commentLimit)
                      }
                      type="button"
                      className="inline-flex items-center shadow-sm px-4 py-1.5 border border-slate-600 text-sm leading-5 font-medium rounded-full text-slate-300 bg-slate-700 hover:bg-slate-800"
                    >
                      <PlusSmIcon
                        className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span className="text-sm">Load More</span>
                    </button>
                  </div>
                </div>
              )}
          </div>
        </>
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
