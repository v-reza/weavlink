import React from "react";
import {
  PlayIcon,
  PhotographIcon,
  DocumentIcon,
  BriefcaseIcon,
  ChartBarIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";

const NewPost = ({ ...props }) => {
  return (
    <div className="w-full  border-t border-slate-600">
      <div className="mt-2 flex space-x-2">
        <div className="flex w-max ">
          <button
            type="button"
            className="w-max inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
          >
            <PhotographIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-max inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
          >
            <PlayIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-max hidden sm:block inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
          >
            <DocumentIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-max hidden sm:block inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
          >
            <BriefcaseIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-max hidden sm:block inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
          >
            <ChartBarIcon className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="w-max inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
          >
            <DotsHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
        <div className="w-full flex items-center justify-end">
          <button
            
            type="button"
            className="w-max inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
