/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useFolder from "@/hooks/useFolder";
import useUser from "@/hooks/useUser";
import Card from "@/uiComponents/Card";
import Container from "@/uiComponents/Container";
import { axiosGet } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import classNames from "@/utils/classNames";
import React, { useEffect, useState } from "react";
import { Tooltip } from "flowbite-react";
import Divider from "@/uiComponents/Divider";
import ProfileBox from "@/components/ProfilePages/ProfileBox";
import { gridCols } from "@/utils/types";
import { EyeIcon } from "@heroicons/react/outline";
import SuggestedForYou from "@/components/ProfilePages/SuggestedForYou";
import Analytics from "@/components/ProfilePages/Analytics";
import Resources from "@/components/ProfilePages/Resources";
import Activity from "@/components/ProfilePages/Activity";
import Experience from "@/components/ProfilePages/Experience";
import Education from "@/components/ProfilePages/Education";
import LicensesCertifications from "@/components/ProfilePages/LicensesCertifications";
import Skills from "@/components/ProfilePages/Skills";

const DetailSkills = (props) => {
  const { user, userProfile } = props;
  console.log(user)
  const { user: currentUser } = useUser();
  const [isSSR, setIsSSR] = useState(false);
  const folder = useFolder();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/home");
    }
    setIsSSR(isAuthenticated);
  }, [isAuthenticated, router]);

  return (
    <>
      {isSSR && (
        <Container>
          <Container.Main lg={gridCols.lg[8]} xl={gridCols.xl[8]}>
            <ProfileBox
              user={user}
              userProfile={userProfile}
              currentUser={currentUser}
            />
            {user._id === currentUser?._id && (
              <>
                <SuggestedForYou />
                <Analytics />
                <Resources />
              </>
            )}
            <Activity user={user} />
            <Experience user={user} />
            <Education user={user} />
            <LicensesCertifications user={user} />
            <Skills user={user} />
          </Container.Main>
          <Container.Rightbar lg={gridCols.lg[4]} xl={gridCols.xl[4]}>
            <Card>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 font-medium text-md hover:underline cursor-pointer">
                  Edit Public profile & URL
                </span>
                <Tooltip
                  placement="bottom"
                  content="See and edit how you look to people who are not signed in, and find you through search engines (ex: Google, Bing)."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    data-supported-dps="16x16"
                    fill="currentColor"
                    className="mercado-match text-slate-400"
                    width="16"
                    height="16"
                    focusable="false"
                  >
                    <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zm0 11.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zM8.82 9H7v-.95l.93-.46C8.64 7.24 9 6.89 9 6.6S8.57 6 8 6a6.49 6.49 0 00-3 .91V4.84A6.35 6.35 0 018.1 4c2 0 2.9 1 2.9 2.4 0 .9-.5 1.83-2.18 2.6z"></path>
                  </svg>
                </Tooltip>
              </div>
              <Divider mt={"mt-4"} mb={"mb-4"} />
              <div className="mt-4 flex items-center justify-between">
                <span className="text-slate-400 font-medium text-md mt-4 hover:underline cursor-pointer">
                  Add profile in another language
                </span>
                <Tooltip
                  placement="bottom"
                  content="Creating a profile in another language makes it easier for local business contacts and recruiters to find you on WeavLink."
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    data-supported-dps="16x16"
                    fill="currentColor"
                    className="mercado-match text-slate-400 mt-4"
                    width="16"
                    height="16"
                    focusable="false"
                  >
                    <path d="M8 1a7 7 0 107 7 7 7 0 00-7-7zm0 11.25A1.25 1.25 0 119.25 11 1.25 1.25 0 018 12.25zM8.82 9H7v-.95l.93-.46C8.64 7.24 9 6.89 9 6.6S8.57 6 8 6a6.49 6.49 0 00-3 .91V4.84A6.35 6.35 0 018.1 4c2 0 2.9 1 2.9 2.4 0 .9-.5 1.83-2.18 2.6z"></path>
                  </svg>
                </Tooltip>
              </div>
              {/* <Card></Card> */}
            </Card>
          </Container.Rightbar>
        </Container>
      )}
    </>
  );
};

export default DetailSkills;

export async function getServerSideProps(context) {
  const params = context.params;
  const userId = params.id.split("-").pop();
  try {
    const fetchUser = await axiosGet(`/users/${userId}`);

    const fetchUserProfile = await axiosGet(`/userprofile/${userId}`);

    const [dataUser, dataUserProfile] = await Promise.all([
      fetchUser,
      fetchUserProfile,
    ]);

    if (dataUser.data.username !== params.id) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user: dataUser.data,
        userProfile: dataUserProfile.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
