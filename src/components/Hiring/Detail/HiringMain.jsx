import { PencilIcon } from "@heroicons/react/outline";
import React from "react";

const HiringMain = () => {
  return (
    <div>
      <ul role="list" className="space-y-4">
        <div className="overflow-hidden sm:rounded-md dark:shadow-slate-800">
          <div className="bg-white rounded-lg shadow dark:bg-slate-800">
            <div className="p-8">
              <div className="flex items-center justify-between">
                <span className="dark:text-white text-lg font-medium">
                  Job Detail
                </span>
                <button
                  type="button"
                  className="inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-transparent hover:bg-slate-600 hover:rounded-full"
                >
                  <PencilIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-4">
                <span className="dark:text-slate-400">
                  Tips: Provide a summary of the role, what success in the
                  position looks like, and how this role fits into the
                  organization overall.
                </span>
                <div className="mt-4">
                  <span className="dark:text-white">Industry</span>
                  <p className="dark:text-slate-400">Computer Software</p>
                </div>
                <div className="mt-4">
                  <span className="dark:text-white">Employment Type</span>
                  <p className="dark:text-slate-400">Full-time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default HiringMain;
