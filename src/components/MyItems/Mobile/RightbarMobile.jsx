/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { PlusSmIcon } from "@heroicons/react/solid";
import { useNavigate } from "react-router-dom";

const RightbarMobile = () => {
  const navigate = useNavigate();
  return (
    <section aria-labelledby="who-to-follow-heading">
      <div className="block lg:hidden xl:hidden bg-white rounded-lg shadow dark:bg-slate-800 mb-8">
        <div className="p-6">
          <div
            onClick={() => navigate("/job-posting")}
            className="flex items-center justify-center cursor-pointer w-full block text-center px-4 py-2 shadow-sm text-sm font-medium rounded-full border-2 border-blue-500 text-gray-700 bg-white hover:bg-gray-50 dark:bg-slate-800/90 dark:text-white dark:highlight-white/5 dark:hover:bg-slate-700"
          >
            <PlusSmIcon className="w-5 h-5 dark:text-slate-300" />
            <span className="text-sm dark:text-slate-300">Post a free job</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RightbarMobile;
