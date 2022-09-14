/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import Divider from "@/uiComponents/Divider";
import classNames from "@/utils/classNames";
import {
  DotsHorizontalIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { PencilAltIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
const ChatBox = ({
  chatBoxOpen,
  setChatBoxOpen,
  setSelectedConversation,
  selectedConversation,
}) => {
  const [open, setOpen] = useState(false);
  const msgRef = useRef();

  const dummyMessage = [
    {
      id: 1,
      message: "Hey, how are you?",
      time: "2:30 PM",
      isSender: true,
    },
    {
      id: 2,
      message: "Hey, how are you dummy message?",
      time: "2:30 PM",
      isSender: false,
    },
    {
      id: 3,

      message: "Hey, how are you dummy message?",
      time: "2:30 PM",
      isSender: true,
    },
    {
      id: 4,
      message: "Hey, how are you dummy message?",
      time: "2:30 PM",
      isSender: false,
    },
    {
      id: 5,
      message: "Hey, how are you dummy message?",
      time: "2:30 PM",
      isSender: true,
    },
    {
      id: 6,
      message: "Hey, how are you dummy message?",
      time: "2:30 PM",
      isSender: false,
    },
    {
      id: 7,
      message: "Hey, how are you dummy message?",
      time: "2:30 PM",
      isSender: true,
    },
  ];

  useEffect(() => {
    if (chatBoxOpen) {
      setTimeout(() => {
        msgRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [dummyMessage, chatBoxOpen]);

  useEffect(() => {
    if (chatBoxOpen) {
      setOpen(true);
      setChatBoxOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatBoxOpen]);
  return (
    <div>
      <div
        className={`hidden sm:block ${
          !open && "cursor-pointer"
        } flex fixed bottom-0 right-0 mr-[22rem] z-10`}
      >
        <div>
          <div
            className={`block ${!open ? "w-56" : "w-96"} ${
              !open ? "h-12" : "h-96"
            } bg-slate-800 rounded-t-md shadow hover:shadow-lg transition-all duration-300 ease-in-out border border-slate-600 ${
              !open && "hover:bg-slate-700/80"
            } `}
            onClick={() => !open && setOpen(true)}
          >
            <div
              className={`p-3 ${
                open && "hover:bg-slate-700/80 cursor-pointer"
              }`}
              onClick={() => open && setOpen(false)}
            >
              <div className="flex space-x-3">
                <div className="flex-shrink-0">
                  <span className="inline-block relative">
                    <img
                      className="h-7 w-7 rounded-full"
                      src={selectedConversation.profilePicture || "/avatar.png"}
                      alt=""
                    />
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-black bg-green-400" />
                  </span>
                </div>
                <div className="min-w-0 flex-1 mt-1">
                  <p className="text-xs font-medium text-white">
                    {selectedConversation.name}
                  </p>
                </div>
                <div
                  className="flex-shrink-0 self-center flex space-x-2 hover:bg-slate-600 rounded-full p-2"
                  onClick={() => {
                    setChatBoxOpen(false);
                    setSelectedConversation(null);
                  }}
                >
                  <XIcon className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            <div className="h-56 overflow-y-auto">
              {dummyMessage.map((message) => (
                <div key={message.id} ref={msgRef}>
                  <Message message={message.message} />
                </div>
              ))}
            </div>
            <div className="w-full border-t-2 border-green-600">
              <div className="flex space-x-2">
                <div className="w-full flex relative items-center px-2 py-1">
                  <textarea
                    rows={1}
                    className="resize-none text-md focus:border-transparent focus:ring-0 focus:outline-none w-full bg-transparent sm:text-sm text-slate-400 font-medium border-transparent"
                    placeholder="Write a message..."
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer">
                    <ChevronUpIcon
                      className="h-5 w-5 text-gray-400 hover:bg-slate-700 rounded-full cursor-pointer"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full border-t border-slate-600">
              <div className="mt-2 flex space-x-2">
                <div className="w-full flex items-center justify-end mr-2">
                  <button
                    type="button"
                    className="w-max bg-indigo-600 hover:bg-indigo-700 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white sm:col-start-2 sm:text-sm"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <MessageBox open={open} setOpen={setOpen}/> */}
    </div>
  );
};

export default ChatBox;
