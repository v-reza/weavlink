/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import useNotif from "@/hooks/useNotif";
import { SkeletonText } from "@/uiComponents/Skeleton";
import { axiosGet } from "@/utils/axiosInstance";
import { replaceFormatDate } from "@/utils/constants";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

const Conversations = ({
  conversation,
  setSelectedConversation,
  setChatBoxOpen,
  currentUser,
  onlineUsers,
  arrivalTyping,
}) => {
  const [user, setUser] = useState();
  const [lastMessages, setLastMessages] = useState(null);
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const [isTyping, setIsTyping] = useState(false);
  const [isOnline, setIsOnline] = useState(false);
  const { dispatch: dispatchNotif } = useNotif();

  useEffect(() => {
    const checkIsOnline = onlineUsers?.find(
      (online) => online.userId === user?._id
    );
    setIsOnline(checkIsOnline ? true : false);
  }, [onlineUsers, user?._id]);

  useEffect(() => {
    setIsTyping(arrivalTyping?.senderId === user?._id ? true : false);
  }, [arrivalTyping?.senderId, user?._id]);

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser?._id);
    const getUser = async () => {
      const res = await axiosGet(`/users/${friendId}`);
      setUser(res.data);
    };
    getUser();
  }, [conversation, currentUser?._id]);

  useEffect(() => {
    const getLastMessage = async () => {
      try {
        const res = await axiosGet(`/messages/${conversation._id}`);
        setLastMessages(
          res.data
            .filter((m) => m.sender !== currentUser?._id)
            .slice(-1)
            .pop()
        );
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    };
    getLastMessage();
    if (selector?.refreshMessages) {
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          refreshMessages: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation, currentUser?._id, selector?.refreshMessages]);

  return (
    <div>
      <div
        className="bg-transparent p-3 hover:bg-slate-700/50 cursor-pointer"
        onClick={() => {
          setSelectedConversation(user);
          setChatBoxOpen(true);
        }}
        key={conversation.id}
      >
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <span className="inline-block relative">
              <img
                className="h-10 w-10 rounded-full"
                src={user?.profilePicture || "/avatar.png"}
                alt=""
              />
              <span
                className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-black ${
                  isOnline ? "bg-green-400" : "bg-gray-600"
                }`}
              />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              {user?.firstname && user?.lastname ? (
                <a
                  href="#"
                  className="hover:underline text-sm font-medium text-slate-300 truncate"
                >
                  {user?.firstname + " " + user?.lastname}
                </a>
              ) : (
                <SkeletonText />
              )}
              <a
                href="#"
                className="hover:underline text-xs font-medium text-slate-400"
              >
                {lastMessages?.createdAt
                  ? replaceFormatDate(format(lastMessages?.createdAt))
                  : replaceFormatDate(format(conversation.createdAt))}
              </a>
            </div>
            {isTyping ? (
              <p
                href="#"
                className="animate-pulse text-xs font-medium text-slate-400"
              >
                typing....
              </p>
            ) : (
              <p className="text-xs text-slate-400 truncate">
                {/* {conversation.lastMessage} */}
                {lastMessages ? lastMessages?.text : "No messages yet"}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
