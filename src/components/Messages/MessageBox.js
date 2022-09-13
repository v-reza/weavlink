/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { PencilAltIcon, ChevronUpIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";

const MessageBox = () => {
  const [isSSR, setIsSSR] = useState(false);
  const [open, setOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { user } = useUser();
  useEffect(() => {
    setIsSSR(isAuthenticated);
  }, [isAuthenticated]);
  return (
    <div>
      {isSSR && (
        <div
          className={`hidden sm:block ${
            !open && "cursor-pointer"
          } flex items-end justify-end fixed bottom-0 right-0 z-10`}
          onClick={() => !open && setOpen(true)}
        >
          <div>
            <div
              title="Chat"
              className={`block w-80 ${
                !open ? "h-12" : "h-[36rem] "
              } bg-slate-800 rounded-t-md shadow hover:shadow-lg transition-all duration-300 ease-in-out ${
                !open && "hover:bg-slate-700/50"
              } `}
            >
              <div
                className={`p-3 ${open && "hover:bg-slate-700/50 cursor-pointer"}`}
                onClick={() => open && setOpen(false)}
              >
                <div className="flex space-x-3">
                  <div className="flex-shrink-0">
                    <span className="inline-block relative">
                      <img
                        className="h-7 w-7 rounded-full"
                        src={user?.profilePicture || "/avatar.png"}
                        alt=""
                      />
                      <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-1 ring-black bg-green-400" />
                    </span>
                  </div>
                  <div className="min-w-0 flex-1 mt-1">
                    <p className="text-sm font-medium text-white">Messaging</p>
                  </div>
                  <div className="flex-shrink-0 self-center flex space-x-2">
                    <DotsHorizontalIcon className="w-4 h-4 text-white" />
                    <PencilAltIcon className="w-4 h-4 text-white" />
                    <ChevronUpIcon className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* <MessageBox open={open} setOpen={setOpen}/> */}
    </div>
  );
};

export default MessageBox;
