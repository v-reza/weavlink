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

const FooterNewPost = ({ setOpen, ...props }) => {
  /* State */
  const [file, setFile] = useState([]);
  const [progressBar, setProgressBar] = useState(0);
  // const [fileVideo , setFileVideo] = useState(null)
  /* End State */

  /* Hooks */
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { dispatch: dispatchNotif } = useNotif();
  const { dispatch: dispatchLoading } = useLoading();
  const { token } = useAuth();
  const headers = useHeader(token);
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

  const savePost = async () => {
    try {
      const data = {
        desc: selector.form?.description || "",
      };

      /* File Upload */
      const formData = new FormData();
      const fileNameList = [];
      if (selector.form?.file?.length > 0) {
        for (const key of Object.keys(selector.form?.file)) {
          const fileName =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const customFile = new File([selector.form?.file[key]], fileName, {
            type: selector.form?.file[key].type,
          });
          formData.append("images", customFile);
          fileNameList.push(
            fileName + "." + selector.form?.file[key].type.split("/")[1]
          );
        }
        /* Upload file & update new data */
        await axiosPost("/images/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (data) => {
            dispatchLoading({
              type: "WITHPROGRESSBAR",
              payload: {
                progressBar: Math.round((100 * data.loaded) / data.total),
              },
            })
          }
        });
        data.images = fileNameList;
      }

      dispatchLoading({
        type: "PROCESSING",
      });

      await axiosPost("/posts/newPost", data, headers).then(() => {
        dispatchLoading({ type: "FINISHED" });
        dispatchNotif({
          type: "NOTIF_SUCCESS",
          title: "Success",
          message: "Post created",
        });
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            ...selector,
            refreshTimeline: true,
          },
        });
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            form: null,
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

  /* End Action */

  /* useEffect */
  useEffect(() => {
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
            <label
              htmlFor="inputVideo"
              className="cursor-pointer w-max inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
            >
              <span className="sr-only">
                Insert link
                <input
                  accept=".mov,.mp4,.avi,.wmv,.flv,.mkv,.mpeg,.mpg,.3gp,.3g2,.m4v,.webm"
                  className="input"
                  id="inputVideo"
                  multiple
                  type="file"
                  onChange={(e) => handleFile(e)}
                />
              </span>
              <PlayIcon className="h-5 w-5" />
            </label>
          </Tooltip>
          <Tooltip content="Add a document" placement="top">
            <button
              type="button"
              className="w-max hidden sm:block inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
            >
              <DocumentIcon className="h-5 w-5" />
            </button>
          </Tooltip>
          <Tooltip content="Share that you're hiring" placement="top">
            <button
              type="button"
              className="w-max hidden sm:block inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
            >
              <BriefcaseIcon className="h-5 w-5" />
            </button>
          </Tooltip>
          <Tooltip content="Create a poll" placement="top">
            <button
              type="button"
              className="w-max hidden sm:block inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
            >
              <ChartBarIcon className="h-5 w-5" />
            </button>
          </Tooltip>
          <Tooltip content="Add to your post" placement="top">
            <button
              type="button"
              className="w-max inline-flex justify-center rounded-md border border-transparent px-4 py-2  text-base font-medium text-white hover:bg-slate-500/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
            >
              <DotsHorizontalIcon className="h-5 w-5" />
            </button>
          </Tooltip>
        </div>
        <div className="w-full flex items-center justify-end">
          <button
            onClick={() => savePost()}
            disabled={
              selector.form?.file?.length > 0 || selector.form?.description
                ? false
                : true
            }
            type="button"
            className={classNames(
              selector.form?.file?.length > 0 || selector.form?.description
                ? "bg-indigo-600 hover:bg-indigo-700"
                : "bg-slate-500/50 cursor-not-allowed",
              "w-max inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2  text-base font-medium text-white sm:col-start-2 sm:text-sm"
            )}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default FooterNewPost;
