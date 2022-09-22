/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import classNames from "@/utils/classNames";
import { axiosGet } from "@/utils/axiosInstance";
import useGlobal from "@/hooks/useGlobal";
import Card from "@/uiComponents/Card";
import { TrashIcon, XIcon } from "@heroicons/react/outline";
import Button from "@/uiComponents/Button";
import { Tooltip } from "flowbite-react";

const FormChatFile = ({ file, setFile }) => {
  console.log(file)
  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      {(file || []).map((files, index) => (
        <div key={index} className="relative">
          <div className="absolute top-0 right-0 pt-4 pr-4 mt-2">
            <Tooltip placement="top" content="Delete">
              <button
                type="button"
                className="bg-transparent rounded-md text-rose-500 hover:text-rose-600"
                onClick={() => {
                  const deleteFile = file.filter(
                    (item) => item.name !== files.name
                  );
                  setFile(deleteFile);
                }}
              >
                <span className="sr-only">Close</span>
                <TrashIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </Tooltip>
          </div>
          <img
            key={index}
            className="mb-2 select-none w-full h-auto"
            src={URL.createObjectURL(files)}
            alt=""
          />
        </div>
      ))}
    </div>
  );
};

export default FormChatFile;
