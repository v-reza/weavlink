import useNotif from "@/hooks/useNotif";
import useSocket from "@/hooks/useSocket";
import useUser from "@/hooks/useUser";
import { axiosGet, axiosPost } from "@/utils/axiosInstance";
import classNames from "@/utils/classNames";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon, PhotographIcon } from "@heroicons/react/solid";
import { Tooltip } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import MessageMobile from "./MessageMobile";

const ChatBoxMobile = ({
  setChatBoxOpen,
  selectedConversation,
  setSelectedConversation,
  currentChat,
  onlineUsers,
  arrivalTyping,
  arrivalMessages,
}) => {
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const [receiveUser, setReceiveUser] = useState(null);
  const [text, setText] = useState("");
  const [file, setFile] = useState([]);

  const { socket } = useSocket();
  const { user } = useUser();
  const msgRef = useRef();
  const { handleError } = useNotif();

  /* Scroll into new message */
  useEffect(() => {
    msgRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* Check is user typing */
  useEffect(() => {
    setIsTyping(
      arrivalTyping?.senderId === selectedConversation?._id ? true : false
    );
  }, [arrivalTyping?.senderId, selectedConversation?._id]);

  /* Get Messages */
  useEffect(() => {
    try {
      const getMessages = async () => {
        const res = await axiosGet(`/messages/${currentChat?._id}`);
        setMessages(res.data);
      };
      getMessages();
    } catch (error) {
      handleError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat?._id]);

  /* Get receive user */
  useEffect(() => {
    const receiveUser = currentChat?.members.find((m) => m !== user?._id);
    setReceiveUser(receiveUser);
  }, [currentChat, user?._id]);

  /* Get new message from socket */
  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat?.members]);

  /* Send Messages */
  const handleSubmit = async (e) => {
    try {
      const message = {
        sender: user?._id,
        text: text,
        conversationId: currentChat?._id,
      };

      const formData = new FormData();
      const fileNameList = [];
      if (file.length > 0) {
        for (const key of Object.keys(file)) {
          const fileName =
            Math.random().toString(36).substring(7) +
            Math.random().toString(36).substring(7);
          const customFile = new File([file[key]], fileName, {
            type: file[key].type,
          });
          formData.append("images", customFile);
          fileNameList.push(fileName + "." + file[key].type.split("/")[1]);
        }
        await axiosPost("/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        message.images = fileNameList;
      }

      const receiverId = currentChat?.members.find((m) => m !== user?._id);
      socket.emit("sendMessage", {
        senderId: user?._id,
        receiverId: receiverId,
        text: text,
        images: fileNameList,
      });
      socket.emit("sendTyping", {
        isTyping: false,
        senderId: user?._id,
        receiverId: receiverId,
      });

      const res = await axiosPost("/messages", message);
      setMessages([...messages, res.data]);
      setText("");
      setFile([]);
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <>
      <div className="h-[55rem] overflow-y-auto overflow-x-hidden block lg:hidden mt-2">
        <div className="px-3 py-2 border-b border-slate-600">
          <div className="flex items-center justify-between">
            <span
              className="text-white text-md font-medium px-2 flex items-center"
              onClick={() => {
                setChatBoxOpen(false);
                setSelectedConversation(null);
              }}
            >
              <ArrowLeftIcon className="w-5 h-5 mr-4 cursor-pointer" />{" "}
              {selectedConversation?.firstname +
                " " +
                selectedConversation?.lastname}
              {isTyping && (
                <div className="animate-pulse text-slate-300 hover:no-underline font-medium text-xs ml-2 ">
                  typing......
                </div>
              )}
            </span>
            <div className="flex items-center space-x-3">
              <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                <DotsHorizontalIcon className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-transparent p-3 hover:bg-slate-700/50 cursor-pointer space-y-4">
          {messages.map((message, index) => (
            <div key={index} ref={msgRef}>
              <MessageMobile
                message={message}
                receiveUser={
                  message.sender !== user?._id ? receiveUser : user?._id
                }
                own={message.sender === user?._id}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="h-[10rem]">
        <div className="px-3 py-2 border-t border-slate-600">
          <div className="flex space-x-2">
            <div className="w-full flex relative items-center px-2 py-1">
              <textarea
                rows={2}
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
                className="resize-none bg-slate-600/50 rounded-md text-md focus:border-transparent focus:ring-0 focus:outline-none w-full bg-transparent sm:text-sm text-slate-400 font-medium border-transparent"
                placeholder="Write a message..."
              />
            </div>
          </div>
        </div>
        <div className="w-full border-t border-slate-600">
          <div className="px-3 py-1">
            <div className="mt-2 flex space-x-2">
              <div className="ml-2">
                <Tooltip content="Add a photo" placement="top">
                  <label
                    htmlFor="inputFile"
                    className="cursor-pointer w-max inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
                  >
                    <span className="sr-only">
                      Insert link
                      <input
                        accept="image/*"
                        className="input"
                        id="inputFile"
                        multiple
                        type="file"
                        // onChange={(e) => handleFile(e)}
                      />
                    </span>
                    <PhotographIcon className="h-5 w-5" />
                  </label>
                </Tooltip>
              </div>
              <div className="w-full flex items-center justify-end mr-2">
                <button
                  onClick={(e) => handleSubmit(e)}
                  disabled={text || file.length > 0 ? false : true}
                  type="button"
                  className={classNames(
                    text || file.length > 0
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-gray-600 hover:bg-gray-700 cursor-not-allowed",
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
    </>
  );
};

export default ChatBoxMobile;
