/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useHeader from "@/hooks/useHeader";
import useLoading from "@/hooks/useLoading";
import { axiosGet, axiosPost } from "@/utils/axiosInstance";
import {
  CheckIcon,
  EmojiHappyIcon,
  PhotographIcon,
} from "@heroicons/react/outline";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import classNames from "@/utils/classNames";
import useUser from "@/hooks/useUser";
import { Mention, MentionsInput } from "react-mentions";
// import defaultStyle from "./style/defaultStyle";
import classes from "./style/mentionsData.module.css";

const AddReplyComment = ({ comment }) => {
  /* Hooks */
  const replyRef = useRef();
  const messageRef = useRef();
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch: dispatchLoading } = useLoading();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { user } = useUser();
  /* End Hooks */

  /* State */
  const [messageReply, setMessageReply] = useState("");
  const [mentionsPeople, setMentionsPeople] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  /* End State */

  /* Action */
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
        setMentionsPeople("");
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

  const onChangeMentions = (event, newValue, newPlainTextValue, mentions) => {
    setMentionsPeople(event.target.value);
    setMessageReply(newPlainTextValue);
    // console.log("newValue", newValue);
    // console.log("newPlainTextValue", newPlainTextValue);
    // console.log("mentions", mentions);
  };

  /* End Action */

  /* useEffect */
  useEffect(() => {
    const getListUser = async () => {
      const res = await axiosGet("/users/listUsersMentions");
      setSuggestions(res.data.filter((item) => item.id !== user?._id));
      
    };
    getListUser();
  }, [user?._id]);

  /* End useEffect */
  return (
    <div className="ml-6 p-2">
      <label htmlFor="reply" className="sr-only">
        Add your reply
      </label>
      <div className="flex">
        <img
          src={user?.profilePicture ? user?.profilePicture : "/avatar.png"}
          className="w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1"
          alt=""
        />
        {/* <div
          onClick={() => {
            setOpenMentionsPeople(!openMentionsPeople);
          }}
          className="flex items-center justify-center text-md font-medium text-slate-400 cursor-pointer px-2 py-1 hover:bg-slate-700/50 mr-2  rounded-md"
        >
          @
        </div> */}
        <div className="focus:border-0 focus:ring-0 w-full text-xs text-slate-300">
          <MentionsInput
            value={mentionsPeople}
            onChange={onChangeMentions}
            markup="{{__display__}}"
            onKeyPress={(e) => handleNewReply(e)}
            className="mentions"
            classNames={classes}
            inputRef={messageRef}
            // style={defaultStyle}
            placeholder="Add a reply..."
            allowSuggestionsAboveCursor={true}
            allowSpaceInQuery={true}
            singleLine={true}
            displayTransform={(display) => `@${display}`}
          >
            <Mention
              trigger={"@"}
              data={suggestions}
              className={classes.mentions__mention}
              renderSuggestion={(suggestion, search, highlightedDisplay) => (
                <div className="flex ">
                  <div className="flex-shrink-0">
                    <img
                      src={suggestion.avatar}
                      className="w-6 h-6 rounded-full flex items-center justify-center mr-2 mt-1"
                      alt=""
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <div>{highlightedDisplay}</div>
                    <div>{suggestion.name}</div>
                  </div>
                </div>
              )}
              displayTransform={(display) =>
                `@${
                  suggestions.filter((item) => item.id === display)[0]?.display
                }`
              }
            />
          </MentionsInput>
        </div>
      </div>
    </div>
  );
};

export default AddReplyComment;
