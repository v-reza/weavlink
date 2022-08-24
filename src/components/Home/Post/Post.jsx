/* eslint-disable jsx-a11y/no-redundant-roles */
import { LinearProgress } from "@mui/material";
import React, { lazy, Suspense } from "react";
import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const Timeline = lazy(() => import("./Timeline/Timeline"));

const Post = ({
  postsTimeline,
  setIsNewPost,
  recent,
  mostLiked,
  mostComments,
  setPostsTimeline,
  hasMore,
  limit,
  setLimit,
}) => {
  const fetchMoreData = () => {
    setLimit(limit + 6);
  };

  return (
    <div className="mt-4">
      <h1 className="sr-only">Recent questions</h1>
      <ul role="list" className="space-y-4">
        <Suspense fallback={<LinearProgress />}>
          {postsTimeline.length > 0 ? (
            <InfiniteScroll
              dataLength={postsTimeline.length}
              next={fetchMoreData}
              hasMore={hasMore}
              endMessage={
                <h1 className="text-md font-medium dark:text-white">
                  Oops!. you has reached the last post
                </h1>
              }
              loader={
                <h4 className="text-md font-medium dark:text-white">
                  Loading...
                </h4>
              }
            >
              {postsTimeline.map((post) => (
                <Timeline
                  post={post}
                  key={post._id}
                  setIsNewPost={setIsNewPost}
                />
              ))}
            </InfiniteScroll>
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
