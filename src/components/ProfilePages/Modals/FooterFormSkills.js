import React, { useCallback, useEffect, useState } from "react";
import {
  PlayIcon,
  PhotographIcon,
  DocumentIcon,
  BriefcaseIcon,
  ChartBarIcon,
  DotsHorizontalIcon,
} from "@heroicons/react/outline";
import useGlobal from "@/hooks/useGlobal";
import { Progress, Tooltip } from "flowbite-react";
import classNames from "@/utils/classNames";
import useNotif from "@/hooks/useNotif";
import { axiosPost } from "@/utils/axiosInstance";
import useLoading from "@/hooks/useLoading";
import useAuth from "@/hooks/useAuth";
import useHeader from "@/hooks/useHeader";

const FooterFormSkills = ({ setOpen, ...props }) => {
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  console.log(selector);
  return (
    <div className="w-full  border-t border-slate-600">
      <div className="mt-2 flex space-x-2">
        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            disabled={!selector.skills?.name ? false : true}
            className={classNames(
              selector.skills?.name
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-slate-500/50 cursor-not-allowed",
              "cursor-pointer w-max inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white sm:col-start-2 sm:text-sm"
            )}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterFormSkills;
