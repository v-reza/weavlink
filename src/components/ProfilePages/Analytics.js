import Card from "@/uiComponents/Card";
import { SearchIcon } from "@heroicons/react/outline";
import { EyeIcon, UsersIcon } from "@heroicons/react/solid";
import React from "react";

const Analytics = () => {
  return (
    <div className="mt-4">
      <Card>
        <span className="text-white text-md font-medium">Analytics</span>
        <div className="text-slate-400 text-sm flex mt-2 font-medium">
          <EyeIcon className="h-5 w-5 mr-2" /> Private to you
        </div>
        <div className="sm:flex sm:items-center sm:space-x-12">
        <div className="flex space-x-3 mt-2">
          <div className="flex-shrink-0">
            <UsersIcon className="w-6 h-6 text-slate-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-slate-300">
              <span>
                0 profile views
              </span>
            </div>
            <div className="text-sm text-slate-300">
              <span>
                {"Discover who's viewed your profile."}
              </span>
            </div>
          </div>
        </div>
        <div className="flex space-x-3 mt-2">
          <div className="flex-shrink-0">
            <SearchIcon className="w-6 h-6 text-slate-300" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium text-slate-300">
              <span>
                0 search appearances
              </span>
            </div>
            <div className="text-sm text-slate-300">
              <span>
                {"See how often you appear in search results."}
              </span>
            </div>
          </div>
        </div>
        </div>
      </Card>
    </div>
  );
};

export default Analytics;
