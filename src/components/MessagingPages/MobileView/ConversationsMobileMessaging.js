/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import useSocket from "@/hooks/useSocket";
import useUser from "@/hooks/useUser";
import DotsLoader from "@/uiComponents/DotsLoader";
import { DotsHorizontalIcon, PencilAltIcon } from "@heroicons/react/outline";
import {
  ArrowLeftIcon,
  ChevronUpIcon,
  PhotographIcon,
} from "@heroicons/react/solid";
import { Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";
import ConversationsMessaging from "../ConversationsMessaging";
import ConversationsSearchMessaging from "../ConversationsSearchMessaging";
import ChatBoxMobile from "./Messaging/ChatBoxMobile";
import MessageMobile from "./Messaging/MessageMobile";

const ConversationsMobileMessaging = ({ conversations }) => {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const [isConversationsNotFound, setIsConversationsNotFound] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [arrivalTyping, setArrivalTyping] = useState(null);
  const [arrivalMessages, setArrivalMessages] = useState(null);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);

  const { socket } = useSocket();
  const { user } = useUser();
  const { dispatch: dispatchGlobal } = useGlobal();
  useEffect(() => {
    setTimeout(() => {
      if (conversations.length === 0) {
        setIsConversationsNotFound(true);
      }
    }, 2000);
  }, [conversations]);

  useEffect(() => {
    socket?.on("getUsers", (data) => {
      console.log("getUsersMobile =>", data);
      setOnlineUsers(data.filter((item) => item.userId !== user?._id));
    });

    socket?.on("getTyping", (data) => {
      if (data.isTyping) {
        setArrivalTyping(data);
      } else {
        setArrivalTyping(null);
      }
    });

    socket?.on("getMessage", (data) => {
      dispatchGlobal({  
        type: "GLOBAL_STATE",
        payload: {
          refreshMessages: true,
        },
      });
      setArrivalMessages({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        images: data.images,
      });
    });
  }, [socket, user?._id]);

  return (
    <div>
      {!chatBoxOpen ? (
        <div className="h-[65rem] overflow-y-auto overflow-x-hidden block lg:hidden mt-2">
          <div className="px-3 py-2 border-b border-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-white text-md font-medium px-2">
                Messaging
              </span>
              <div className="flex items-center space-x-3">
                <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                  <DotsHorizontalIcon className="w-5 h-5" />
                </div>
                <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                  <PencilAltIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          <ConversationsSearchMessaging />
          {conversations.length > 0 ? (
            conversations.map((conversation) => (
              <div
                key={conversation._id}
                onClick={() => setCurrentChat(conversation)}
              >
                <ConversationsMessaging
                  conversation={conversation}
                  onlineUsers={onlineUsers}
                  arrivalTyping={arrivalTyping}
                  setSelectedConversation={setSelectedConversation}
                  setChatBoxOpen={setChatBoxOpen}
                />
              </div>
            ))
          ) : !isConversationsNotFound ? (
            <DotsLoader
              className="flex items-center justify-center"
              color="gray"
            />
          ) : (
            <div className="text-white text-center mt-4">No conversations</div>
          )}
        </div>
      ) : (
        selectedConversation && (
          <ChatBoxMobile
            setChatBoxOpen={setChatBoxOpen}
            selectedConversation={selectedConversation}
            setSelectedConversation={setSelectedConversation}
            currentChat={currentChat}
            arrivalTyping={arrivalTyping}
            arrivalMessages={arrivalMessages}
          />
        )
      )}
    </div>
  );
};

export default ConversationsMobileMessaging;
