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
import { axiosPost, axiosPut } from "@/utils/axiosInstance";
import useLoading from "@/hooks/useLoading";
import useAuth from "@/hooks/useAuth";
import useHeader from "@/hooks/useHeader";
import useUser from "@/hooks/useUser";
import { useRouter } from "next/router";

const FooterProfileBox = ({ setOpen, form, ...props }) => {
  const {
    firstname,
    lastname,
    headline,
    education,
    city,
    country,
    industry,
    showEducation,
  } = form;

  const { handleError, handleSuccess } = useNotif();
  const { token, dispatch: dispatchAuth } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useUser();
  const router = useRouter()
  const handleSaveIntro = async () => {
    try {
      const data = {
        firstname,
        lastname,
        headLine: headline,
        education: showEducation ? education : null,
        city,
        country,
        industry,
      };
      
      await axiosPut("/userprofile", data, headers).then((res) => {
        handleSuccess("Profile updated");
        dispatchAuth({
          type: "SET_NEW_TOKEN",
          payload: res.data.token,
        });
        dispatch({
          type: "UPDATE_USER",
          payload: res.data.user,
        });
        setOpen(false);
        router.replace(router.asPath)
      });
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <div className="w-full  border-t border-slate-600">
      <div className="mt-2 flex space-x-2">
        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            onClick={() => handleSaveIntro()}
            disabled={
              firstname && lastname && education && city && country && industry
                ? false
                : true
            }
            className={classNames(
              firstname && lastname && education && city && country && industry
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

export default FooterProfileBox;
