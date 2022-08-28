/* eslint-disable react-hooks/exhaustive-deps */
import Container from "@/uiComponents/Container";
import Card from "@/uiComponents/Card";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import Sidebar from "@/uiComponents/Sidebar";
import { HomeIcon, TrendingUpIcon, FireIcon } from "@heroicons/react/outline";
import Button from "@/uiComponents/Button";
import classNames from "@/utils/classNames";
import PostFilter from "@/components/PostFilter/PostFilter";
import { axiosGet } from "@/utils/axiosInstance";
import Timeline from "@/components/Timeline/Timeline";
import useGlobal from "@/hooks/useGlobal";
import useNotif from "@/hooks/useNotif";
import {
  SkeletonDescription,
  SkeletonImage,
  SkeletonProfile,
  SkeletonText,
} from "@/uiComponents/Skeleton";
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
  const [limit, setLimit] = useState(10);

  /* Hooks */
  const { isAuthenticated } = useAuth();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { dispatch: dispatchNotif } = useNotif();

  /* Filter Post */
  const [recent, setRecent] = useState(true);
  const [mostLiked, setMostLiked] = useState(false);
  const [mostComments, setMostComments] = useState(false);
  const [hasMoreTimeline, setHasMoreTimeline] = useState(true);

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

  return (
    <>
      {isSSR && (
        <Container>
          <Container.Sidebar>
            <Sidebar>
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-slate-700"
                      : "text-white hover:bg-slate-700",
                    "group flex items-center px-3 py-2 text-sm font-medium rounded-md text-white"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  <item.icon
                    className={classNames(
                      "flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate">{item.name}</span>
                </a>
              ))}
            </Sidebar>
          </Container.Sidebar>
          <Container.Main>
            <Button
              bg="indigo-500"
              hoverBg="indigo-600"
              onClick={() => setOpen(true)}
            >
              <span className="text-white">New Post</span>
            </Button>
            <PostFilter
              recent={recent}
              mostLiked={mostLiked}
              mostComments={mostComments}
              setRecent={setRecent}
              setMostLiked={setMostLiked}
              setMostComments={setMostComments}
            />

            {timeline.map((post) => (
              <Card key={post._id} className="mb-4">
                <Timeline post={post} />
              </Card>
            ))}
          </Container.Main>
          <Container.Rightbar>Ini Rightbar</Container.Rightbar>
        </Container>
      )}
    </>
  );
}
