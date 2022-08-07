import React, { useEffect, useState } from "react";
import { axiosGet } from "../../../../helper/axiosHelper";
import { format as formatTime } from "timeago.js";
import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
const TimelineComment = ({ comment }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const getUserComments = async () => {
      try {
        const res = await axiosGet("/users/" + comment?.userId);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserComments();
  }, [comment?.userId]);

  const username = user?.firstname + user?.lastname + "-" + user?._id;

  return (
    <>
      <li key={comment._id} className="py-4">
        <div className="flex space-x-3">
          {!user?.profilePicture ? (
            <Skeleton variant="circular" width={40} height={40} />
          ) : (
            <img
              className="cursor-pointer h-6 w-6 rounded-full mt-2"
              src={user?.profilePicture}
              onClick={() =>
                navigate("/profile/" + username.replace(" ", "-").toLowerCase())
              }
              alt=""
              referrerPolicy="no-referrer"
            />
          )}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3
                className="text-sm font-medium cursor-pointer dark:text-white"
                onClick={() =>
                  navigate(
                    "/profile/" + username.replace(" ", "-").toLowerCase()
                  )
                }
              >
                {user?.firstname} {user?.lastname}
              </h3>
              <p className="text-sm text-gray-500">
                {/* {format(new Date(comment.createdAt), "MMM d, yyyy, kk:mm:ss")} */}
                {formatTime(comment.createdAt)}
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-slate-300">{comment.text}</p>
          </div>
        </div>
      </li>
    </>
  );
};

export default TimelineComment;
