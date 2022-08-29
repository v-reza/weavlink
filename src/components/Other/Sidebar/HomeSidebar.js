import Divider from "@/uiComponents/Divider";
import React from "react";
import { BookmarkIcon } from "@heroicons/react/outline";

const HomeSidebar = ({ user, userProfile }) => {
  return (
    <div>
      <ul role="list">
        <div className="overflow-hidden sm:rounded-md shadow-slate-800">
          <div className="rounded-lg shadow bg-slate-800">
            <div className="bg-[url('https://static-exp1.licdn.com/sc/h/lortj0v1h4bx9wlwbdx6zs3f')] p-8 relative" />
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
                    <span className="text-blue-400 text-sm">
                      {user?.followers?.length}
                    </span>
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
                  <span className="text-white font-medium text-sm">My Items</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default HomeSidebar;
