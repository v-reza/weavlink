/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import Button from "@/uiComponents/Button";
import {
  CalendarIcon,
  ClipboardListIcon,
  PhotographIcon,
  PlayIcon,
} from "@heroicons/react/outline";
import React from "react";

const HomeMainBox = ({ user, setOpen, ...props }) => {
  const { selector, dispatch: dispatchGlobal } = useGlobal()
  return (
    <>
      <div className="flex items-center space-x-4">
        <img
          src={user?.profilePicture ? user.profilePicture : "/avatar.png"}
          className="ml-2 mt-1 w-10 h-10 rounded-full object-cover"
          alt=""
        />
        <Button
          bg="transparent"
          border="true"
          borderColor="slate-500"
          mb="0"
          py="2"
          hoverBg="slate-700"
          justify="start"
          rounded="full"
          onClick={() => setOpen(true)}
        >
          <span className="text-white text-sm font-medium">Start a post</span>
        </Button>
      </div>
      <div className="flex items-center justify-between mt-6">
        <div
          className="cursor-pointer hover:bg-slate-500/30 px-4 py-1.5 rounded-lg"
          onClick={() => {
            setOpen(true);
            dispatchGlobal({
              type: "GLOBAL_STATE",
              payload: {
                ...selector,
                form: {
                  ...selector.form,
                  editPhoto: true
                }
              }
            })
          }}
        >
          <div className="flex items-center cursor-pointer">
            <PhotographIcon className="h-6 w-6 text-blue-500" />
            <span className="hidden sm:block text-white ml-2 text-sm font-medium">
              Photo
            </span>
          </div>
        </div>
        <div className="cursor-pointer hover:bg-slate-500/30 px-4 py-1 rounded-lg">
          <div className="flex items-center cursor-pointer">
            <PlayIcon className="h-6 w-6 text-green-500" />
            <span className="hidden sm:block text-white ml-2 text-sm font-medium">
              Video
            </span>
          </div>
        </div>
        <div className="cursor-pointer hover:bg-slate-500/30 px-4 py-1 rounded-lg">
          <div className="flex items-center cursor-pointer">
            <CalendarIcon className="h-6 w-6 text-amber-500" />
            <span className="hidden sm:block text-white ml-2 text-sm font-medium">
              Event
            </span>
          </div>
        </div>
        <div className="cursor-pointer hover:bg-slate-500/30 px-4 py-1 rounded-lg">
          <div className="flex items-center cursor-pointer">
            <ClipboardListIcon className="h-6 w-6 text-pink-500" />
            <span className="hidden sm:block text-white ml-2 text-sm font-medium">
              Write article
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeMainBox;
