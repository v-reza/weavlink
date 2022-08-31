/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import Button from "@/uiComponents/Button";
import { ChevronDownIcon, GlobeIcon } from "@heroicons/react/outline";
import { Carousel } from "flowbite-react";
import React, { useEffect, useState } from "react";

const FormNewPost = ({ user }) => {
  const [description, setDescription] = useState("");
  const { selector, dispatch } = useGlobal();
  const handleDescription = (e) => {
    setDescription(e.target.value);
    dispatch({
      type: "GLOBAL_STATE",
      payload: {
        form: {
          ...selector.form,
          description: e.target.value,
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div>
          <div className="flex cursor-pointer">
            <div className="flex-shrink-0">
              <img
                className="h-16 w-16 rounded-full"
                src={user?.profilePicture ? user.profilePicture : "/avatar.png"}
                referrerPolicy="no-referrer"
                alt=""
              />
            </div>
            <div className="min-w-0 ml-4 space-x-2">
              <div className="text-md font-medium text-slate-200 ">
                <p className="text-left truncate">
                  {user?.firstname} {user?.lastname}
                </p>
                <div className="text-sm text-slate-500 text-left">
                  <div className="mt-1">
                    <Button
                      hoverBg={"slate-700"}
                      width="max"
                      py="1"
                      rounded="xl"
                    >
                      <span className="flex items-center text-sm ">
                        <GlobeIcon className="mr-1 h-4 w-4" /> Anyone{" "}
                        <ChevronDownIcon className="ml-2 w-4 h-4" />
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-start justify-start">
            <textarea
              rows={5}
              name="comment"
              id="comment"
              value={description}
              onChange={(e) => handleDescription(e)}
              className="resize-none text-md focus:border-transparent focus:ring-0 focus:outline-none block w-full bg-transparent sm:text-sm text-slate-400 font-medium border-transparent"
              placeholder="What do you want to talk about?"
            />
          </div>
          {selector.form?.file && (
            <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
              <Carousel slideInterval={5000}>
                {(selector.form?.file || []).map((file, index) => (
                  <img
                    key={index}
                    className="w-full h-auto object-cover"
                    src={URL.createObjectURL(file)}
                    alt=""
                  />
                ))}
              </Carousel>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FormNewPost;
