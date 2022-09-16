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
import useGlobal from "@/hooks/useGlobal";
import { useRouter } from "next/router";
// let socket;
const ChatBox = ({
  socket,
  chatBoxOpen,
  setChatBoxOpen,
  setSelectedConversation,
  selectedConversation,
  currentChat,
  setCurrentChat,
  arrivalMessages,
  onlineUsers,
  arrivalTyping,
}) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiveUser, setReceiveUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const router = useRouter();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const msgRef = useRef();
  const { user } = useUser();

  
  /* Socket check is Online users */
  useEffect(() => {
    const checkIsOnline = onlineUsers?.find(
      (online) => online.userId === selectedConversation?._id
    );
    setIsOnline(checkIsOnline ? true : false);
  }, [onlineUsers, selectedConversation?._id]);

  /* Socket check is users typing */
  useEffect(() => {
    // const checkIsTyping =
    //   (typing) => typing.receiverId === selectedConversation?._id
    // );
    setIsTyping(
      arrivalTyping?.senderId === selectedConversation?._id ? true : false
    );
  }, [arrivalTyping, selectedConversation?._id]);

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
  }, [currentChat?._id]);

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

  // useEffect(() => {
  //   socket = io(server);
  //   socket.connect();
  //   console.log("socket on chatbox connect?");

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // useEffect(() => {
  //   socket.on("getMessage", (data) => {
  //     console.log("getMessageChatBox => ",data )
  //     setArrivalMessageSocket({
  //       sender: data.senderId,
  //       text: data.text,
  //       createdAt: Date.now(),
  //     });
  //   });
  //   if (selector?.oneTimes) {
  //     setArrivalMessageSocket({
  //       sender: selector?.arrivalMessages?.senderId,
  //       text: selector?.arrivalMessages?.text,
  //       createdAt: Date.now(),
  //     })
  //     dispatchGlobal({
  //       type: "GLOBAL_STATE",
  //       payload: {
  //         oneTimes: false,
  //       }
  //     })
  //   }
  // }, [user?._id, selector?.oneTimes])
  // console.log(selector?.arrivalMessages)

  // console.log(arrivalMessageSocket)

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat?.members]);

  const handleSubmit = async (e) => {
    if (!currentChat) {
      const dataConversation = {
        senderId: user?._id,
        receiverId: selector.receiverId,
      };
      const res = await axiosPost("/conversations", dataConversation);
      socket.emit("sendConversations", {
        conversationId: res.data._id,
        senderId: user?._id,
        receiverId: selector?.receiverId,
      });
      setCurrentChat(res.data);
      const message = {
        sender: user?._id,
        text,
        conversationId: res.data._id,
      };
      const receiverId = res.data.members.find((m) => m !== user?._id);
      // socket.emit("addUser", receiverId);
      socket.emit("sendMessage", {
        senderId: user?._id,
        receiverId: receiverId,
        text: text,
      });

      // socket.emit("sendTest", {
      //   receiverId: selector?.userReceiver[0].userId
      // })

      // socket.emit("sendConversations", {
      //   conversationId: res.data._id,
      //   senderId: user?._id,
      //   receiverId: receiverId
      // })

      try {
        const res = await axiosPost("/messages", message);
        setMessages([...messages, res.data]);
        setText("");
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            ...selector,
            // refreshMessages: true,
            // socketConversations: true,
            refreshConversations: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    } else {
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
      socket.emit("sendTyping", {
        isTyping: false,
        senderId: user?._id,
        receiverId: receiverId,
      });

      try {
        const res = await axiosPost("/messages", message);
        setMessages([...messages, res.data]);
        setText("");
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            refreshMessages: true,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div
        className={`hidden sm:block ${
          !open && "cursor-pointer"
        } flex fixed bottom-0 right-0 mr-[22rem] z-30`}
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
                    <span
                      className={`absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-black ${
                        isOnline ? "bg-green-400" : "bg-gray-600"
                      }`}
                    />
                  </span>
                </div>
                <div className="min-w-0 flex-1 mt-1">
                  <div
                    className="flex text-xs font-medium text-white  truncate"
                    onClick={() =>
                      open &&
                      router.push(`/profile/${selectedConversation.username}`)
                    }
                  >
                    <span className="hover:underline">
                      {selectedConversation.firstname +
                        " " +
                        selectedConversation.lastname}
                    </span>
                    {isTyping && (
                      <div className="animate-pulse text-slate-300 hover:no-underline font-medium text-xs ml-2 ">
                        typing......
                      </div>
                    )}
                  </div>
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
              {messages.map((message, index) => (
                <div key={index} ref={msgRef}>
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
                    onChange={(e) => {
                      setText(e.target.value);
                      const receiverId = currentChat?.members.find(
                        (m) => m !== user?._id
                      );
                      socket.emit("sendTyping", {
                        isTyping: e.target.value.length > 0 ? true : false,
                        senderId: user?._id,
                        receiverId: receiverId,
                      });
                    }}
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
                    disabled={!text ? true : false}
                    type="button"
                    className={classNames(
                      !text
                        ? "bg-gray-600 hover:bg-gray-700 cursor-not-allowed"
                        : "bg-indigo-600 hover:bg-indigo-700",
                      "w-max inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white sm:col-start-2 sm:text-sm"
                    )}
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
