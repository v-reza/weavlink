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

const NewPost = ({ ...props }) => {
  const [file, setFile] = useState([]);
  const { selector, dispatch } = useGlobal();

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

  useEffect(() => {
    // setForm({ ...form, file });
    if (file.length > 0) {
      dispatch({
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

  const savePost = async () => {
    
    dispatch({
      type: "GLOBAL_STATE",
      payload: {
        ...selector,
        refreshTimeline: true,
      },
    });
  };

  return (
    <div className="w-full  border-t border-slate-600">
      <div className="mt-2 flex space-x-2">
        <div className="flex w-max ">
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
            onClick={() => savePost()}
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
