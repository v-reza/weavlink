/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import Divider from "@/uiComponents/Divider";
import { axiosGet, axiosPost } from "@/utils/axiosInstance";
import classNames from "@/utils/classNames";
import {
  DotsHorizontalIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import io from "socket.io-client";
import { PencilAltIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
let socket;
const ChatBox = ({
  chatBoxOpen,
  setChatBoxOpen,
  setSelectedConversation,
  selectedConversation,
  currentChat,
}) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiveUser, setReceiveUser] = useState(null);
  const [arrivalMessageSocket, setArrivalMessageSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const msgRef = useRef();
  const { user } = useUser();

  useEffect(() => {
    if (chatBoxOpen) {
      setTimeout(() => {
        msgRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 500);
    } 
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatBoxOpen]);

  useEffect(() => {
    if (chatBoxOpen) {
      setOpen(true);
      setChatBoxOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatBoxOpen]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axiosGet(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, []);

  useEffect(() => {
    const receiveUser = currentChat?.members.find((m) => m !== user?._id);
    setReceiveUser(receiveUser);
  }, [currentChat, user?._id]);

  //socket
  const options = {
    "force new connection": true,
    reconnectionAttempts: "Infinity",
    timeout: 10000,
    transports: ["websocket"],
  };
  const server = "https://weavsocket.herokuapp.com";
  // const server = "http://localhost:5000";
  console.log(arrivalMessageSocket)
  useEffect(() => {
    socket = io(server);
    socket.connect();
    
    socket.on("getMessage", (data) => {
      setArrivalMessageSocket({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    arrivalMessageSocket &&
      currentChat?.members.includes(arrivalMessageSocket.sender) &&
      setMessages((prev) => [...prev, arrivalMessageSocket]);
  }, [arrivalMessageSocket, currentChat?.members]);

  useEffect(() => {
    socket.emit("addUser", user?._id);
    socket.on("getUsers", (users) => {
      setOnlineUsers(
        user?.followings?.filter((f) => users.some((u) => u.senderId === f))
      );
    });
  }, [user?._id, user?.followings]);

  const handleSubmit = async (e) => {
    const message = {
      sender: user?._id,
      text: text,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find((m) => m !== user?._id);
    socket.emit("sendMessage", {
      senderId: user?._id,
      receiverId: receiverId,
      text: text,
    });

    try {
      const res = await axiosPost("/messages", message);
      setMessages([...messages, res.data]);
      setText("");
    } catch (error) {
      console.log(error);
    }
  };

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
                    {selectedConversation.firstname +
                      " " +
                      selectedConversation.lastname}
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
              {messages.map((message) => (
                <div key={message._id} ref={msgRef}>
                  <Message
                    message={message}
                    receiveUser={
                      message.sender !== user._id ? receiveUser : user?._id
                    }
                  />
                </div>
              ))}
            </div>
            <div className="w-full border-t-2 border-green-600">
              <div className="flex space-x-2">
                <div className="w-full flex relative items-center px-2 py-1">
                  <textarea
                    rows={1}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
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
                    onClick={(e) => handleSubmit(e)}
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
