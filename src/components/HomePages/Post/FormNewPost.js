import Button from "@/uiComponents/Button";
import { ChevronDownIcon, GlobeIcon } from "@heroicons/react/outline";
import React from "react";

const FormNewPost = ({ user }) => {
  return (
    <div className="space-y-6">
      <div>
        <div>
          <div className="flex cursor-pointer">
            <div className="flex-shrink-0">
              <img
                className="h-16 w-16 rounded-full"
                src={user?.profilePicture ? user.profilePicture : "/avatar.png"}
                referrerPolicy="no-referrer"
                alt=""
              />
            </div>
            <div className="min-w-0 ml-4 space-x-2">
              <div className="text-md font-medium text-slate-200 ">
                <p className="text-left truncate">
                  {user?.firstname} {user?.lastname}
                </p>
                <div className="text-sm text-slate-500 text-left">
                  <div className="mt-1">
                    <Button
                      hoverBg={"slate-700"}
                      width="max"
                      py="1"
                      rounded="xl"
                    >
                      <span className="flex items-center text-sm ">
                        <GlobeIcon className="mr-1 h-4 w-4" /> Anyone{" "}
                        <ChevronDownIcon className="ml-2 w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start justify-start">
            <textarea
              rows={5}
              name="comment"
              id="comment"
              className="resize-none text-md focus:border-transparent focus:ring-0 focus:outline-none block w-full bg-transparent sm:text-sm text-slate-400 font-medium border-transparent"
              placeholder="What do you want to talk about?"
              defaultValue={""}
            />
          </div>
          {/* <img className="w-full h-auto object-cover" src="/avatar.png" alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default FormNewPost;
