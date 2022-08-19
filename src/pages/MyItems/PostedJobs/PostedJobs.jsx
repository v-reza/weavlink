import React from "react";
import PostedJob from "../../../components/MyItems/PostedJobs/PostedJob";
import Rightbar from "../../../components/MyItems/Rightbar/Rightbar";
import Sidebar from "../../../components/MyItems/Sidebar/Sidebar";

const PostedJobs = () => {
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-4xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-6">
            <Sidebar />
            <main className="lg:col-span-9 xl:col-span-6">
              <PostedJob />
            </main>
            <aside className="hidden xl:block xl:col-span-4">
              <div className="top-4 space-y-4">
                <Rightbar />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default PostedJobs;
