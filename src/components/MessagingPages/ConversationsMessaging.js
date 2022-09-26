/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import useNotif from "@/hooks/useNotif";
import useUser from "@/hooks/useUser";
import { SkeletonProfile, SkeletonText } from "@/uiComponents/Skeleton";
import { axiosGet } from "@/utils/axiosInstance";
import { replaceFormatDate } from "@/utils/constants";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

const ConversationsMessaging = ({
  conversation,
  onlineUsers,
  arrivalTyping,
  setSelectedConversation,
  setChatBoxOpen,
}) => {
  const [user, setUser] = useState(null);
  const [lastMessages, setLastMessages] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { user: currentUser } = useUser();
  const { handleError, handleSuccess } = useNotif();
  const { selector, dispatch: dispatchGlobal } = useGlobal();

  /* Check is user online */
  useEffect(() => {
    const checkIsOnline = onlineUsers?.find(
      (online) => online.userId === user?._id
    );
    setIsOnline(checkIsOnline ? true : false);
  }, [onlineUsers, user?._id]);

  /* Check user is typing */
  useEffect(() => {
    setIsTyping(arrivalTyping?.senderId === user?._id ? true : false);
  }, [arrivalTyping?.senderId, user?._id]);

  /* Conversation User  */
  useEffect(() => {
    let onMounted = false;
    try {
      const getUser = async () => {
        const friendId = await conversation?.members.find(
          (m) => m !== currentUser?._id
        );
        if (friendId) {
          const res = await axiosGet(`/users/${friendId}`);
          if (res.data && !onMounted) {
            setUser(res.data);
          }
        }
      };
      getUser();
      return () => {
        onMounted = true;
      };
    } catch (error) {
      handleError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?.members, currentUser?._id]);

  /* Last Messages */
  useEffect(() => {
    let onMounted = false;
    try {
      const getLastMessage = async () => {
        const res = await axiosGet(`/messages/${conversation?._id}`);
        if (res.data && !onMounted) {
          setLastMessages(
            res.data
              .filter((m) => m.sender !== currentUser?._id)
              .slice(-1)
              .pop()
          );
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
      return () => {
        onMounted = true;
      };
    } catch (error) {
      handleError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?._id, currentUser?._id, selector?.refreshMessages]);

  return (
    <div>
      {user ? (
        <div
          className="bg-transparent p-3 hover:bg-slate-700/50 cursor-pointer"
          onClick={() => {
            setSelectedConversation(user);
            setChatBoxOpen(true);
          }}
        >
          <div className="flex space-x-3">
            <div className="flex-shrink-0">
              <span className="inline-block relative">
                <img
                  className="h-10 w-10 rounded-full"
                  src={user.profilePicture || "/avatar.png"}
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
                <a
                  href="#"
                  className="hover:underline text-sm font-medium text-slate-300 truncate"
                >
                  {user.firstname + " " + user.lastname}
                </a>

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
                <p className="animate-pulse text-xs font-medium text-slate-400">
                  typing....
                </p>
              ) : (
                <p className="text-xs text-slate-400 truncate">
                  {/* {conversation.lastMessage} */}
                  {lastMessages
                    ? lastMessages?.images?.length > 0
                      ? "Sent a photo"
                      : lastMessages?.text
                    : "No messages yet"}
                </p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <div className="flex items-center space-x-2">
            <SkeletonProfile />
            <div className="flex flex-col items-center mt-4">
              <SkeletonText />
              <SkeletonText />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationsMessaging;
