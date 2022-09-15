/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import { axiosGet } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import ConversationsSearch from "./ConversationsSearch";

const Conversations = ({
  conversation,
  setSelectedConversation,
  setChatBoxOpen,
  currentUser,
}) => {
  const [user, setUser] = useState();
  const [lastMessages, setLastMessages] = useState(null);
  const { selector, dispatch: dispatchGlobal } = useGlobal();

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
        console.log(error);
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
            <img
              className="h-10 w-10 rounded-full"
              src={user?.profilePicture || "/avatar.png"}
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="hover:underline text-sm font-medium text-slate-300 truncate"
              >
                {user?.firstname + " " + user?.lastname}
              </a>
              <a
                href="#"
                className="hover:underline text-xs font-medium text-slate-400"
              >
                {format(lastMessages?.createdAt)}
              </a>
            </div>
            <p className="text-xs text-slate-400 truncate">
              {/* {conversation.lastMessage} */}
              {lastMessages ? lastMessages?.text : "No messages yet"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;