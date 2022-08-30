/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Container from "@/uiComponents/Container";
import Card from "@/uiComponents/Card";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Sidebar from "@/uiComponents/Sidebar";
import {
  HomeIcon,
  TrendingUpIcon,
  FireIcon,
  PhotographIcon,
  PlayIcon,
  CalendarIcon,
  ClipboardListIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import Button from "@/uiComponents/Button";
import classNames from "@/utils/classNames";
import PostFilter from "@/components/HomePages/PostFilter";
import { axiosGet } from "@/utils/axiosInstance";
import Timeline from "@/components/HomePages/Timeline/Timeline";
import useGlobal from "@/hooks/useGlobal";
import useNotif from "@/hooks/useNotif";
import InfiniteScroll from "react-infinite-scroll-component";
import { LinearProgress } from "@mui/material";
import Modal from "@/uiComponents/Modal";
import useUser from "@/hooks/useUser";
import Divider from "@/uiComponents/Divider";
import HomeSidebar from "@/components/HomePages/HomeSidebar";
import useHeader from "@/hooks/useHeader";
import HomeRightbar from "@/components/HomePages/HomeRightbar";
import { SkeletonProfile, SkeletonText } from "@/uiComponents/Skeleton";
const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Popular", href: "#", icon: FireIcon, current: false },
  { name: "Trending", href: "#", icon: TrendingUpIcon, current: false },
];

