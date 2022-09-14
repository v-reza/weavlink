/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useUser from "@/hooks/useUser";
import Divider from "@/uiComponents/Divider";
import { ChevronDownIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import { PencilAltIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import ChatBox from "./Chat/ChatBox";
// import socket from "@/utils/socket";
import io from "socket.io-client";
const server = process.env.NEXT_APP_API;
let socket;
const MessageBox = () => {
  const dummyConversation = [
    {
      id: 1,
      name: "Jonny",
      profilePicture: "/avatar.png",
      lastMessage: "Hey, how are you?",
      lastMessageTime: "2:30 PM",
      unreadMessages: 2,
    },
    {
      id: 2,
      name: "Jonny the pablo",
      profilePicture:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastMessage: "Hey, how are you dummy message?",
      lastMessageTime: "2:30 PM",
      unreadMessages: 2,
    },
    {
      id: 3,
      name: "Jonny the pablo ke 3",
      profilePicture:
        "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastMessage: "Hey, how are you dummy message?",
      lastMessageTime: "2:30 PM",
      unreadMessages: 2,
    },
  ];
  const [isSSR, setIsSSR] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const { user } = useUser();
  useEffect(() => {
    setIsSSR(isAuthenticated);
  }, [isAuthenticated]);
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  useEffect(() => {
    socket = io(server, options);
    socket.connect()
    return () => {
      socket.disconnect();
    }
  }, []);

  return (
    <div>
      {isSSR && (
        <div className="flex items-center space-x-96 flex-row ">
          <div
            className={`hidden sm:block ${
              !open && "cursor-pointer"
            } flex fixed bottom-0 right-0 z-10`}
          >
            <div>
              <div
                className={`block w-80 ${
                  !open ? "h-12" : "h-[36rem] "
                } bg-slate-800 rounded-t-md shadow hover:shadow-lg transition-all duration-300 ease-in-out ${
                  !open && "hover:bg-slate-700/50"
                } `}
                onClick={() => !open && setOpen(true)}
              >
                <div
                  className={`p-3 ${
                    open &&
                    "hover:bg-slate-700/50 cursor-pointer border-b border-slate-600"
                  }`}
                  onClick={() => open && setOpen(false)}
                >
                  <div className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <span className="inline-block relative">
                        <img
                          className="h-7 w-7 rounded-full"
                          src={user?.profilePicture || "/avatar.png"}
                          alt=""
                        />
                        <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-black bg-green-400" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 mt-1">
                      <p className="text-sm font-medium text-white">
                        Messaging
                      </p>
                    </div>
                    <div className="flex-shrink-0 self-center flex space-x-2">
                      <DotsHorizontalIcon className="w-4 h-4 text-white" />
                      <PencilAltIcon className="w-4 h-4 text-white" />
                      {!open ? (
                        <ChevronUpIcon className="w-4 h-4 text-white" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-white" />
                      )}
                    </div>
                  </div>
                </div>
                {dummyConversation.map((conversation) => (
                  <div
                    className="bg-transparent p-3 hover:bg-slate-700/50 cursor-pointer"
                    onClick={() => {
                      setSelectedConversation(conversation);
                      setChatBoxOpen(true);
                    }}
                    key={conversation.id}
                  >
                    <div className="flex space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={conversation.profilePicture}
                          alt=""
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <a
                            href="#"
                            className="hover:underline text-sm font-medium text-slate-300"
                          >
                            {conversation.name}
                          </a>
                          <a
                            href="#"
                            className="hover:underline text-xs font-medium text-slate-400"
                          >
                            {conversation.lastMessageTime}
                          </a>
                        </div>
                        <p className="text-xs text-slate-400 truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {selectedConversation && (
            <ChatBox
              chatBoxOpen={chatBoxOpen}
              setChatBoxOpen={setChatBoxOpen}
              selectedConversation={selectedConversation}
              setSelectedConversation={setSelectedConversation}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MessageBox;
