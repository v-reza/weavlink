import Card from "@/uiComponents/Card";
import Divider from "@/uiComponents/Divider";
import { ArrowRightIcon, EyeIcon, UsersIcon } from "@heroicons/react/solid";
import React from "react";

const Resources = () => {
  return (
    <div className="mt-4">
      <Card usePx0={true}>
        <div className="p-8">
          <span className="text-white text-md font-medium">Resources</span>
          <div className="text-slate-400 text-sm flex mt-2 font-medium">
            <EyeIcon className="h-5 w-5 mr-2" /> Private to you
          </div>
          <div className="flex space-x-4 mt-2">
            <div className="flex-shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                data-supported-dps="24x24"
                fill="currentColor"
                className="mercado-match text-slate-300"
                width="24"
                height="24"
                focusable="false"
              >
                <path d="M21 12h-1a9 9 0 00-9-9V2a10 10 0 0110 10zM11 5v1a6 6 0 016 6h1a7 7 0 00-7-7zm3 7h1a4 4 0 00-4-4v1a3 3 0 013 3zm-2 0a1 1 0 00-1.82-.54L5.32 6.6a8 8 0 00-.24 8.4 2.33 2.33 0 014.16.68l.88 3.08A8.57 8.57 0 0012 19a8 8 0 004.4-1.32l-4.86-4.86A1 1 0 0012 12zm-5 3a1.32 1.32 0 00-1.27 1L4 22h6l-1.73-6A1.32 1.32 0 007 15z"></path>
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-slate-300 flex space-x-1">
                <span>Creator mode</span>
                <span className="bg-slate-700/50 rounded-sm px-2">Off</span>
              </div>
              <div className="text-sm text-slate-300">
                <span>
                  {
                    "Get discovered, showcase content on your profile, and get access to creator tools."
                  }
                </span>
              </div>
            </div>
          </div>
          <Divider mt={"mt-2"} />
          <div className="flex space-x-4 mt-2">
            <div className="flex-shrink-0 mt-3">
              <UsersIcon className="w-5 h-5 text-slate-300" />
            </div>
            <div className="min-w-0 flex-1 mt-2">
              <div className="text-sm font-medium text-slate-300">
                <span>My Network</span>
              </div>
              <div className="text-sm text-slate-300">
                <span>
                  {
                    "See and manage your connections and interests."
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
        <Divider />
        <div className="py-2 w-full cursor-pointer hover:bg-slate-500/30">
          <div className="flex items-center justify-center">
            <span className="text-white text-sm font-medium cursor-pointer flex items-center">
              Show all 5 resources <ArrowRightIcon className="w-4 h-4 ml-2"/>
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Resources;
