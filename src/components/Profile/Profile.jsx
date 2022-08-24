import React, { useEffect, useState } from "react";
import { XIcon, PlusIcon, PencilIcon } from "@heroicons/react/outline";
import { MailIcon } from "@heroicons/react/solid";
import useAuth from "../../hooks/useAuth";
import { axiosPut } from "../../helper/axiosHelper";
import useHeader from "../../hooks/useHeader";
import useNotif from "../../hooks/useNotif";
import { useNavigate } from "react-router-dom";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileComp = ({
  tabs,
  user,
  userProfile,
  currentUser,
  team,
  setRefreshProfile,
}) => {
  const [follow, setFollow] = useState(false);
  const { dispatch, token } = useAuth();
  const { dispatch: dispatchNotif } = useNotif();
  const headers = useHeader(token);
  const navigate = useNavigate();

  useEffect(() => {
    setFollow(currentUser.followings.includes(user?._id));
  }, [currentUser.followings, user?._id]);

  const handleFollow = async () => {
    try {
      if (follow) {
        await axiosPut("/users/" + user._id + "/unfollow", null, headers);
        dispatch({ type: "UNFOLLOW", payload: user._id });
        setRefreshProfile(true);
      } else {
        await axiosPut("/users/" + user._id + "/follow", null, headers);
        dispatch({ type: "FOLLOW", payload: user._id });
        setRefreshProfile(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMessage = () => {
    if (!currentUser.followings.includes(user._id)) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Please connect with this user",
      });
    }
  };

  return (
    <>
      <article>
        {/* Profile header */}
        <div>
          <div>
            <img
              className="h-32 w-full object-cover lg:h-48"
              src={
                user.coverPicture
                  ? user.coverPicture
                  : "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              }
              alt=""
            />
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
              <div className="flex">
                <img
                  className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                  src={user.profilePicture}
                  referrerPolicy="no-referrer"
                  alt=""
                />
              </div>
              <div className="mt-6 sm:flex-1 sm:min-w-0 sm:flex sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                <div className="sm:hidden 2xl:block mt-6 min-w-0 flex-1">
                  <h1 className="text-2xl font-bold text-gray-900 truncate dark:text-white">
                    {user.firstname} {user.lastname}
                  </h1>
                  <small className="text-sm text-gray-600 dark:text-slate-400">
                    {userProfile.headLine
                      ? userProfile.headLine
                      : "No headline"}
                  </small>
                </div>
                {user._id === currentUser._id ? (
                  <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() => navigate("/settings")}
                      type="button"
                      className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                    >
                      <PencilIcon
                        className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                      <span>Edit</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <button
                        type="button"
                        onClick={handleFollow}
                        className={classNames(
                          !currentUser.followings.includes(user._id)
                            ? "bg-indigo-500"
                            : "bg-red-500",
                          "inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                        )}
                      >
                        {!currentUser.followings.includes(user._id) ? (
                          <>
                            <PlusIcon
                              className="-ml-1 mr-2 h-5 w-5 text-black"
                              aria-hidden="true"
                            />
                            <span>Connect</span>
                          </>
                        ) : (
                          <>
                            <XIcon
                              className="-ml-1 mr-2 h-5 w-5 text-black"
                              aria-hidden="true"
                            />
                            <span>Unconnect</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                      <button
                        onClick={handleMessage}
                        type="button"
                        className="inline-flex justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                      >
                        <MailIcon
                          className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                        <span>Message</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="hidden sm:block 2xl:hidden mt-6 min-w-0 flex-1">
              <h1 className="text-2xl font-bold text-gray-900 truncate dark:text-white">
                {user.firstname} {user.lastname}
              </h1>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 sm:mt-2 2xl:mt-5">
          <div className="border-b border-gray-200 dark:border-slate-600">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                {tabs.map((tab) => (
                  <a
                    key={tab.name}
                    href={tab.href}
                    className={classNames(
                      tab.current
                        ? "border-pink-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:hover:text-slate-500",
                      "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm dark:text-white"
                    )}
                    aria-current={tab.current ? "page" : undefined}
                  >
                    {tab.name}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Description list */}
        <div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                Connection
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-slate-400">
                {user.followers?.length + " Connection"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                Phone
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-slate-400">
                {user.phone ? user.phone : "-"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-slate-400">
                {user.email ? user.email : "-"}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                Address
              </dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-slate-400">
                {userProfile.country ? userProfile.country : "-"}
                {userProfile.city ? ", " + userProfile.city : ""}
              </dd>
            </div>

            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500 dark:text-white">
                About
              </dt>
              <dd
                className="mt-1 max-w-prose text-sm text-gray-900 space-y-5 dark:text-slate-400"
                dangerouslySetInnerHTML={{
                  __html: userProfile.about ? userProfile.about : "-",
                }}
              />
            </div>
          </dl>
        </div>

        {/* Team member list */}
        <div className="mt-8 max-w-5xl mx-auto px-4 pb-12 sm:px-6 lg:px-8">
          <h2 className="text-sm font-medium text-gray-500">Team members</h2>
          <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {team.map((person) => (
              <div
                key={person.handle}
                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500"
              >
                <div className="flex-shrink-0">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={person.imageUrl}
                    alt=""
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">
                      {person.name}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {person.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </>
  );
};

export default ProfileComp;
