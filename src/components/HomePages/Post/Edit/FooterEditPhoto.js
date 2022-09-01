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
import { Tooltip } from "flowbite-react";
import classNames from "@/utils/classNames";
import useNotif from "@/hooks/useNotif";
import { axiosPost } from "@/utils/axiosInstance";
import useLoading from "@/hooks/useLoading";
import useAuth from "@/hooks/useAuth";
import useHeader from "@/hooks/useHeader";

const FooterEditPhoto = ({ setOpen, ...props }) => {
  /* State */
  const [file, setFile] = useState([]);
  /* End State */

  /* Hooks */
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  /* End Hooks */

  /* Action */
  const handleFile = useCallback(
    (e) => {
      const listFile = [];
      listFile.push(e.target.files);
      for (let i = 0; i < listFile.length; i++) {
        setFile([...file, listFile[0][i]]);
      }
    },
    [file]
  );
  /* End Action */

  /* useEffect */
  useEffect(() => {
    // setForm({ ...form, file });
    if (file.length > 0) {
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          form: {
            ...selector.form,
            file: file,
          },
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleFile]);

  /* End useEffect */

  return (
    <div className="w-full  border-t border-slate-600">
      <div className="mt-2 flex space-x-2">
        <div className="flex w-max ">
          <Tooltip content="Add a photo" placement="top">
            <label
              htmlFor="inputFile"
              className="cursor-pointer w-max inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
            >
              <span className="sr-only">
                Insert link
                <input
                  accept="image/*"
                  className="input"
                  id="inputFile"
                  multiple
                  type="file"
                  onChange={(e) => handleFile(e)}
                />
              </span>
              <PhotographIcon className="h-5 w-5" />
            </label>
          </Tooltip>
          <Tooltip content="Add a video" placement="top">
            <button
              type="button"
              className="w-max inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
            >
              <PlayIcon className="h-5 w-5" />
            </button>
          </Tooltip>
        </div>
        <div className="w-full flex items-center justify-end">
          <button
            onClick={() => {
              dispatchGlobal({
                type: "GLOBAL_STATE",
                payload: {
                  form: {
                    ...selector.form,
                    editPhoto: false,
                  },
                },
              });
            }}
            type="button"
            className="bg-indigo-600 hover:bg-indigo-700 w-max inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white sm:col-start-2 sm:text-sm"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterEditPhoto;
