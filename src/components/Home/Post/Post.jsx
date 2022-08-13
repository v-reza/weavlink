/* eslint-disable jsx-a11y/no-redundant-roles */
import { LinearProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";

const Timeline = lazy(() => import("./Timeline/Timeline"));

const Post = ({
  postsTimeline,
  setIsNewPost,
  recent,
  mostLiked,
  mostComments,
}) => {
  
  return (
    <div className="mt-4">
      <h1 className="sr-only">Recent questions</h1>
      <ul role="list" className="space-y-4">
        <Suspense fallback={<LinearProgress />}>
          {postsTimeline.length > 0 ? (
            postsTimeline.map((post) => (
              <Timeline post={post} key={post._id} setIsNewPost={setIsNewPost} />
            ))
          ) : (
            <span className="flex items-center justify-center dark:text-white">
              {" "}
              Recent Post Not Found
            </span>
          )}
        </Suspense>
      </ul>
    </div>
  );
};

export default Post;
