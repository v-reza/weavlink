import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useHeader from "@/hooks/useHeader";
import useLoading from "@/hooks/useLoading";
import { axiosPost } from "@/utils/axiosInstance";
import { EmojiHappyIcon, PhotographIcon } from "@heroicons/react/outline";
import React, { useRef, useState } from "react";

const AddReplyComment = ({ comment }) => {
  const replyRef = useRef();
  const [messageReply, setMessageReply] = useState("");
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch: dispatchLoading } = useLoading();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const onEmojiClick = (event, emojiObject) => {
    const cursor = replyRef.current.selectionStart;
    const text =
      messageReply.slice(0, cursor) +
      emojiObject.emoji +
      messageReply.slice(cursor);
    setMessageReply(text);
  };

  const handleNewReply = async (e) => {
    if (e.key === "Enter") {
      dispatchLoading({ type: "PROCESSING" });
      const data = {
        text: messageReply,
      };
      await axiosPost(
        `/comments/reply/comments/${comment._id}`,
        data,
        headers
      ).then(() => {
        setMessageReply("");
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            ...selector,
            refreshTimeline: true,
          },
        });
        dispatchLoading({ type: "FINISHED" });
      });
    }
  };
  return (
    <div className="ml-6 p-2">
      <label htmlFor="reply" className="sr-only">
        Add your reply
      </label>
      <div className="flex">
        <div className="relative rounded-md shadow-sm w-full">
          <input
            ref={replyRef}
            value={messageReply}
            onChange={(e) => setMessageReply(e.target.value)}
            onKeyPress={(e) => handleNewReply(e)}
            type="text"
            className="bg-transparent text-slate-300 block w-full text-xs pr-10 sm:text-sm border-2 border-slate-600 rounded-full focus:outline-0 focus:border-slate-500 focus:ring-0"
            placeholder="Add a reply..."
          />

          <div className="absolute inset-y-0 right-0 pr-4 space-x-2 flex items-center cursor-pointer">
            <EmojiHappyIcon
              className="h-5 w-5 text-slate-300"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddReplyComment;
