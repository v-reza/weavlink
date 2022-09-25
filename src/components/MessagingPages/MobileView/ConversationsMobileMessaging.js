import { DotsHorizontalIcon, PencilAltIcon } from "@heroicons/react/outline";
import { ArrowLeftIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import ConversationsMessaging from "../ConversationsMessaging";
import ConversationsSearchMessaging from "../ConversationsSearchMessaging";

const ConversationsMobileMessaging = () => {
  const [conversations, setConversations] = useState(false);
  return (
    <div className="h-[65rem] overflow-y-auto overflow-x-hidden block lg:hidden mt-2">
      {!conversations ? (
        <>
          <div className="px-3 py-2 border-b border-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-white text-md font-medium px-2">
                Messaging
              </span>
              <div className="flex items-center space-x-3">
                <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                  <DotsHorizontalIcon className="w-5 h-5" />
                </div>
                <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                  <PencilAltIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
          <ConversationsSearchMessaging />
          <ConversationsMessaging setConversations={setConversations} />
        </>
      ) : (
        <>
          <div className="px-3 py-2 border-b border-slate-600">
            <div className="flex items-center justify-between">
              <span className="text-white text-md font-medium px-2 flex items-center" onClick={() => setConversations(false)}>
                <ArrowLeftIcon className="w-5 h-5 mr-4"/>  Username
              </span>
              <div className="flex items-center space-x-3">
                <div className="hover:bg-slate-700 rounded-full p-2 text-white cursor-pointer">
                  <DotsHorizontalIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ConversationsMobileMessaging;
