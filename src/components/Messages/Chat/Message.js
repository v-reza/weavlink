/* eslint-disable @next/next/no-img-element */
import { axiosGet } from "@/utils/axiosInstance";
import React, { useEffect, useState } from "react";
import { format } from "timeago.js";

const Message = ({ message, receiveUser }) => {
  const [user, setUser] = useState(null)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosGet(`/users/${receiveUser}`)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [receiveUser])
  return (
    <>
      <div className="bg-transparent p-3 hover:bg-slate-700/50 cursor-pointer">
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={user?.profilePicture || "/avatar.png"}
              noReferrerPolicy="no-referrer"
              alt=""
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="hover:underline text-sm font-medium text-slate-300"
              >
                {user?.firstname && user?.lastname ? user?.firstname + " " + user?.lastname : "Loading..."}
              </a>
              <a
                href="#"
                className="hover:underline text-xs font-medium text-slate-400"
              >
                {format(message.createdAt)}
              </a>
            </div>
            <p className="text-xs text-slate-400">{message.text}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;
