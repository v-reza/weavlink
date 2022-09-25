import React from "react";

const ConversationsMessaging = ({ setConversations }) => {
  return (
    <div>
      <div className="bg-transparent p-3 hover:bg-slate-700/50 cursor-pointer" onClick={() => setConversations(true)}>
        <div className="flex space-x-3">
          <div className="flex-shrink-0">
            <span className="inline-block relative">
              <img
                className="h-10 w-10 rounded-full"
                src={"/avatar.png"}
                alt=""
              />
              <span className="absolute bottom-0 right-0 bg-gray-600 block h-2.5 w-2.5 rounded-full ring-1 ring-black " />
            </span>
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <a
                href="#"
                className="hover:underline text-sm font-medium text-slate-300 truncate"
              >
                Reza
              </a>

              <a
                href="#"
                className="hover:underline text-xs font-medium text-slate-400"
              >
                24 Sep
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationsMessaging;
