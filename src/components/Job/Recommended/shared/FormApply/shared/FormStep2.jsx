/* This example requires Tailwind CSS v2.0+ */
import { useEffect, useState } from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";
import useAuth from "../../../../../../hooks/useAuth";
import { axiosGet } from "../../../../../../helper/axiosHelper";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormStep2() {
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState({});
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axiosGet("/userprofile/" + user._id);
      setUserProfile(res.data);
    };
    getUserProfile();
  }, [user._id]);
  return (
    <div className="bg-transparent py-5">
      {/* Email */}
      <div className="mt-4">
        <label
          htmlFor="email"
          className="text-left block text-sm font-medium text-gray-700 dark:text-slate-300"
        >
          Emails Address*
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={classNames(
              !email
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300",
              "block w-full pr-10 focus:outline-none  sm:text-sm rounded-md"
            )}
            placeholder="you@example.com"
            aria-invalid="true"
            aria-describedby="email-error"
          />
          {!email && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {!email && (
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
            onChange={(e) => setPhone(e.target.value)}
            className={classNames(
              !phone
                ? "border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300",
              "block w-full pr-10 focus:outline-none  sm:text-sm rounded-md"
            )}
            placeholder="you@example.com"
            defaultValue="adamwathan"
            aria-invalid="true"
            aria-describedby="phone-error"
          />
          {!phone && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <ExclamationCircleIcon
                className="h-5 w-5 text-red-500"
                aria-hidden="true"
              />
            </div>
          )}
        </div>
        {!phone && (
          <p className="text-left mt-1 text-xs text-red-600" id="phone-error">
            Enter a valid phone number
          </p>
        )}
      </div>
    </div>
  );
}
