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
} from "@heroicons/react/outline";
import Button from "@/uiComponents/Button";
import PostFilter from "@/components/HomePages/PostFilter";
import { axiosGet } from "@/utils/axiosInstance";
import Timeline from "@/components/HomePages/Timeline/Timeline";
import useGlobal from "@/hooks/useGlobal";
import useNotif from "@/hooks/useNotif";
import InfiniteScroll from "react-infinite-scroll-component";
import { LinearProgress } from "@mui/material";
import Modal from "@/uiComponents/Modal";
import useUser from "@/hooks/useUser";
import HomeSidebar from "@/components/HomePages/HomeSidebar";
import useHeader from "@/hooks/useHeader";
import HomeRightbar from "@/components/HomePages/HomeRightbar";
import { SkeletonProfile, SkeletonText } from "@/uiComponents/Skeleton";
import FormNewPost from "@/components/HomePages/Post/FormNewPost";
import FooterNewPost from "@/components/HomePages/Post/FooterNewPost";
import HomeMainBox from "@/components/HomePages/HomeMainBox";
import EditPhoto from "@/components/HomePages/Post/Edit/EditPhoto";
import FooterEditPhoto from "@/components/HomePages/Post/Edit/FooterEditPhoto";
import DotsLoader from "@/uiComponents/DotsLoader";
import { gridCols } from "@/utils/types";

export default function Home() {
  const router = useRouter();
  const [isSSR, setIsSSR] = useState(false);
  const [open, setOpen] = useState(false);
  const [timeline, setTimeline] = useState([]);
  const [limit, setLimit] = useState(6);
  const [listFeeds, setListFeeds] = useState([]);
  const [showMoreMobile, setShowMoreMobile] = useState(false);
  const [noFeedsFound, setNoFeedsFound] = useState(false);

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
      router.push("/home");
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
    if (selector.refreshTimeline === true) {
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          ...selector,
          refreshTimeline: false,
        },
      });
    }
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

  useEffect(() => {
    setTimeout(() => {
      if (listFeeds.length === 0) {
        setNoFeedsFound(true);
      }
    }, 2000);
  }, [listFeeds]);
  return (
    <>
      {isSSR && (
        <Container>
          <Container.Sidebar>
            <Sidebar lg={3} xl={3}>
              <HomeSidebar user={user} userProfile={userProfile} />
              <Card className="mt-4" usePx0={true}>
                <HomeSidebar.Group />
              </Card>
            </Sidebar>
          </Container.Sidebar>
          <Container.Main lg={gridCols.lg[9]} xl={gridCols.xl[6]}>
            <HomeSidebar.Mobile
              user={user}
              userProfile={userProfile}
              setShowMore={setShowMoreMobile}
              showMore={showMoreMobile}
            />
            <Card padding={"4"}>
              <HomeMainBox user={user} setOpen={setOpen} />
            </Card>
            <Modal
              open={open}
              setOpen={setOpen}
              title={"Create a Post"}
              footer={
                selector.form?.editPhoto ? (
                  <FooterEditPhoto />
                ) : (
                  <FooterNewPost setOpen={setOpen} />
                )
              }
            >
              {selector.form?.editPhoto ? (
                <EditPhoto />
              ) : (
                <FormNewPost user={user} />
              )}
            </Modal>
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
              loader={
                <DotsLoader
                  className="overflow-hidden flex items-center justify-center"
                  color="grey"
                />
              }
            >
              {timeline.map((post) => (
                <Card key={post._id} className="mb-4" overFlow="">
                  <Timeline post={post} />
                </Card>
              ))}
            </InfiniteScroll>
          </Container.Main>
          <Container.Rightbar lg={gridCols.lg[3]} xl={gridCols.xl[3]}>
            <div className="hidden lg:block xl:block">
              <Card padding={4}>
                {listFeeds.length > 0 ? (
                  <HomeRightbar listFeeds={listFeeds} />
                ) : !noFeedsFound ? (
                  <div className="flex items-center">
                    <SkeletonProfile />
                    <div className="mt-4">
                      <SkeletonText />
                      <SkeletonText />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center">
                    <h1 className="text-md font-medium text-white">
                      No feeds recommended for you
                    </h1>
                  </div>
                )}
              </Card>
            </div>
          </Container.Rightbar>
        </Container>
      )}
    </>
  );
}