export default function Home() {
  const router = useRouter();
  const [isSSR, setIsSSR] = useState(false);
  const [open, setOpen] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [limit, setLimit] = useState(6);
  const [listFeeds, setListFeeds] = useState([]);
  const [showMoreMobile, setShowMoreMobile] = useState(false);

  /* Hooks */
  const { isAuthenticated, token } = useAuth();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { dispatch: dispatchNotif } = useNotif();
  const { user } = useUser();
  const headers = useHeader(token);

  /* Filter Post */
  const [recent, setRecent] = useState(true);
  const [mostLiked, setMostLiked] = useState(false);
  const [mostComments, setMostComments] = useState(false);
  const [hasMoreTimeline, setHasMoreTimeline] = useState(true);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
    setIsSSR(isAuthenticated);
  }),
    [isAuthenticated];

  useEffect(() => {
    const getTimeline = async () => {
      try {
        const res = await axiosGet(`/posts/timeline?limit=${limit}`);
        if (recent) {
          setTimeline(res.data.result);
        } else if (mostLiked) {
          setTimeline(
            res.data.result.sort((p1, p2) => {
              return p2.likes.length - p1.likes.length;
            })
          );
        } else if (mostComments) {
          setTimeline(
            res.data.result.sort((p1, p2) => {
              return p2.comments.length - p1.comments.length;
            })
          );
        }
        setHasMoreTimeline(res.data.hasMore);
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    };
    getTimeline();
    dispatchGlobal({
      type: "GLOBAL_STATE",
      payload: {
        ...selector,
        refreshTimeline: false,
      },
    });
  }, [recent, mostLiked, mostComments, limit, selector?.refreshTimeline]);

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axiosGet(`/userProfile/${user?._id}`);
      setUserProfile(res.data);
    };
    getUserProfile();
  }, [user?._id]);

  useEffect(() => {
    let onMounted = false;
    const getListFeeds = async () => {
      if (!onMounted) {
        const res = await axiosGet(`/users/listFriends/notFollow`, headers);
        setListFeeds(res.data);
      }
    };
    getListFeeds();
    return () => {
      onMounted = true;
    };
  }, [user?._id]);

  return (
    <>
      {isSSR && (
        <Container>
          <Container.Sidebar>
            <Sidebar lg={3} xl={3}>
              <HomeSidebar user={user} userProfile={userProfile} />
              <Card className="mt-4" usePx0={true}>
                <div className="px-4 py-2">
                  <div className="py-1">
                    <span className="text-blue-400 text-xs hover:underline cursor-pointer">
                      Groups
                    </span>
                  </div>
                  <div className="py-1">
                    <div className="flex items-center justify-between">
                      <span className="text-blue-400 text-xs hover:underline cursor-pointer">
                        Events
                      </span>
                      <PlusIcon className="w-4 h-4 text-slate-300 text-xs cursor-pointer" />
                    </div>
                  </div>
                  <div className="py-1">
                    <span className="text-blue-400 text-xs hover:underline cursor-pointer">
                      Followed Hashtags
                    </span>
                  </div>
                </div>
                <Divider mt={"mt-4"} />
                <div className="py-2 w-full cursor-pointer hover:bg-slate-500/30">
                  <div className="flex items-center justify-center">
                    <span className="text-white text-sm font-medium cursor-pointer">
                      Discover more
                    </span>
                  </div>
                </div>
              </Card>
            </Sidebar>
          </Container.Sidebar>
          <Container.Main>
            <HomeSidebar.Mobile
              user={user}
              userProfile={userProfile}
              setShowMore={setShowMoreMobile}
              showMore={showMoreMobile}
            />
            <Card padding={"4"}>
              <div className="flex items-center space-x-4">
                <img
                  src={
                    user?.profilePicture ? user.profilePicture : "/avatar.png"
                  }
                  className="ml-2 mt-1 w-10 h-10 rounded-full object-cover"
                  alt=""
                />
                <Button
                  bg="transparent"
                  border="true"
                  borderColor="slate-500"
                  mb="0"
                  py="2"
                  hoverBg="slate-700"
                  justify="start"
                  rounded="full"
                >
                  <span className="text-white text-sm font-medium">
                    Start a post
                  </span>
                </Button>
              </div>
              <div className="flex items-center justify-between mt-6">
                <div className="cursor-pointer hover:bg-slate-500/30 px-4 py-1.5 rounded-lg">
                  <div className="flex items-center cursor-pointer">
                    <PhotographIcon className="h-6 w-6 text-blue-500" />
                    <span className="hidden sm:block text-white ml-2 text-sm font-medium">
                      Photo
                    </span>
                  </div>
                </div>
                <div className="cursor-pointer hover:bg-slate-500/30 px-4 py-1 rounded-lg">
                  <div className="flex items-center cursor-pointer">
                    <PlayIcon className="h-6 w-6 text-green-500" />
                    <span className="hidden sm:block text-white ml-2 text-sm font-medium">
                      Video
                    </span>
                  </div>
                </div>
                <div className="cursor-pointer hover:bg-slate-500/30 px-4 py-1 rounded-lg">
                  <div className="flex items-center cursor-pointer">
                    <CalendarIcon className="h-6 w-6 text-amber-500" />
                    <span className="hidden sm:block text-white ml-2 text-sm font-medium">
                      Event
                    </span>
                  </div>
                </div>
                <div className="cursor-pointer hover:bg-slate-500/30 px-4 py-1 rounded-lg">
                  <div className="flex items-center cursor-pointer">
                    <ClipboardListIcon className="h-6 w-6 text-pink-500" />
                    <span className="hidden sm:block text-white ml-2 text-sm font-medium">
                      Write article
                    </span>
                  </div>
                </div>
              </div>
            </Card>
            <Modal open={open} setOpen={setOpen} />
            <PostFilter
              recent={recent}
              mostLiked={mostLiked}
              mostComments={mostComments}
              setRecent={setRecent}
              setMostLiked={setMostLiked}
              setMostComments={setMostComments}
            />
            <InfiniteScroll
              dataLength={timeline.length}
              next={() => setLimit((prev) => prev + 6)}
              hasMore={hasMoreTimeline}
              endMessage={
                <h1 className="text-md font-medium text-white">
                  Oops!. you has reached the last post
                </h1>
              }
              loader={<LinearProgress />}
            >
              {timeline.map((post) => (
                <Card key={post._id} className="mb-4">
                  <Timeline post={post} />
                </Card>
              ))}
            </InfiniteScroll>
          </Container.Main>
          <Container.Rightbar lg={3} xl={3}>
            <Card padding={4}>
              {listFeeds.length > 0 ? (
                <HomeRightbar listFeeds={listFeeds} />
              ) : (
                <div className="flex items-center">
                  <SkeletonProfile />
                  <div className="mt-4">
                    <SkeletonText />
                    <SkeletonText />
                  </div>
                </div>
              )}
            </Card>
          </Container.Rightbar>
        </Container>
      )}
    </>
  );
}
