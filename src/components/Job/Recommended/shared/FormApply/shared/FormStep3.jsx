/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import useAuth from "../../../../../../hooks/useAuth";
import { axiosGet } from "../../../../../../helper/axiosHelper";
import { isMobile, isDesktop, isAndroid } from "react-device-detect";
import fileDownload from "js-file-download";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormStep3({ form }) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axiosGet("/userprofile/" + user._id);
      setUserProfile(res.data);
    };
    getUserProfile();
  }, [user._id]);

  return (
    <div className="bg-transparent">
      <div className="flex space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={user.profilePicture}
            referrerPolicy="no-referrer"
            alt=""
          />
        </div>
        <div className="min-w-0">
          <p className="text-left text-sm text-gray-500">
            <span className="dark:text-slate-300">
              {user.firstname} {user.lastname} ({userProfile?.headLine})
            </span>
          </p>
          <p className="text-left text-xs text-gray-400">
            <span className="dark:text-slate-300">
              {userProfile?.country}
              {","}
              {userProfile?.city}
            </span>
          </p>
        </div>
      </div>
      {/* Email */}
      <div className="mt-4">
        <label
          htmlFor="email"
          className="text-left block text-sm font-medium text-gray-700 dark:text-slate-300"
        >
          Email Address*
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="email"
            value={form.email}
            disabled={true}
            onChange={() => {}}
            className="block w-full pr-10 focus:outline-none  sm:text-sm rounded-md cursor-not-allowed bg-gray-300"
            aria-describedby="email-error"
          />
        </div>
      </div>
      {/* Phone Number */}
      <div className="mt-4">
        <label
          htmlFor="phone"
          className="text-left block text-sm font-medium text-gray-700 dark:text-slate-300"
        >
          Phone Number*
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="number"
            value={form.phone}
            disabled={true}
            onChange={() => {}}
            className="block w-full pr-10 focus:outline-none  sm:text-sm rounded-md cursor-not-allowed bg-gray-300"
            aria-describedby="phone-error"
          />
        </div>
      </div>
      {/* File Resume */}
      {form.file && isDesktop ? (
        /* On Desktop */
        <div className="mt-4">
          <iframe
            src={URL.createObjectURL(form.file)}
            title="Resume"
            width="100%"
            height={200}
          />
        </div>
      ) : (form.file && isMobile) || isAndroid ? (
        /* On Mobile */
        <div className="mt-4 text-left">
          <span className="text-left text-sm dark:text-white">
            Preview PDF cannot show on mobile view
          </span>
          <div className="mt-2 flex items-start justify-start">
            <button
              onClick={() => fileDownload(form.file, "Resume.pdf")}
              type="button"
              className="inline-flex rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:col-start-2 sm:text-sm"
              //   onClick={handleSaveSkills}
            >
              Download PDF
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
