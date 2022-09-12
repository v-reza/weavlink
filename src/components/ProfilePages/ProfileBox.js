/* eslint-disable @next/next/no-img-element */
import Button from "@/uiComponents/Button";
import { Menu } from "@headlessui/react";
import { PencilIcon, UserAddIcon, XIcon } from "@heroicons/react/outline";
import { PaperAirplaneIcon } from "@heroicons/react/solid";
import React from "react";

const ProfileBox = ({ user, userProfile, currentUser }) => {
  return (
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
              className="w-36 h-36 rounded-full absolute border-2 border-slate-800 object-cover"
              referrerPolicy="no-referrer"
              alt=""
            />
          </div>
          <div className="flex items-center justify-end cursor-pointer p-2">
            <div className="rounded-full hover:bg-slate-700/20 p-4">
              <PencilIcon className="w-6 h-6 text-white" />
            </div>
          </div>
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
                      <span className="text-blue-300">Add profile section</span>
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
                  >
                    {!user?.followers?.includes(currentUser?._id) ? (
                      <>
                        <UserAddIcon className="w-5 h-5 text-black/80 mr-1" />
                        <span className="text-black/80">Connect</span>
                      </>
                    ) : (
                      <>
                        <PaperAirplaneIcon className="w-5 h-5 text-black/80 mr-1" />
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
                            className="relative z-30 inline-block text-left"
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
                            className="relative z-30 inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Open options</span>
                                <XIcon className="h-5 w-5" aria-hidden="true" />
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
  );
};

export default ProfileBox;
