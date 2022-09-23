/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useHeader from "@/hooks/useHeader";
import useLoading from "@/hooks/useLoading";
import useNotif from "@/hooks/useNotif";
import useUser from "@/hooks/useUser";
import Button from "@/uiComponents/Button";
import Modal from "@/uiComponents/Modal";
import { axiosGet, axiosPost, axiosPut } from "@/utils/axiosInstance";
import { Menu } from "@headlessui/react";
import { PencilIcon, UserAddIcon, XIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import FooterProfileBox from "./Modals/ProfileBox/FooterProfileBox";
import FormProfileBox from "./Modals/ProfileBox/FormProfileBox";

const ProfileBox = ({ user, userProfile, currentUser }) => {
  const [conversations, setConversations] = useState([]);
  const [conversationsUsers, setConversationsUsers] = useState(null);
  const [open, setOpen] = useState(false);

  const { dispatch: dispatchLoading } = useLoading();
  const { token, dispatch: dispatchAuth } = useAuth();
  const headers = useHeader(token);
  const { dispatch: dispatchNotif } = useNotif();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { dispatch } = useUser();
  const photoRef = useRef();
  const router = useRouter();
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

  useEffect(() => {
    const findConversations = conversations.find((conversation) => {
      return conversation.members.includes(user?._id);
    });
    setConversationsUsers(findConversations);
  }, [conversations, user?._id]);

  const handleFollow = async () => {
    await axiosPut(`/users/${user._id}/follow`, null, headers).then(() => {
      dispatch({ type: "FOLLOW", payload: user._id });
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          ...selector,
          refreshProfile: true,
        },
      });
      dispatchNotif({
        type: "NOTIF_SUCCESS",
        title: "Success",
        message: "Followed",
      });
    });
  };

  const handleMessage = async () => {
    if (!conversationsUsers) {
      try {
        const data = {
          senderId: currentUser?._id,
          receiverId: user?._id,
        };
        await axiosPost("/conversations", data).then(() => {
          dispatchNotif({
            type: "NOTIF_SUCCESS",
            title: "Success",
            message: "Conversations created",
          });
          dispatchGlobal({
            type: "GLOBAL_STATE",
            payload: {
              refreshConversations: true,
            },
          });
        });
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    } else {
      dispatchNotif({
        type: "NOTIF_SUCCESS",
        title: "Success",
        message: "Conversations already created",
      });
    }

    dispatchGlobal({
      type: "GLOBAL_STATE",
      payload: {
        ...selector,
        openMessaging: true,
      },
    });
  };

  const handlePhoto = async (e) => {
    try {
      const formData = new FormData();
      const fileName =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      const path =
        process.env.NEXT_APP_API_IMAGES || "http://localhost:1000/images/";
      const profilePictureName =
        path + fileName + "." + e.target.files[0].type.split("/")[1];
      console.log(fileName);
      console.log(profilePictureName);
      const customFile = new File([e.target.files[0]], fileName, {
        type: e.target.files[0].type,
      });
      formData.append("images", customFile);
      await axiosPost("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (data) => {
          dispatchLoading({
            type: "WITHPROGRESSBAR",
            payload: {
              progressBar: Math.round((100 * data.loaded) / data.total),
            },
          });
        },
      }).then(async () => {
        const data = {
          profilePicture: profilePictureName,
        };
        console.log(data);
        await axiosPut("/users/update/profileInformation", data, headers).then(
          (res) => {
            dispatchAuth({
              type: "SET_NEW_TOKEN",
              payload: res.data.token,
            });
            dispatch({
              type: "UPDATE_USER",
              payload: res.data.user,
            });
            dispatchLoading({ type: "FINISHED" });
            dispatchNotif({
              type: "NOTIF_SUCCESS",
              title: "Success",
              message: "Profile picture updated",
            });
            router.replace(router.asPath);
          }
        );
      });
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  };

  return (
    <>
      <Modal
        title={"Edit intro"}
        open={open}
        setOpen={setOpen}
        footer={<FooterProfileBox setOpen={setOpen} />}
        maxWidth={"sm:max-w-2xl"}
      >
        <FormProfileBox
          user={user}
          userProfile={userProfile}
          currentUser={currentUser}
        />
      </Modal>
      <ul role="list" className="select-none">
        <div className="overflow-hidden sm:rounded-md shadow-slate-800">
          <div className="rounded-lg shadow bg-slate-800">
            <div
              style={
                user?.coverPicture
                  ? {
                      backgroundImage: `url(${folder + user.coverPicture})`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }
                  : {
                      backgroundImage: `url('https://static-exp1.licdn.com/sc/h/lortj0v1h4bx9wlwbdx6zs3f')`,
                    }
              }
              className="p-16 relative cursor-pointer"
            >
              <div className="absolute right-0 top-0 m-4">
                <div className="bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    data-supported-dps="16x16"
                    fill="currentColor"
                    className="mercado-match text-blue-500 hover:text-blue-600"
                    width="16"
                    height="16"
                    focusable="false"
                  >
                    <path d="M10 9a2 2 0 11-2-2 2 2 0 012 2zm5-2.5V14H1V6.5A2.5 2.5 0 013.5 4h.75L5 2h6l.75 2h.75A2.5 2.5 0 0115 6.5zM11 9a3 3 0 10-3 3 3 3 0 003-3z"></path>
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center justify-start relative px-8">
              <img
                src={user?.profilePicture || "/avatar.png"}
                className={`w-36 h-36 rounded-full absolute border-2 border-slate-800 object-cover ${
                  user?._id === currentUser?._id && "cursor-pointer"
                }`}
                referrerPolicy="no-referrer"
                alt=""
                onClick={() =>
                  user?._id === currentUser?._id && photoRef.current.click()
                }
              />
              <span className="sr-only">
                Insert link
                <input
                  accept="image/*"
                  className="input"
                  id="inputFile"
                  multiple
                  type="file"
                  ref={photoRef}
                  onChange={(e) => handlePhoto(e)}
                />
              </span>
            </div>

            {user?._id === currentUser?._id ? (
              <div className="flex items-center justify-end cursor-pointer p-2">
                <div
                  className="rounded-full hover:bg-slate-700/20 p-4"
                  onClick={() => setOpen(true)}
                >
                  <PencilIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-end cursor-pointer p-2">
                <div className="rounded-full hover:bg-slate-700/20 p-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    data-supported-dps="24x24"
                    fill="currentColor"
                    className="mercado-match text-white"
                    width="24"
                    height="24"
                    focusable="false"
                  >
                    <path d="M22 18a4.52 4.52 0 00-1.17-2.83L19 13l-.8-5.56A6.27 6.27 0 0012 2a6.27 6.27 0 00-6.21 5.44L5 13l-1.83 2.17A4.52 4.52 0 002 18v1h8.28a2 2 0 103.44 0H22zM12 4a4.29 4.29 0 014.23 3.72L17 13H7l.77-5.3A4.26 4.26 0 0112 4zM4.32 17c.12-.19.24-.37.38-.55L6.77 14h10.46l2 2.42a4.67 4.67 0 01.41.58z"></path>
                  </svg>
                </div>
              </div>
            )}
            <div className="px-0 -mt-8">
              <div className="px-8 py-8">
                <div className="grid grid-cols-12">
                  <div className="col-span-12 sm:col-span-6">
                    <div className="flex items-center justify-start mt-2">
                      <span className="text-white text-xl font-medium">
                        {user?.firstname + " " + user?.lastname}
                      </span>
                    </div>
                    <div className="flex items-center justify-start">
                      <span className="text-slate-300 text-md">
                        {userProfile?.headLine}
                      </span>
                    </div>
                    <div className="flex items-center justify-start">
                      <span className="text-gray-400 text-md">
                        {userProfile?.city || userProfile?.country ? (
                          <>
                            {userProfile?.city + ", " + userProfile?.country} •
                            <span className="text-blue-300 cursor-pointer hover:underline">
                              {" "}
                              Contact info
                            </span>
                          </>
                        ) : (
                          <span className="text-gray-400 text-md">
                            {user._id === currentUser?._id ? (
                              <>{"Add your location"}</>
                            ) : (
                              "Location not available"
                            )}
                          </span>
                        )}
                      </span>
                    </div>
                    <div className="flex items-center justify-start">
                      <span className="text-blue-300 text-md cursor-pointer hover:underline">
                        {user?.followers?.length} connections
                      </span>
                    </div>
                  </div>
                  <div className="col-span-6 flex items-center justify-end mx-4">
                    <div className="grid grid-rows-3 grid-flow-col hidden sm:block">
                      <div className="flex-shrink-0 row-span-3 space-y-2">
                        <div className="flex items-center space-x-2">
                          <img
                            className="object-cover w-8 h-8"
                            src="/avatar.png"
                            alt=""
                          />
                          <span className="text-slate-300 font-medium text-sm">
                            ICUBE by Sirclo
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <img
                            className="object-cover w-8 h-8"
                            src="/avatar.png"
                            alt=""
                          />
                          <span className="text-slate-300 font-medium text-sm">
                            SMKN 4 Malang
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {user._id === currentUser?._id ? (
                  <div className="mt-2 flex items-center space-x-2">
                    <Button
                      rounded="full"
                      width="max"
                      py="1"
                      bg="blue-500"
                      border="border-none"
                      hoverBg="blue-600"
                    >
                      <span className="text-black/80">Open to</span>
                    </Button>
                    <div className="block sm:hidden">
                      <Button
                        rounded="full"
                        width="max"
                        py="1"
                        bg="transparent"
                        hoverBg="slate-700"
                      >
                        <span className="text-slate-200">More..</span>
                      </Button>
                    </div>
                    <div className="hidden sm:block space-x-2">
                      <Button
                        rounded="full"
                        width="max"
                        py="1"
                        borderColor="blue-300"
                        bg="transparent"
                        hoverBg="slate-700"
                      >
                        <span className="text-blue-300">
                          Add profile section
                        </span>
                      </Button>
                      <Button
                        rounded="full"
                        width="max"
                        py="1"
                        bg="transparent"
                        hoverBg="slate-700"
                      >
                        <span className="text-slate-200">More</span>
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-2 flex items-center space-x-2">
                    <Button
                      rounded="full"
                      width="max"
                      py="1"
                      bg="blue-500"
                      border="border-none"
                      hoverBg="blue-600"
                      onClick={() => {
                        !user?.followers?.includes(currentUser?._id)
                          ? handleFollow()
                          : handleMessage();
                      }}
                    >
                      {!user?.followers?.includes(currentUser?._id) ? (
                        <>
                          <UserAddIcon className="w-5 h-5 text-black/80 mr-1" />
                          <span className="text-black/80">Connect</span>
                        </>
                      ) : (
                        <>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            data-supported-dps="16x16"
                            fill="currentColor"
                            className="mercado-match text-black/80 mr-1"
                            width="16"
                            height="16"
                            focusable="false"
                          >
                            <path d="M14 2L0 6.67l5 2.64 5.67-3.98L6.7 11l2.63 5L14 2z"></path>
                          </svg>
                          <span className="text-black/80">Message</span>
                        </>
                      )}
                    </Button>
                    <Button
                      rounded="full"
                      width="max"
                      py="1"
                      bg="transparent"
                      hoverBg="slate-700"
                    >
                      <span className="text-slate-200">More</span>
                    </Button>
                  </div>
                )}
                <div className="mt-4 grid grid-rows-3 grid-flow-col block sm:hidden">
                  <div className="flex-shrink-0 row-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <img
                        className="object-cover w-8 h-8"
                        src="/avatar.png"
                        alt=""
                      />
                      <span className="text-slate-300 font-medium text-sm">
                        ICUBE by Sirclo
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <img
                        className="object-cover w-8 h-8"
                        src="/avatar.png"
                        alt=""
                      />
                      <span className="text-slate-300 font-medium text-sm">
                        SMKN 4 Malang
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-6 sm:grid sm:grid-cols-6 sm:gap-2 space-y-4 sm:space-y-0">
                  <div className="col-span-3 bg-slate-700/40 cursor-pointer hover:underline border border-slate-600 rounded-lg px-4 py-5 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-white flex items-center justify-between">
                          <a href="#" className="hover:underline">
                            Open to work
                          </a>
                          <div className="flex-shrink-0 self-center flex">
                            <Menu
                              as="div"
                              className="relative z-10 inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                  <span className="sr-only">Open options</span>
                                  <PencilIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>
                            </Menu>
                          </div>
                        </div>
                        <p className="text-sm text-slate-300">
                          <a href="#" className="hover:underline">
                            Web Developer roles
                          </a>
                        </p>
                        <p className="text-sm text-blue-300 font-medium">
                          <a href="#" className="hover:underline">
                            See all details
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-3 bg-transparent cursor-pointer hover:underline border border-slate-600 rounded-lg px-4 py-5 sm:px-6">
                    <div className="flex space-x-3">
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium text-white flex items-center justify-between">
                          <a href="#" className="hover:underline">
                            Find Potential{" "}
                            <span className="font-normal">
                              by showcasing the services you provide.
                            </span>
                          </a>
                          <div className="flex-shrink-0 self-center flex -mt-4">
                            <Menu
                              as="div"
                              className="relative z-10 inline-block text-left"
                            >
                              <div>
                                <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                  <span className="sr-only">Open options</span>
                                  <XIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </Menu.Button>
                              </div>
                            </Menu>
                          </div>
                        </div>
                        <p className="text-sm text-blue-300 font-medium">
                          <a href="#" className="hover:underline">
                            Get Started
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </>
  );
};

export default ProfileBox;
