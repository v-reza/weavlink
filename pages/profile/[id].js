/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useFolder from "@/hooks/useFolder";
import useUser from "@/hooks/useUser";
import Card from "@/uiComponents/Card";
import Container from "@/uiComponents/Container";
import { axiosGet } from "@/utils/axiosInstance";
import { PencilIcon } from "@heroicons/react/outline";
import { CameraIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import classNames from "@/utils/classNames";
import React, { useEffect, useState } from "react";

const Profile = (props) => {
  const { user, userProfile } = props;
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

  const isFoundCoverPicture = `bg-[url('${folder + user.coverPicture}')]`;

  return (
    <>
      {isSSR && (
        <Container>
          <Container.Main lg="8" xl="8">
            <ul role="list">
              <div className="overflow-hidden sm:rounded-md shadow-slate-800">
                <div className="rounded-lg shadow bg-slate-800">
                  <div
                    style={
                      user?.coverPicture
                        ? {
                            backgroundImage: `url(${
                              folder + user.coverPicture
                            })`,
                            backgroundSize: "contain",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }
                        : {
                            backgroundImage: `url('https://static-exp1.licdn.com/sc/h/lortj0v1h4bx9wlwbdx6zs3f')`,
                          }
                    }
                    className="p-16 relative cursor-pointer"
                  >
                    <div className="absolute right-0 top-0 m-4">
                      <div className="bg-slate-100 hover:bg-slate-200 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          data-supported-dps="16x16"
                          fill="currentColor"
                          className="mercado-match text-blue-500 hover:text-blue-600"
                          width="16"
                          height="16"
                          focusable="false"
                        >
                          <path d="M10 9a2 2 0 11-2-2 2 2 0 012 2zm5-2.5V14H1V6.5A2.5 2.5 0 013.5 4h.75L5 2h6l.75 2h.75A2.5 2.5 0 0115 6.5zM11 9a3 3 0 10-3 3 3 3 0 003-3z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="w-full flex items-center justify-start relative px-8">
                    <img
                      src={user?.profilePicture || "/avatar.png"}
                      className="w-36 h-36 rounded-full absolute border-2 border-slate-800 object-cover"
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                  </div>
                  <div className="flex items-center justify-end cursor-pointer p-2">
                    <div className="rounded-full hover:bg-slate-700/20 p-4">
                      <PencilIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="px-0 -mt-8">
                    <div className="px-8 py-8">
                      <div className="grid grid-cols-12">
                        <div className="col-span-6">
                          <div className="flex items-center justify-start mt-2">
                            <span className="text-white text-xl font-medium">
                              {user?.firstname + " " + user?.lastname}
                            </span>
                          </div>
                          <div className="flex items-center justify-start">
                            <span className="text-slate-300 text-md">
                              {userProfile?.headLine}
                            </span>
                          </div>
                          <div className="flex items-center justify-start">
                            <span className="text-gray-400 text-md">
                              {userProfile?.city || userProfile?.country ? (
                                <>
                                  {userProfile?.city +
                                    ", " +
                                    userProfile?.country}{" "}
                                  •
                                  <span className="text-blue-300 cursor-pointer hover:underline">
                                    {" "}
                                    Contact info
                                  </span>
                                </>
                              ) : (
                                <span className="text-gray-400 text-md">
                                  {user._id === currentUser._id ? (
                                    <>{"Add your location"}</>
                                  ) : (
                                    "Location not available"
                                  )}
                                </span>
                              )}
                            </span>
                          </div>
                          <div className="flex items-center justify-start">
                            <span className="text-blue-300 text-md cursor-pointer hover:underline">
                              {user?.followers?.length} connections
                            </span>
                          </div>
                        </div>
                        <div className="col-span-6 flex items-center justify-end mx-4">
                          <div className="grid grid-rows-3 grid-flow-col">
                            <div className="flex-shrink-0 row-span-3 space-y-2">
                              <div className="flex items-center space-x-2">
                                <img
                                  className="object-cover w-8 h-8"
                                  src="/avatar.png"
                                  alt=""
                                />
                                <span className="text-slate-300 font-medium text-sm">
                                  ICUBE by Sirclo
                                </span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <img
                                  className="object-cover w-8 h-8"
                                  src="/avatar.png"
                                  alt=""
                                />
                                <span className="text-slate-300 font-medium text-sm">
                                  SMKN 4 Malang
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ul>
          </Container.Main>
          <Container.Rightbar lg="4" xl="4">
            <Card>
              <Card></Card>
            </Card>
          </Container.Rightbar>
        </Container>
      )}
    </>
  );
};

export default Profile;

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
