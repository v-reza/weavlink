import Button from "@/uiComponents/Button";
import Card from "@/uiComponents/Card";
import Divider from "@/uiComponents/Divider";
import { ArrowRightIcon } from "@heroicons/react/solid";
import React from "react";

const Activity = ({ user }) => {
  return (
    <div className="mt-4">
      <Card usePx0={true}>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <span className="text-white text-md font-medium">Activity</span>
            <Button
              rounded="full"
              width="max"
              py="1"
              borderColor="blue-300"
              bg="transparent"
              hoverBg="slate-700"
            >
              <span className="text-blue-300 font-medium">Start a post</span>
            </Button>
          </div>
          <div className="text-blue-300 text-sm flex font-medium">
            {user?.followers.length} followers
          </div>
          <div className="flex space-x-4 mt-4">
            <div className="min-w-0 flex-1 ">
              <div className="text-sm font-medium text-slate-300">
                <span>{"You haven't posted lately"}</span>
              </div>
              <div className="text-sm text-slate-300">
                <span>
                  {
                    "Recent posts you share or comment on will be displayed here."
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
              Show all activity <ArrowRightIcon className="w-4 h-4 ml-2" />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Activity;
