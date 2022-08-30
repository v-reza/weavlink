/* eslint-disable @next/next/no-img-element */
import Button from "@/uiComponents/Button";
import { ArrowSmRightIcon, PlusIcon } from "@heroicons/react/outline";
import React from "react";

const HomeRightbar = ({ listFeeds }) => {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="text-white text-md font-medium">Add to your feed</h2>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          data-supported-dps="16x16"
          fill="currentColor"
          className="mercado-match text-gray-300 cursor-pointer"
          width="16"
          height="16"
          focusable="false"
        >
          <path d="M12 2H4a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2zm-3 8v2H7.5A1.5 1.5 0 016 10.5a1.56 1.56 0 01.1-.5l1.08-3h2.13l-1.09 3zm0-3.75A1.25 1.25 0 1110.25 5 1.25 1.25 0 019 6.25z"></path>
        </svg>
      </div>
      <div className="mt-2">
        {listFeeds?.map((usr) => (
          <div key={usr._id}>
            <div className="py-2">
              <div className="flex space-x-3 cursor-pointer">
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={
                      usr.user.profilePicture
                        ? usr.user.profilePicture
                        : "/avatar.png"
                    }
                    referrerPolicy="no-referrer"
                    alt=""
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium text-slate-300">
                    <p className="truncate">
                      {usr.user.firstname} {usr.user.lastname}
                    </p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <p>{usr.headLine || "No Headline"}</p>
                  </div>
                  <div className="text-sm text-slate-500">
                    <div className="mt-2 ">
                      <Button
                        hoverBg={"slate-700"}
                        width="max"
                        py="1"
                        rounded="full"
                      >
                        <span className="flex items-center text-sm">
                          <PlusIcon className="mr-2 h-4 w-4" /> Follow
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="mt-2">
          <span className="flex items-center text-sm text-slate-300 font-medium cursor-pointer hover:bg-slate-500/50 px-2 py-2 rounded-lg">
            View All Recomendations{" "}
            <ArrowSmRightIcon className="ml-2 h-5 w-" />
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeRightbar;
