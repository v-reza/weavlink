import React from "react";
import { XIcon } from "@heroicons/react/solid";
import { LightBulbIcon } from "@heroicons/react/outline";

const Alert = () => {
  return (
    <div className="mt-2">
      <div className="rounded-md bg-gray-400/50 dark:bg-gray-500/50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <LightBulbIcon
              className="h-5 w-5 text-amber-500"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium dark:text-slate-300">
              Create a high quality job post using our suggested guide below.{" "}
              <span className="hover:underline dark:text-slate-400 cursor-pointer">
                Learn more
              </span>
            </p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex bg-transparent rounded-md p-1.5 text-black dark:text-slate-300 focus:outline-none"
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
