import React from "react";

const Message = ({message}) => {
  return (
    <>
    <div className="bg-transparent p-3 hover:bg-slate-700/50 cursor-pointer">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="hover:underline text-sm font-medium text-slate-300"
            >
              Chelsea Hagon
            </a>
            <a
              href="#"
              className="hover:underline text-xs font-medium text-slate-400"
            >
              Sep 13
            </a>
          </div>
          <p className="text-xs text-slate-400">{message}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Message;
