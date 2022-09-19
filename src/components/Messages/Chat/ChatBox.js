/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { Switch } from "@headlessui/react";
import { axiosGet, axiosPost } from "@/utils/axiosInstance";
import classNames from "@/utils/classNames";
import {
  DotsHorizontalIcon,
  DotsVerticalIcon,
  PencilIcon,
  PhotographIcon,
  QuestionMarkCircleIcon,
  XIcon,
} from "@heroicons/react/outline";
import { PencilAltIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { Fragment, useEffect, useRef, useState } from "react";
import Message from "./Message";
import useGlobal from "@/hooks/useGlobal";
import { useRouter } from "next/router";
import useNotif from "@/hooks/useNotif";
import { Menu, Transition } from "@headlessui/react";
import { Tooltip } from "flowbite-react";
import Modal from "@/uiComponents/Modal";
import FooterChatFile from "./Modals/FooterChatFile";
import FormChatFile from "./Modals/FormChatFile";
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
  /* State */
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [receiveUser, setReceiveUser] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [file, setFile] = useState(false);
  const [openEditFile, setOpenEditFile] = useState(false);
  const inputRef = useRef();

  /* Hooks */
  const { dispatch: dispatchNotif } = useNotif();
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
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    };
    getMessages();
  }, [currentChat?._id]);

  useEffect(() => {
    const receiveUser = currentChat?.members.find((m) => m !== user?._id);
    setReceiveUser(receiveUser);
  }, [currentChat, user?._id]);

  useEffect(() => {
    arrivalMessages &&
      currentChat?.members.includes(arrivalMessages.sender) &&
      setMessages((prev) => [...prev, arrivalMessages]);
  }, [arrivalMessages, currentChat?.members]);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        text: enabled ? text : inputRef.current.value,
        conversationId: res.data._id,
      };
      const receiverId = res.data.members.find((m) => m !== user?._id);

      socket.emit("sendMessage", {
        senderId: user?._id,
        receiverId: receiverId,
        text: enabled ? text : inputRef.current.value,
      });

      try {
        const res = await axiosPost("/messages", message);
        setMessages([...messages, res.data]);
        setText("");
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            ...selector,
            refreshConversations: true,
          },
        });
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    } else {
      const message = {
        sender: user?._id,
        text: enabled ? text : inputRef.current.value,
        conversationId: currentChat?._id,
      };

      const receiverId = currentChat?.members.find((m) => m !== user?._id);
      socket.emit("sendMessage", {
        senderId: user?._id,
        receiverId: receiverId,
        text: enabled ? text : inputRef.current.value,
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
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    }
  };

  const keydownEnter = (e) => {
    if (e.keyCode === 13) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    if (!enabled) {
      document.addEventListener("keydown", keydownEnter);
    }

    return () => {
      document.removeEventListener("keydown", keydownEnter);
    };
  }, [enabled]);

  return (
    <div>
      <div
        className={`hidden sm:block ${
          !open && "cursor-pointer"
        } flex fixed bottom-0 right-0 mr-[22rem] ${openEditFile ? "z-10" : "z-30"}`}
      >
        <div>
          <div
            className={`block ${!open ? "w-56" : "w-96"} ${
              !open ? "h-12" : `${file ? "h-[27rem]" : "h-96"}`
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
            {file && (
              <>
                <Modal
                  title={"Edit File"}
                  open={openEditFile}
                  setOpen={setOpenEditFile}
                  footer={<FooterChatFile setOpen={setOpenEditFile} />}
                >
                  <FormChatFile />
                </Modal>
                <div
                  className={`w-full border-t-2 ${
                    file ? "border-green-600" : "border-slate-600"
                  } px-2`}
                >
                  <div className="flex items-center justify-between p-2">
                    <span className="text-green-500 text-xs font-medium">
                      1 file attached
                    </span>
                    <div
                      className="p-2 rounded-full hover:bg-slate-700/50 cursor-pointer"
                      onClick={() => setOpenEditFile(true)}
                    >
                      <PencilIcon className="w-4 h-4 text-slate-300" />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div
              className={`w-full border-t-2 ${
                file ? "border-slate-600" : "border-green-600"
              } `}
            >
              <div className="flex space-x-2">
                <div className="w-full flex relative items-center px-2 py-1">
                  {enabled ? (
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
                  ) : (
                    <input
                      value={text}
                      ref={inputRef}
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
                      className="px-3 py-2 resize-none text-md focus:border-transparent focus:ring-0 focus:outline-none w-full bg-transparent sm:text-sm text-slate-400 font-medium border-transparent"
                      placeholder="Write a message..."
                    />
                  )}
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
                          onChange={() => setFile(true)}
                          // onChange={(e) => handleFile(e)}
                        />
                      </span>
                      <PhotographIcon className="h-5 w-5" />
                    </label>
                  </Tooltip>
                </div>
                <div className="w-full flex items-center justify-end mr-2">
                  {enabled && (
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
                  )}
                </div>
                <Menu
                  as="div"
                  className="flex-shrink-0 relative inline-block text-left"
                >
                  <Menu.Button className="group relative w-8 h-8 bg-transparent rounded-full inline-flex items-center justify-center">
                    <span className="sr-only">Open options menu</span>
                    <span className="flex items-center justify-center h-full w-full rounded-full">
                      <DotsVerticalIcon
                        className="w-5 h-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </span>
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="-top-2 transform -translate-y-full absolute right-0 w-56 origin-top-right bg-slate-700 ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md">
                      <div className="py-1">
                        <Menu.Item>
                          <Switch.Group
                            as="div"
                            className="flex items-center block px-4 py-2 cursor-pointer"
                          >
                            <Switch
                              checked={enabled}
                              onChange={setEnabled}
                              className={classNames(
                                enabled
                                  ? "bg-transparent border border-gray-400"
                                  : "bg-indigo-600",
                                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  enabled ? "translate-x-0" : "translate-x-5",
                                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                              />
                            </Switch>
                            <Switch.Label as="span" className="ml-3">
                              <span className="text-sm font-medium text-slate-400">
                                Press Enter to Send
                              </span>
                            </Switch.Label>
                          </Switch.Group>
                        </Menu.Item>
                        <Menu.Item>
                          <Switch.Group
                            as="div"
                            className="flex items-center block px-4 py-2 cursor-pointer"
                          >
                            <Switch
                              checked={enabled}
                              onChange={setEnabled}
                              className={classNames(
                                enabled
                                  ? "bg-indigo-600"
                                  : "bg-transparent border border-gray-400",
                                "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200"
                              )}
                            >
                              <span
                                aria-hidden="true"
                                className={classNames(
                                  enabled ? "translate-x-5" : "translate-x-0",
                                  "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                )}
                              />
                            </Switch>
                            <Switch.Label as="span" className="ml-3">
                              <span className="text-sm font-medium text-slate-400">
                                Click Send
                              </span>
                            </Switch.Label>
                          </Switch.Group>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
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
