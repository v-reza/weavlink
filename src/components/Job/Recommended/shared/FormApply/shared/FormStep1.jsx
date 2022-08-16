/* eslint-disable react-hooks/exhaustive-deps */
/* This example requires Tailwind CSS v2.0+ */
import { useCallback, useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import useAuth from "../../../../../../hooks/useAuth";
import { axiosGet } from "../../../../../../helper/axiosHelper";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormStep1({ form, setForm, setIsError }) {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const [email, setEmail] = useState(() => {
    return !form.email ? user.email : form.email;
  });
  const [alertEmail, setAlertEmail] = useState(false);
  const [phone, setPhone] = useState(() => {
    return !form.phone ? user.phone : form.phone;
  });
  const [alertPhone, setAlertPhone] = useState(false);
  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axiosGet("/userprofile/" + user._id);
      setUserProfile(res.data);
    };
    getUserProfile();
  }, [user._id]);

  const changeEmail = useCallback(
    (e) => {
      if (!/\S+@\S+\.\S+/.test(e.target.value)) {
        setIsError(true);
        setAlertEmail(true);
      } else {
        setAlertEmail(false);
      }
      setEmail(e.target.value);
    },
    [email]
  );

  const changePhone = useCallback(
    (e) => {
      if (!/^[0-9]{11,12}$/.test(e.target.value)) {
        setIsError(true);
        setAlertPhone(true);
      } else {
        setAlertPhone(false);
      }
      setPhone(e.target.value);
    },
    [phone]
  );

  useEffect(() => {
    if (!email) {
      setIsError(true);
      setAlertEmail(true);
      return;
    } else if (!phone) {
      setIsError(true);
      setAlertPhone(true);
      return;
    } else if (alertEmail || alertPhone) {
      setIsError(true);
      return;
    }
    setIsError(false);
    setForm({
      ...form,
      email: email,
      phone: phone,
    });
  }, [changeEmail, changePhone]);

  return (
    <div className="bg-transparent py-5">
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
            name="email"
            id="email"
            value={email}
            onChange={(e) => changeEmail(e)}
            className={classNames(
              alertEmail
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300",
              "block w-full pr-10 focus:outline-none  sm:text-sm rounded-md"
            )}
            placeholder="you@example.com"
            aria-invalid="true"
            aria-describedby="email-error"
          />
          {alertEmail && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {alertEmail && (
          <p className="text-left mt-1 text-xs text-red-600" id="email-error">
            Enter a valid email
          </p>
        )}
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
            value={phone}
            onChange={(e) => changePhone(e)}
            className={classNames(
              alertPhone
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300",
              "block w-full pr-10 focus:outline-none  sm:text-sm rounded-md"
            )}
            aria-invalid="true"
            aria-describedby="phone-error"
          />
          {alertPhone && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {alertPhone && (
          <p className="text-left mt-1 text-xs text-red-600" id="phone-error">
            Enter a valid phone number (11 - 12 digits)
          </p>
        )}
      </div>
    </div>
  );
}
