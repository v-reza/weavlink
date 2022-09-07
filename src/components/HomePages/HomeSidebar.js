/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/display-name */
import Divider from "@/uiComponents/Divider";
import React from "react";
import {
  BookmarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import Card from "@/uiComponents/Card";
import DotsLoader from "@/uiComponents/DotsLoader";

const HomeSidebar = ({ user, userProfile }) => (
  <div>
    {user && userProfile ? (
      <ul role="list">
        <div className="overflow-hidden sm:rounded-md shadow-slate-800">
          <div className="rounded-lg shadow bg-slate-800">
            <div className="bg-[url('https://static-exp1.licdn.com/sc/h/lortj0v1h4bx9wlwbdx6zs3f')] p-8 relative" />
            <div className="w-full flex items-center justify-center relative">
              <img
                src={user?.profilePicture || "/avatar.png"}
                className="w-16 h-16 rounded-full absolute border border-slate-800"
                referrerPolicy="no-referrer"
                alt=""
              />
            </div>
            <div className="px-0">
              <div className="px-8 py-8">
                <div className="flex items-center justify-center mt-2">
                  <span className="text-white text-md font-medium">
                    {user?.firstname + " " + user?.lastname}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <span className="text-slate-500 text-sm">
                    {userProfile?.headLine}
                  </span>
                </div>
              </div>
              <Divider mt={"-mt-4"} />
              <div className="px-4 py-1 cursor-pointer mt-2 w-full hover:bg-slate-500/30">
                <div>
                  <div className="flex items-center justify-between ">
                    <span className="text-slate-400 font-medium text-xs">
                      Connections
                    </span>
                    <span className="text-blue-400 text-sm">
                      {user?.followers?.length}
                    </span>
                  </div>
                </div>
                <span className="text-white text-xs">Grow your network</span>
              </div>
              <div className="px-4 py-1 cursor-pointer mt-1 w-full hover:bg-slate-500/30">
                <div>
                  <div className="flex items-center justify-between ">
                    <span className="text-slate-400 font-medium text-xs">
                      {"Who's viewed your profile"}
                    </span>
                    <span className="text-blue-400 text-sm">0</span>
                  </div>
                </div>
              </div>
              <Divider mt={"mt-4"} />
              <div className="px-4 py-2 mt-2 w-full cursor-pointer hover:bg-slate-500/30">
                <div className="flex items-center">
                  <span className="text-slate-400 font-medium text-xs underline">
                    Access exclusive tools & insights
                  </span>
                </div>
                <div className="flex items-center mt-1 space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    data-supported-dps="24x24"
                    className="mercado-match"
                    width="24"
                    height="24"
                    focusable="false"
                  >
                    <path
                      d="M20 20a3.36 3.36 0 001-2.39V6.38A3.38 3.38 0 0017.62 3H6.38A3.36 3.36 0 004 4z"
                      fill="#f8c77e"
                    ></path>
                    <path
                      d="M4 4a3.36 3.36 0 00-1 2.38v11.24A3.38 3.38 0 006.38 21h11.24A3.36 3.36 0 0020 20z"
                      fill="#e7a33e"
                    ></path>
                  </svg>
                  <span className="text-amber-500 text-xs underline">
                    Get Hired Faster, Try Premium Free
                  </span>
                </div>
              </div>
              <Divider />
              <div className="px-4 py-3 w-full cursor-pointer hover:bg-slate-500/30">
                <div className="flex items-center space-x-4">
                  <BookmarkIcon className="w-5 h-5 text-white" />
                  <span className="text-white font-medium text-sm">
                    My Items
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    ) : (
      <Card>
        <DotsLoader
          className="flex items-center justify-center overflow-hidden"
          color="grey"
        />
      </Card>
    )}
  </div>
);

HomeSidebar.Group = ({ children, ...props }) => (
  <>
    <div className="px-4 py-2">
      <div className="py-1">
        <span className="text-blue-400 text-xs hover:underline cursor-pointer">
          Groups
        </span>
      </div>
      <div className="py-1">
        <div className="flex items-center justify-between">
          <span className="text-blue-400 text-xs hover:underline cursor-pointer">
            Events
          </span>
          <PlusIcon className="w-4 h-4 text-slate-300 text-xs cursor-pointer" />
        </div>
      </div>
      <div className="py-1">
        <span className="text-blue-400 text-xs hover:underline cursor-pointer">
          Followed Hashtags
        </span>
      </div>
    </div>
    <Divider mt={"mt-4"} />
    <div className="py-2 w-full cursor-pointer hover:bg-slate-500/30">
      <div className="flex items-center justify-center">
        <span className="text-white text-sm font-medium cursor-pointer">
          Discover more
        </span>
      </div>
    </div>
  </>
);

HomeSidebar.Mobile = ({
  user,
  userProfile,
  showMore,
  setShowMore,
  ...props
}) => (
  <>
    {user && userProfile ? (
      <div className="block lg:hidden xl:hidden mb-8">
        <ul role="list">
          <div className="overflow-hidden rounded-lg sm:rounded-md shadow-slate-800">
            <div className="shadow bg-slate-800">
              <div className="rounded-t-lg bg-[url('https://static-exp1.licdn.com/sc/h/lortj0v1h4bx9wlwbdx6zs3f')] p-8 relative" />
              <div className="w-full flex items-center justify-center relative">
                <img
                  src={user?.profilePicture}
                  className="w-16 h-16 rounded-full absolute border border-slate-800"
                  alt=""
                />
              </div>
              <div className="px-0">
                <div className="px-8 py-8">
                  <div className="flex items-center justify-center mt-2">
                    <span className="text-white text-md font-medium">
                      {user?.firstname + " " + user?.lastname}
                    </span>
                  </div>
                  <div className="flex items-center justify-center">
                    <span className="text-slate-500 text-sm">
                      {userProfile?.headLine}
                    </span>
                  </div>
                </div>
                {showMore && (
                  <div>
                    <Divider mt={"-mt-4"} />
                    <div className="px-4 py-1 cursor-pointer mt-2 w-full hover:bg-slate-500/30">
                      <div>
                        <div className="flex items-center justify-between ">
                          <span className="text-slate-400 font-medium text-xs">
                            Connections
                          </span>
                          <span className="text-blue-400 text-sm">
                            {user?.followers?.length}
                          </span>
                        </div>
                      </div>
                      <span className="text-white text-xs">
                        Grow your network
                      </span>
                    </div>
                    <div className="px-4 py-1 cursor-pointer mt-1 w-full hover:bg-slate-500/30">
                      <div>
                        <div className="flex items-center justify-between ">
                          <span className="text-slate-400 font-medium text-xs">
                            {"Who's viewed your profile"}
                          </span>
                          <span className="text-blue-400 text-sm">0</span>
                        </div>
                      </div>
                    </div>
                    <Divider mt={"mt-4"} />
                    <div className="px-4 py-2 mt-2 w-full cursor-pointer hover:bg-slate-500/30">
                      <div className="flex items-center">
                        <span className="text-slate-400 font-medium text-xs underline">
                          Access exclusive tools & insights
                        </span>
                      </div>
                      <div className="flex items-center mt-1 space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          data-supported-dps="24x24"
                          className="mercado-match"
                          width="24"
                          height="24"
                          focusable="false"
                        >
                          <path
                            d="M20 20a3.36 3.36 0 001-2.39V6.38A3.38 3.38 0 0017.62 3H6.38A3.36 3.36 0 004 4z"
                            fill="#f8c77e"
                          ></path>
                          <path
                            d="M4 4a3.36 3.36 0 00-1 2.38v11.24A3.38 3.38 0 006.38 21h11.24A3.36 3.36 0 0020 20z"
                            fill="#e7a33e"
                          ></path>
                        </svg>
                        <span className="text-amber-500 text-xs underline">
                          Get Hired Faster, Try Premium Free
                        </span>
                      </div>
                    </div>
                    <Divider />
                    <div className="px-4 py-3 w-full cursor-pointer hover:bg-slate-500/30">
                      <div className="flex items-center space-x-4">
                        <BookmarkIcon className="w-5 h-5 text-white" />
                        <span className="text-white font-medium text-sm">
                          My Items
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ul>
        {showMore && (
          <Card className="mt-4" usePx0={true}>
            <div className="px-4 py-4">
              <div className="py-1">
                <div className="py-1">
                  <span className="text-blue-400 text-xs hover:underline cursor-pointer">
                    Groups
                  </span>
                </div>
                <div className="py-1">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-xs hover:underline cursor-pointer">
                      Events
                    </span>
                    <PlusIcon className="w-4 h-4 text-slate-300 text-xs" />
                  </div>
                </div>
                <div className="py-1">
                  <span className="text-blue-400 text-xs hover:underline cursor-pointer">
                    Followed Hashtags
                  </span>
                </div>
              </div>
            </div>
            <Divider />
            <div className="py-4 w-full cursor-pointer hover:bg-slate-500/30">
              <div className="flex items-center justify-center">
                <span className="text-white text-sm font-medium cursor-pointer">
                  Discover more
                </span>
              </div>
            </div>
          </Card>
        )}
        <div className="mt-4">
          <span
            className="cursor-pointer flex items-center justify-center text-sm text-slate-300"
            onClick={() => setShowMore(!showMore)}
          >
            {!showMore ? (
              <>
                Show more <ChevronDownIcon className="w-5 h-5 ml-2 mt-1" />
              </>
            ) : (
              <>
                Show less <ChevronUpIcon className="w-5 h-5 ml-2 mt-1" />
              </>
            )}
          </span>
        </div>
      </div>
    ) : (
      <div className="block lg:hidden xl:hidden mb-8">
        <Card padding={"6"}>
          <DotsLoader
            className="flex items-center justify-center overflow-hidden"
            color="grey"
          />
        </Card>
      </div>
    )}
  </>
);

export default HomeSidebar;
