/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useHeader from "@/hooks/useHeader";
import useLoading from "@/hooks/useLoading";
import InputMentions from "@/uiComponents/inputMentions";
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
    messageReply === ""
      ? []
      : listUser.filter((user) => {
          return (
            user.firstname
              .toLowerCase()
              .includes(messageReply.replace(/[@]/u, "").toLowerCase()) ||
            user.lastname
              .toLowerCase()
              .includes(messageReply.replace(/[@]/u, "").toLowerCase())
          );
        });

  /* End Action */

  /* useEffect */
  useEffect(() => {
    if (/[@]/u.test(messageReply)) {
      setOpenMentionsPeople(true);
    } else {
      setOpenMentionsPeople(false);
    }
  }, [messageReply]);

  useEffect(() => {
    const getListUser = async () => {
      const res = await axiosGet("/users");
      setListUser(res.data.filter((listUser) => listUser._id !== user?._id));
    };
    getListUser();
  }, [user?._id]);

  /* End useEffect */
  console.log(filteredListUser);
  // console.log(messageReply.replace(/[@]/u, ""));

  return (
    <div className="ml-6 p-2">
      <label htmlFor="reply" className="sr-only">
        Add your reply
      </label>
      <div className="flex">
        <div className="relative rounded-md shadow-sm w-full">
          <input
            ref={replyRef}
            value={messageReply}
            onChange={(e) => setMessageReply(e.target.value)}
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
      {filteredListUser.length > 0 && (
        <div
          className={classNames(
            openMentionsPeople ? "block" : "hidden",
            "px-4 mt-1 relative"
          )}
        >
          <div className="z-20 absolute w-full rounded-sm bg-slate-700 border border-slate-600 overflow-y-scroll h-32 ...">
            <div className="px-4 py-2">
              {filteredListUser.length > 0 &&
                filteredListUser.map((user) => (
                  <div
                    className="flex space-x-3 mb-4 cursor-pointer"
                    key={user._id}
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
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddReplyComment;
