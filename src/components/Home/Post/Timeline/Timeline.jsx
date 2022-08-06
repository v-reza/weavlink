/* eslint-disable jsx-a11y/no-redundant-roles */
import React, { useEffect } from "react";
import {
  EmojiHappyIcon as EmojiHappyIconOutline,
  PaperClipIcon,
} from "@heroicons/react/outline";
import { Listbox } from "@headlessui/react";
import { Fragment, useState, lazy, Suspense } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  EmojiHappyIcon as EmojiHappyIconSolid,
  EmojiSadIcon,
  FireIcon,
  HeartIcon,
  XIcon,
  ChatAltIcon,
  CodeIcon,
  DotsVerticalIcon,
  FlagIcon,
  ShareIcon,
  StarIcon,
  ThumbUpIcon,
  TrashIcon,
  PlusSmIcon,
} from "@heroicons/react/solid";
import { format } from "date-fns";
import {
  axiosDelete,
  axiosGet,
  axiosPost,
  axiosPut,
} from "../../../../helper/axiosHelper";
import { Skeleton } from "@mui/material";
import useAuth from "../../../../hooks/useAuth";
import useNotif from "../../../../hooks/useNotif";
// import TimelineComment from "./TimelineComment";
import { useNavigate } from "react-router-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as ReactCarousel } from "react-responsive-carousel";
const TimelineComment = lazy(() => import("./TimelineComment"));
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
    icon: EmojiHappyIconSolid,
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

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Timeline = ({ post, setIsNewPost }) => {
  const [selected, setSelected] = useState(moods[5]);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const { user: currentUser, token } = useAuth();
  const { dispatch } = useNotif();
  const [likes, setLikes] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [textComment, setTextComment] = useState("");

  const [hiddenComments, setHiddenComments] = useState([]);

  /* Comment Count */
  const commentLimit = 5;
  const [loadMoreComments, setLoadMoreComments] = useState(commentLimit);

  useEffect(() => {
    const getPostUser = async () => {
      try {
        const res = await axiosGet("/users/" + post.userId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPostUser();
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes, post.userId]);

  const handleDeletePost = async (postId) => {
    try {
      await axiosDelete("/posts/delete/" + postId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then(() => {
        setIsNewPost(true);
        dispatch({
          type: "NOTIF_SUCCESS",
          title: "Success",
          message: "Post deleted successfully",
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (e, postId) => {
    e.preventDefault();
    try {
      await axiosPut("/posts/" + postId + "/like", null, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment = async (e, postId) => {
    e.preventDefault();
    if (!textComment) {
      dispatch({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Please enter a comment",
      });
      return;
    }
    try {
      await axiosPost(
        "/posts/" + postId + "/comment",
        {
          text: textComment,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setTextComment("");
      setIsNewPost(true);
    } catch (error) {
      console.log(error);
    }
  };

  const username = user.firstname + user.lastname + "-" + user._id;

  return (
    <>
      <li
        key={post._id}
        className="bg-white px-4 py-6 shadow sm:p-6 sm:rounded-lg"
      >
        <article aria-labelledby={"question-title-" + post._id}>
          <div>
            <div className="flex space-x-3">
              <div className="flex-shrink-0">
                {!user.profilePicture ? (
                  <Skeleton variant="circular" width={40} height={40} />
                ) : (
                  <img
                    onClick={() =>
                      navigate(
                        "/profile/" + username.replace(" ", "-").toLowerCase()
                      )
                    }
                    className="cursor-pointer h-10 w-10 rounded-full"
                    src={user.profilePicture}
                    referrerPolicy="no-referrer"
                    //   src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {!user.firstname ? (
                    <Skeleton variant="text" />
                  ) : (
                    <span
                      onClick={() =>
                        navigate(
                          "/profile/" + username.replace(" ", "-").toLowerCase()
                        )
                      }
                      className="cursor-pointer hover:underline"
                    >
                      {user.firstname + " " + user.lastname}
                    </span>
                  )}
                </p>
                <p className="text-sm text-gray-500">
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "cursor-pointer flex px-4 py-2 text-sm"
                              )}
                            >
                              <StarIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Add to favorites</span>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "cursor-pointer flex px-4 py-2 text-sm"
                              )}
                            >
                              <CodeIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Embed</span>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "cursor-pointer flex px-4 py-2 text-sm"
                              )}
                            >
                              <FlagIcon
                                className="mr-3 h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                              <span>Report content</span>
                            </div>
                          )}
                        </Menu.Item>
                        {currentUser._id === user._id && (
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
            <div className="flex flex-col justify-center items-center mt-4">
              <ReactCarousel
                showThumbs={false}
                showStatus={false}
                dynamicHeight={true}
              >
                {post.images?.map((img, index) => (
                  <div key={index}>
                    <img src={img} alt="" />
                  </div>
                ))}
              </ReactCarousel>
            </div>
          )}
          <div
            className="mt-4 text-sm text-base text-gray-700 space-y-4"
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
                      isLiked ? "text-red-500" : "text-gray-400",
                      "h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-gray-900">{likes}</span>
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
                        ? "text-red-500"
                        : "text-gray-400",
                      "h-5 w-5"
                    )}
                    aria-hidden="true"
                  />
                  <span className="font-medium text-gray-900">
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
                  <span className="font-medium text-gray-900">Share</span>
                </button>
              </span>
            </div>
          </div>
        </article>
        <div className="mt-2">
          <ul role="list" className="divide-y divide-gray-200">
            {hiddenComments.includes(post._id)
              ? post.comments
                  .sort((c1, c2) => {
                    return new Date(c2.createdAt) - new Date(c1.createdAt);
                  })
                  .slice(0, loadMoreComments)
                  .map((comment) => (
                    <Suspense
                      fallback={<Skeleton variant="text" />}
                      key={comment._id}
                    >
                      <TimelineComment comment={comment} />
                    </Suspense>
                  ))
              : ""}
          </ul>
          {hiddenComments.includes(post._id) &&
            loadMoreComments < post.comments.length && (
              <div className="relative">
                <div
                  className="absolute inset-0 flex items-center"
                  aria-hidden="true"
                >
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center">
                  <button
                    onClick={() =>
                      setLoadMoreComments(loadMoreComments + commentLimit)
                    }
                    type="button"
                    className="inline-flex items-center shadow-sm px-4 py-1.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
        {hiddenComments.includes(post._id) && (
          <div className="flex items-start space-x-4 mt-6">
            <div className="flex-shrink-0">
              <img
                className="inline-block h-10 w-10 rounded-full"
                src={currentUser.profilePicture}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <form action="#">
                <div className="border-b border-gray-200 focus-within:border-indigo-600">
                  <label htmlFor="comment" className="sr-only">
                    Add your comment
                  </label>
                  <textarea
                    rows={3}
                    name="comment"
                    id="comment"
                    className="block w-full border-0 border-b border-transparent p-0 pb-2 resize-none focus:ring-0 focus:border-indigo-600 sm:text-sm"
                    placeholder="Add your comment..."
                    value={textComment}
                    onChange={(e) => setTextComment(e.target.value)}
                  />
                </div>
                <div className="pt-2 flex justify-between">
                  <div className="flex items-center space-x-5">
                    <div className="flow-root">
                      <button
                        type="button"
                        className="-m-2 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                      >
                        <PaperClipIcon className="h-6 w-6" aria-hidden="true" />
                        <span className="sr-only">Attach a file</span>
                      </button>
                    </div>
                    <div className="flow-root">
                      <Listbox value={selected} onChange={setSelected}>
                        {({ open }) => (
                          <>
                            <Listbox.Label className="sr-only">
                              Your mood
                            </Listbox.Label>
                            <div className="relative">
                              <Listbox.Button className="relative -m-2 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500">
                                <span className="flex items-center justify-center">
                                  {selected.value === null ? (
                                    <span>
                                      <EmojiHappyIconOutline
                                        className="flex-shrink-0 h-6 w-6"
                                        aria-hidden="true"
                                      />
                                      <span className="sr-only">
                                        Add your mood
                                      </span>
                                    </span>
                                  ) : (
                                    <span>
                                      <div
                                        className={classNames(
                                          selected.bgColor,
                                          "w-8 h-8 rounded-full flex items-center justify-center"
                                        )}
                                      >
                                        <selected.icon
                                          className="flex-shrink-0 h-5 w-5 text-white"
                                          aria-hidden="true"
                                        />
                                      </div>
                                      <span className="sr-only">
                                        {selected.name}
                                      </span>
                                    </span>
                                  )}
                                </span>
                              </Listbox.Button>

                              <Transition
                                show={open}
                                as={Fragment}
                                leave="transition ease-in duration-100"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                              >
                                <Listbox.Options className="absolute z-10 -ml-6 w-60 bg-white shadow rounded-lg py-3 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                  {moods.map((mood) => (
                                    <Listbox.Option
                                      key={mood.value}
                                      className={({ active }) =>
                                        classNames(
                                          active ? "bg-gray-100" : "bg-white",
                                          "cursor-default select-none relative py-2 px-3"
                                        )
                                      }
                                      value={mood}
                                    >
                                      <div className="flex items-center">
                                        <div
                                          className={classNames(
                                            mood.bgColor,
                                            "w-8 h-8 rounded-full flex items-center justify-center"
                                          )}
                                        >
                                          <mood.icon
                                            className={classNames(
                                              mood.iconColor,
                                              "flex-shrink-0 h-5 w-5"
                                            )}
                                            aria-hidden="true"
                                          />
                                        </div>
                                        <span className="ml-3 block font-medium truncate">
                                          {mood.name}
                                        </span>
                                      </div>
                                    </Listbox.Option>
                                  ))}
                                </Listbox.Options>
                              </Transition>
                            </div>
                          </>
                        )}
                      </Listbox>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={(e) => handleComment(e, post._id)}
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </li>
    </>
  );
};

export default Timeline;
