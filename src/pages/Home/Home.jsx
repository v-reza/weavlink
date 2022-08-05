import Sidebar from "../../components/Home/Sidebar/Sidebar";
import Post from "../../components/Home/Post/Post";
import Feeds from "../../components/Home/Feeds/Feeds";
import Follow from "../../components/Home/Rightbar/Follow";
import Trending from "../../components/Home/Rightbar/Trending";
import NewPost from "../../components/Home/Post/NewPost";
import { useEffect, useState } from "react";
import { axiosGet } from "../../helper/axiosHelper";

export default function Home() {
  const [openNewPost, setOpenNewPost] = useState(false);
  const [isNewPost, setIsNewPost] = useState(false);
  const [postsTimeline, setPostsTimeline] = useState([]);

  /* Get Post Timeline */
  useEffect(() => {
    const getPostTimeline = async () => {
      const res = await axiosGet("/posts/timeline");
      setPostsTimeline(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    getPostTimeline();
    setIsNewPost(false);
  }, [isNewPost]);
  return (
    <>
      <div className="min-h-full">
        <div className="py-10">
          <div className="max-w-3xl mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Sidebar */}
            <Sidebar />
            <main className="lg:col-span-9 xl:col-span-6">
              <Feeds setOpenNewPost={setOpenNewPost} />
              <NewPost
                open={openNewPost}
                setOpen={setOpenNewPost}
                setIsNewPost={setIsNewPost}
              />
              <Post postsTimeline={postsTimeline} setIsNewPost={setIsNewPost}/>
            </main>
            <aside className="hidden xl:block xl:col-span-4">
              <div className="sticky top-4 space-y-4">
                <Follow />
                <Trending />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
