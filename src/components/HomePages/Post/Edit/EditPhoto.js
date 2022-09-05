/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import Button from "@/uiComponents/Button";
import {
  ChevronDownIcon,
  GlobeIcon,
  PencilIcon,
  TrashIcon,
  XIcon,
} from "@heroicons/react/outline";
import { Carousel, Tooltip } from "flowbite-react";
import React, { useEffect, useState } from "react";

const FormNewPost = ({ user }) => {
  const [description, setDescription] = useState("");
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  

  return (
    <div className="space-y-6">
      <div>
        <div>
          {selector.form?.file.length > 0 ? (
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 relative">
              {(selector.form?.file || []).map((file, index) => (
                <div key={index} className="relative">
                  <div className="absolute top-0 right-0 pt-4 pr-4 mt-2">
                    <Tooltip placement="top" content="Delete">
                      <button
                        type="button"
                        className="bg-transparent rounded-md text-rose-500 hover:text-rose-600"
                        onClick={() => {
                          const deleteFile = selector.form?.file.filter((item) => item.name !== file.name)
                          dispatchGlobal({
                            type: "GLOBAL_STATE",
                            payload: {
                              form: {
                                ...selector.form,
                                file: deleteFile,
                              }
                            }
                          })
                        }}
                      >
                        <span className="sr-only">Close</span>
                        <TrashIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </Tooltip>
                  </div>
                  <img
                    className="select-none w-full h-auto mb-6"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                </div>
              ))}
            </div>
          ) : (
            <span className="flex items-center justify-center text-md font-medium text-slate-300">
              No Picture Selected
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormNewPost;