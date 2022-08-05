import React, { Fragment, lazy, Suspense, useEffect, useState } from "react";
import { Switch } from "@headlessui/react";
import useAuth from "../../hooks/useAuth";
import { axiosGet, axiosPut } from "../../helper/axiosHelper";
import axios from "axios";
import Location from "./shared/Location";
import { LinearProgress } from "@mui/material";
import useHeader from "../../hooks/useHeader";
import useNotif from "../../hooks/useNotif";
const City = lazy(() => import("./shared/City"));

// const user = {
//   name: "Debbie Lewis",
//   handle: "deblewis",
//   email: "debbielewis@example.com",
//   imageUrl:
//     "https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=320&h=320&q=80",
// };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ProfileSettings = ({ user }) => {
  const [availableToHire, setAvailableToHire] = useState(true);
  const [privateAccount, setPrivateAccount] = useState(false);
  const [allowCommenting, setAllowCommenting] = useState(true);
  const [allowMentions, setAllowMentions] = useState(true);
  const [firstname, setFirstname] = useState(user.firstname);
  const [lastname, setLastname] = useState(user.lastname);
  const [username, setUsername] = useState(
    user.firstname + user.lastname + "-" + user._id
  );
  const [userProfile, setUserProfile] = useState([]);
  const [about, setAbout] = useState(userProfile?.about);
  const [headline, setHeadline] = useState(userProfile?.headLine);
  const [phone, setPhone] = useState(user.phone);
  const [listCountries, setListCountries] = useState([]);
  const [locationCountries, setLocationCountries] = useState(null);
  const [locationCities, setLocationCities] = useState(null);
  const [refreshProfile, setRefreshProfile] = useState(false);
  const { token, dispatch } = useAuth();
  const headers = useHeader(token);
  const { dispatch: dispatchNotif } = useNotif();

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axiosGet("/userprofile/" + user._id);
      setUserProfile(res.data);
    };
    getUserProfile();
    setRefreshProfile(false);
  }, [user._id, refreshProfile]);

  useEffect(() => {
    const getListCountries = async () => {
      const res = await axios.get(
        "https://countriesnow.space/api/v0.1/countries/positions"
      );
      setListCountries(res.data.data);
    };
    getListCountries();
  }, []);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    // if (firstname === "" || lastname === "" || username === "") {
    try {
      const res = await axiosPut(
        "/userprofile",
        {
          firstname: firstname,
          lastname: lastname,
          username: username,
          phone: phone,
          headLine: headline,
          about: about,
          country: locationCountries,
          city: locationCities,
        },
        headers
      );
      console.log(res.data)
      dispatch({
        type: "UPDATE_PROFILE_INFORMATION",
        payload: res.data,
      });
      dispatchNotif({
        type: "NOTIF_SUCCESS",
        title: "Success",
        message: "Profile updated successfully",
      });
      setRefreshProfile(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form
        className="divide-y divide-gray-200 lg:col-span-9"
        action="#"
        method="POST"
      >
        {/* Profile section */}
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row">
            <div className="flex-grow space-y-6">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <div className="mt-1 rounded-md shadow-sm flex">
                  <span className="bg-gray-50 border border-r-0 border-gray-300 rounded-l-md px-3 inline-flex items-center text-gray-500 sm:text-sm">
                    {window.location.origin.toString() + "/profile/"}
                  </span>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={username.replace(" ", "-").toLowerCase()}
                    onChange={(e) => setUsername(e.target.value)}
                    autoComplete="username"
                    className="focus:ring-sky-500 focus:border-sky-500 flex-grow block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                    // defaultValue={user.handle}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                    className="shadow-sm focus:ring-sky-500 focus:border-sky-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="mt-6 flex-grow lg:mt-0 lg:ml-6 lg:flex-grow-0 lg:flex-shrink-0">
              <p
                className="text-sm font-medium text-gray-700"
                aria-hidden="true"
              >
                Photo
              </p>
              <div className="mt-1 lg:hidden">
                <div className="flex items-center">
                  <div
                    className="flex-shrink-0 inline-block rounded-full overflow-hidden h-12 w-12"
                    aria-hidden="true"
                  >
                    <img
                      className="rounded-full h-full w-full"
                      src={user.profilePicture}
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                  </div>
                  <div className="ml-5 rounded-md shadow-sm">
                    <div className="group relative border border-gray-300 rounded-md py-2 px-3 flex items-center justify-center hover:bg-gray-50 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-sky-500">
                      <label
                        htmlFor="mobile-user-photo"
                        className="relative text-sm leading-4 font-medium text-gray-700 pointer-events-none"
                      >
                        <span>Change</span>
                        <span className="sr-only"> user photo</span>
                      </label>
                      <input
                        id="mobile-user-photo"
                        name="user-photo"
                        type="file"
                        className="absolute w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="hidden relative rounded-full overflow-hidden lg:block">
                <img
                  className="relative rounded-full w-40 h-40"
                  src={user.profilePicture}
                  referrerPolicy="no-referrer"
                  alt=""
                />
                <label
                  htmlFor="desktop-user-photo"
                  className="absolute inset-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center text-sm font-medium text-white opacity-0 hover:opacity-100 focus-within:opacity-100"
                >
                  <span>Change</span>
                  <span className="sr-only"> user photo</span>
                  <input
                    type="file"
                    id="desktop-user-photo"
                    name="user-photo"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer border-gray-300 rounded-md"
                  />
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700"
              >
                First name
              </label>
              <input
                type="text"
                name="first-name"
                id="first-name"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                autoComplete="given-name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700"
              >
                Last name
              </label>
              <input
                type="text"
                name="last-name"
                id="last-name"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                autoComplete="family-name"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="url"
                className="block text-sm font-medium text-gray-700"
              >
                Headline
              </label>
              <input
                type="text"
                name="url"
                id="url"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder={!headline && "Web Developer"}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>

            <div className="col-span-12 sm:col-span-6">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm"
              />
            </div>
          </div>
        </div>
        {/* Location section */}
        <div className="py-6 px-4 sm:p-6 lg:pb-8">
          <div>
            <h2 className="text-lg leading-6 font-medium text-gray-900">
              Location
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              This information will be displayed publicly so be careful what you
              share.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-12 gap-6">
            <Location
              countries={listCountries}
              setLocationCountries={setLocationCountries}
            />
            {locationCountries && (
              <Suspense fallback={<LinearProgress />}>
                <City
                  locationCountries={locationCountries}
                  setLocationCities={setLocationCities}
                />
              </Suspense>
            )}
          </div>
        </div>

        {/* Privacy section */}
        <div className="pt-6 divide-y divide-gray-200">
          <div className="px-4 sm:px-6">
            <div>
              <h2 className="text-lg leading-6 font-medium text-gray-900">
                Privacy
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Ornare eu a volutpat eget vulputate. Fringilla commodo amet.
              </p>
            </div>
            {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
            <ul role="list" className="mt-2 divide-y divide-gray-200">
              <Switch.Group
                as="li"
                className="py-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Available to hire
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-500">
                    Nulla amet tempus sit accumsan. Aliquet turpis sed sit
                    lacinia.
                  </Switch.Description>
                </div>
                <Switch
                  checked={availableToHire}
                  onChange={setAvailableToHire}
                  className={classNames(
                    availableToHire ? "bg-teal-500" : "bg-gray-200",
                    "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      availableToHire ? "translate-x-5" : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
              <Switch.Group
                as="li"
                className="py-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Make account private
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-500">
                    Pharetra morbi dui mi mattis tellus sollicitudin cursus
                    pharetra.
                  </Switch.Description>
                </div>
                <Switch
                  checked={privateAccount}
                  onChange={setPrivateAccount}
                  className={classNames(
                    privateAccount ? "bg-teal-500" : "bg-gray-200",
                    "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      privateAccount ? "translate-x-5" : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
              <Switch.Group
                as="li"
                className="py-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Allow commenting
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-500">
                    Integer amet, nunc hendrerit adipiscing nam. Elementum ame
                  </Switch.Description>
                </div>
                <Switch
                  checked={allowCommenting}
                  onChange={setAllowCommenting}
                  className={classNames(
                    allowCommenting ? "bg-teal-500" : "bg-gray-200",
                    "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      allowCommenting ? "translate-x-5" : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
              <Switch.Group
                as="li"
                className="py-4 flex items-center justify-between"
              >
                <div className="flex flex-col">
                  <Switch.Label
                    as="p"
                    className="text-sm font-medium text-gray-900"
                    passive
                  >
                    Allow mentions
                  </Switch.Label>
                  <Switch.Description className="text-sm text-gray-500">
                    Adipiscing est venenatis enim molestie commodo eu gravid
                  </Switch.Description>
                </div>
                <Switch
                  checked={allowMentions}
                  onChange={setAllowMentions}
                  className={classNames(
                    allowMentions ? "bg-teal-500" : "bg-gray-200",
                    "ml-4 relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      allowMentions ? "translate-x-5" : "translate-x-0",
                      "inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                    )}
                  />
                </Switch>
              </Switch.Group>
            </ul>
          </div>
          <div className="mt-4 py-4 px-4 flex justify-end sm:px-6">
            <button
              onClick={(e) => handleUpdateProfile(e)}
              type="button"
              className="ml-5 bg-sky-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ProfileSettings;
