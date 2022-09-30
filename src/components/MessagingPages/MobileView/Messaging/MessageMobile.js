/* eslint-disable @next/next/no-img-element */
import useFolder from "@/hooks/useFolder";
import useNotif from "@/hooks/useNotif";
import { SkeletonProfile, SkeletonText } from "@/uiComponents/Skeleton";
import { axiosGet } from "@/utils/axiosInstance";
import classNames from "@/utils/classNames";
import React, { useEffect, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { format } from "timeago.js";

const MessageMobile = ({ message, receiveUser, own }) => {
  const [user, setUser] = useState(null);
  const { handleError } = useNotif();
  const folder = useFolder();

  useEffect(() => {
    try {
      const getUser = async () => {
        const res = await axiosGet(`/users/${receiveUser}`);
        setUser(res.data);
      };
      getUser();
    } catch (error) {
      handleError(error.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveUser]);
  return (
    <div>
      {user ? (
        <div
          className={classNames(
            !own
              ? "flex flex-row-reverse bg-slate-600/40 rounded-md "
              : "flex ",
            "space-x-3 mt-4"
          )}
        >
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={user.profilePicture || "/avatar.png"}
              noreferrerpolicy="no-referrer"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <div
              className={classNames(
                !own
                  ? "flex flex-row-reverse mr-4 items-center justify-between"
                  : "flex items-center justify-between"
              )}
            >
              <a
                href="#"
                className="hover:underline text-sm font-medium text-slate-300"
              >
                {user.firstname + " " + user.lastname}
              </a>
              <a
                href="#"
                className="hover:underline text-xs font-medium text-slate-400"
              >
                {format(message.createdAt)}
              </a>
            </div>
            {message.images?.length > 0 && (
              <div className={classNames(
                !own ? "flex flex-row-reverse" : "flex",
                "space-y-2 m-2 flex-wrap")}>
                {message.images.map((image, index) => (
                  <LazyLoadImage
                    key={index}
                    alt="Images"
                    effect="blur"
                    className="w-56 h-auto"
                    src={folder + image}
                  />
                ))}
              </div>
            )}
            <div
              className={classNames(
                !own ? "flex flex-row-reverse mr-4" : "flex"
              )}
            >
              <p className="text-md font-medium text-slate-400">
                {message.text}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-2">
          <div className="flex items-center space-x-2">
            <SkeletonProfile />
            <div className="flex flex-col items-center mt-4">
              <SkeletonText />
              <SkeletonText />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageMobile;
