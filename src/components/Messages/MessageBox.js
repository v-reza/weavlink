/* eslint-disable react-hooks/exhaustive-deps */
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
import Conversations from "./Conversations";
import useHeader from "@/hooks/useHeader";
import { axiosGet } from "@/utils/axiosInstance";

let socket;
const MessageBox = () => {
  const [isSSR, setIsSSR] = useState(false);
  const [open, setOpen] = useState(false);
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);

  const { isAuthenticated, token } = useAuth();
  const { user } = useUser();
  const headers = useHeader(token);
  const { selector, dispatch: dispatchGlobal } = useGlobal();

  useEffect(() => {
    setIsSSR(isAuthenticated);
  }, [isAuthenticated]);

  useEffect(() => {
    if (selector?.openMessaging) {
      setOpen(true);
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          ...selector,
          openMessaging: false,
        },
      });
    }
  }, [selector?.openMessaging]);

  useEffect(() => {
    const getConversation = async () => {
      const res = await axiosGet("/conversations", headers);
      setConversations(res.data);
    };
    getConversation();
    if (selector?.refreshConversations) {
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          refreshConversations: false,
        },
      });
    }
  }, [user?._id, selector?.refreshConversations]);

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
                {conversations.length > 0 ? (
                  conversations.map((conversation) => (
                    <div
                      key={conversation._id}
                      onClick={() => setCurrentChat(conversation)}
                    >
                      <Conversations
                        conversation={conversation}
                        setSelectedConversation={setSelectedConversation}
                        setChatBoxOpen={setChatBoxOpen}
                        currentUser={user}
                      />
                    </div>
                  ))
                ) : (
                  <div className="text-white text-center mt-4">
                    No conversations
                  </div>
                )}
              </div>
            </div>
          </div>
          {selectedConversation && (
            <ChatBox
              currentChat={currentChat}
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
