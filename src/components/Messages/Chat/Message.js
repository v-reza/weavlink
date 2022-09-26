/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import useNotif from "@/hooks/useNotif";
import { axiosGet } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import useFolder from "@/hooks/useFolder";

const Message = ({ message, receiveUser }) => {
  const [user, setUser] = useState(null);
  const { dispatch: dispatchNotif } = useNotif();
  const folder = useFolder()
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosGet(`/users/${receiveUser}`);
        setUser(res.data);
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    };
    getUser();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [receiveUser]);
  return (
    <>
      <div className="bg-transparent p-3 hover:bg-slate-700/50 cursor-pointer">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={user?.profilePicture || "/avatar.png"}
              noreferrerpolicy="no-referrer"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="hover:underline text-sm font-medium text-slate-300"
              >
                {user?.firstname && user?.lastname
                  ? user?.firstname + " " + user?.lastname
                  : "Loading..."}
              </a>
              <a
                href="#"
                className="hover:underline text-xs font-medium text-slate-400"
              >
                {format(message.createdAt)}
              </a>
            </div>
            {message.images?.length > 0 && (
              <div className="space-y-2">
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
            <p className="text-sm text-slate-400">{message.text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
