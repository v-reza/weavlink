/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useHeader from "@/hooks/useHeader";
import useLoading from "@/hooks/useLoading";
import { axiosGet, axiosPost } from "@/utils/axiosInstance";
import {
  CheckIcon,
  EmojiHappyIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useRef, useState } from "react";
import classNames from "@/utils/classNames";
import useUser from "@/hooks/useUser";

const AddReplyComment = ({ comment }) => {
  /* Hooks */
  const replyRef = useRef();
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch: dispatchLoading } = useLoading();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { user } = useUser();
  /* End Hooks */

  /* State */
  const [messageReply, setMessageReply] = useState("");
  const [openMentionsPeople, setOpenMentionsPeople] = useState(false);
  const [listUser, setListUser] = useState([]);
  const [mentionsPeople, setMentionsPeople] = useState("");
  const [listMentionsPeople, setListMentionsPeople] = useState([]);
  console.log(listMentionsPeople);
  /* End State */

  /* Action */
  const onEmojiClick = (event, emojiObject) => {
    const cursor = replyRef.current.selectionStart;
    const text =
      messageReply.slice(0, cursor) +
      emojiObject.emoji +
      messageReply.slice(cursor);
    setMessageReply(text);
  };

  const handleNewReply = async (e) => {
    if (e.key === "Enter") {
      dispatchLoading({ type: "PROCESSING" });
      const data = {
        text: messageReply,
      };
      await axiosPost(
        `/comments/reply/comments/${comment._id}`,
        data,
        headers
      ).then(() => {
        setMessageReply("");
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            ...selector,
            refreshTimeline: true,
          },
        });
        dispatchLoading({ type: "FINISHED" });
      });
    }
  };

  const filteredListUser =
    mentionsPeople === ""
      ? []
      : listUser.filter((user) => {
          return (
            user.firstname
              .toLowerCase()
              .includes(mentionsPeople.replace(/[@]/u, "").toLowerCase()) ||
            user.lastname
              .toLowerCase()
              .includes(mentionsPeople.replace(/[@]/u, "").toLowerCase())
          );
        });
  /* End Action */

  /* useEffect */

  // useEffect(() => {
  //   // if (/[@]/u.test(messageReply)) {
  //     // setMentionsPeople(messageReply.replaceAll(messageReply, ""));
  //   // }
  // }, [messageReply]);

  useEffect(() => {
    const getListUser = async () => {
      const res = await axiosGet("/users");
      setListUser(res.data.filter((listUser) => listUser._id !== user?._id));
    };
    getListUser();
  }, [user?._id]);

  /* End useEffect */
  return (
    <div className="ml-4 p-2">
      <label htmlFor="reply" className="sr-only">
        Add your reply
      </label>
      <div className="flex">
        <div
          onClick={() => {
            setOpenMentionsPeople(!openMentionsPeople);
          }}
          className="flex items-center justify-center text-md font-medium text-slate-400 cursor-pointer px-2 py-1 hover:bg-slate-700/50 mr-2  rounded-md"
        >
          @
        </div>
        <div className="relative rounded-md shadow-sm w-full">
          <input
            ref={replyRef}
            value={messageReply}
            onChange={(e) => {
              setMessageReply(e.target.value);
              // if (messageReply.length > 0) {
              // setMessageReply(messageReply.replace(/[@]/u, ""));
              // setMentionsPeople(
              //   messageReply.replaceAll(
              //     messageReply,
              //     e.target.value.replaceAll(
              //       messageReply,
              //       mentionsPeople.replace(messageReply, "")
              //     )
              //   )
              // );
              // } else {
              //   setMentionsPeople(
              //     messageReply.replace(messageReply, e.target.value)
              //   );
              // }
              // if (/[@]/u.test(messageReply)) {
              // } else {
              //   setMentionsPeople(messageReply.replaceAll("@", ""));
              // }
            }}
            onKeyPress={(e) => handleNewReply(e)}
            type="text"
            className="bg-transparent text-slate-300 block w-full text-xs pr-10 sm:text-sm border-2 border-slate-600 rounded-full focus:outline-0 focus:border-slate-500 focus:ring-0"
            placeholder="Add a reply..."
          />
          <div className="absolute inset-y-0 right-0 pr-4 space-x-2 flex items-center cursor-pointer">
            <EmojiHappyIcon
              className="h-5 w-5 text-slate-300"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      {openMentionsPeople && (
        <div
          className={classNames(
            openMentionsPeople ? "block" : "hidden",
            "px-4 mt-1 relative"
          )}
        >
          <div className="z-20 absolute w-full rounded-md bg-slate-700 border border-slate-600 overflow-y-scroll h-56 ...">
            <div className="px-4 py-2">
              <input
                type="text"
                value={mentionsPeople}
                onChange={(e) => setMentionsPeople(e.target.value)}
                className="mb-4 bg-slate-800 text-slate-300 block w-full text-xs pr-10 sm:text-sm border-2 border-slate-700 rounded-full focus:outline-0 focus:border-slate-600 focus:ring-0"
                placeholder="Search..."
              />
              {filteredListUser.length > 0 ? (
                filteredListUser.map((user) => (
                  <div
                    className="flex space-x-3 mb-4 cursor-pointer"
                    key={user._id}
                    onClick={() => {
                      setMentionsPeople("");
                      const cursor = replyRef.current.selectionStart;
                      const text =
                        messageReply.slice(0, cursor) +
                        `@${user.firstname} ${user.lastname} ` +
                        messageReply.slice(cursor);
                      setMessageReply(messageReply.replace(messageReply, text));
                      setListMentionsPeople([
                        ...listMentionsPeople,
                        user.firstname + " " + user.lastname,
                      ]);
                      setOpenMentionsPeople(false);
                    }}
                  >
                    <div className="flex-shrink-0">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={
                          user?.profilePicture
                            ? user?.profilePicture
                            : "/avatar.png"
                        }
                        referrerPolicy="no-referrer"
                        alt=""
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-slate-300">
                        <p className="truncate">
                          {user?.firstname} {user?.lastname}
                        </p>
                      </div>
                      <div className="text-sm text-slate-500">
                        <p>Headline</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <span className="text-slate-300 font-medium flex items-center justify-center">
                  No result...
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReplyComment;
