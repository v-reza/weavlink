import useGlobal from "@/hooks/useGlobal";
import classNames from "@/utils/classNames";
import React from "react";

const FooterFormEducation = ({ setOpen }) => {
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  return (
    <div className="w-full  border-t border-slate-600">
      <div className="mt-2 flex space-x-2">
        <div className="w-full flex items-center justify-end">
          <button
            type="button"
            // onClick={() => handleSaveSkills()}
            disabled={selector.educations?.name ? false : true}
            className={classNames(
              selector.educations?.name
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
