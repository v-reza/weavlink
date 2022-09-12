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
  const { dispatch: dispatchNotif} = useNotif()
  const { dispatch: dispatchLoading } = useLoading()
  const { token } = useAuth()
  const headers = useHeader(token)
  const handleSaveSkills = async () => {
    try {
      dispatchLoading({type: "PROCESSING"})
      await axiosPost("/skills", {
        name: selector.skills.name,
      }, headers).then(() => {
        dispatchLoading({type: "FINISHED"})
        dispatchNotif({type: "NOTIF_SUCCESS", title: "Success", message: "Your skills has been saved"})
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            skills: null,
            newSkills: true
          },
        });
      });
      setOpen(false);
    } catch (err) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: err.message,
      })
    }
  }
  return (
    <div className="w-full  border-t border-slate-600">
      <div className="mt-2 flex space-x-2">
        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            onClick={() => handleSaveSkills()}
            disabled={selector.skills?.name ? false : true}
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
