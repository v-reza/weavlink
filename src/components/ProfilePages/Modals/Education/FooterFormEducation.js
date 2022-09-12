import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useHeader from "@/hooks/useHeader";
import useLoading from "@/hooks/useLoading";
import useNotif from "@/hooks/useNotif";
import { axiosPost } from "@/utils/axiosInstance";
import classNames from "@/utils/classNames";
import React from "react";

const FooterFormEducation = ({ setOpen }) => {
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { dispatch: dispatchLoading } = useLoading();
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch: dispatchNotif } = useNotif();
  const handleSaveEducation = async () => {
    try {
      const data = {
        education: selector?.educations?.education,
        startYears:
          selector?.educations?.startYears === "Years"
            ? null
            : selector?.educations?.startYears,
        endYears:
          selector?.educations?.endYears === "Years"
            ? null
            : selector?.educations?.endYears,
        startDate:
          selector?.educations?.startDate === "Month"
            ? null
            : selector?.educations?.startDate,
        endDate:
          selector?.educations?.endDate === "Month"
            ? null
            : selector?.educations?.endDate,
        degree: selector?.educations?.degree || null,
        fieldOfStudy: selector?.educations?.fieldOfStudy || null,
        grade: selector?.educations?.grade || null,
        activities: selector?.educations?.activities || null,
        description: selector?.educations?.description || null,
      };
      dispatchLoading({ type: "PROCESSING" });
      await axiosPost("/educations", data, headers).then(() => {
        dispatchLoading({ type: "FINISHED" });
        dispatchNotif({
          type: "NOTIF_SUCCESS",
          title: "Success",
          message: "Education has been added",
        });
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            educations: null,
            newEducations: true
          },
        });
        setOpen(false);
      });
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  };

  return (
    <div className="w-full  border-t border-slate-600">
      <div className="mt-2 flex space-x-2">
        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            onClick={() => handleSaveEducation()}
            disabled={selector.educations?.education ? false : true}
            className={classNames(
              selector.educations?.education
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

export default FooterFormEducation;
