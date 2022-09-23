import React, { useEffect, useState, Fragment } from "react";
import { Combobox } from "@headlessui/react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import classNames from "@/utils/classNames";
import { axiosGet } from "@/utils/axiosInstance";
import useGlobal from "@/hooks/useGlobal";
import Card from "@/uiComponents/Card";
import { PlusIcon, XIcon } from "@heroicons/react/outline";
import useNotif from "@/hooks/useNotif";

const FormProfileBox = ({ user, userProfile, currentUser }) => {
  /* Hooks */
  const { handleError } = useNotif();

  const [firstname, setFirstname] = useState(user?.firstname || "");
  const [lastname, setLastname] = useState(user?.lastname || "");
  const [headline, setHeadline] = useState(userProfile?.headLine || "");
  const [industry, setIndustry] = useState(userProfile?.industry || "");

  /* Education */
  const [listEducationProfile, setListEducationProfile] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState();
  const [showEducation, setShowEducation] = useState(true);

  useEffect(() => {
    const getMyEducations = async () => {
      try {
        const res = await axiosGet(`/educations/myEducations/${user?._id}`);
        setListEducationProfile(res.data.education);
        setSelectedEducation(res.data.education[0]);
      } catch (error) {
        handleError(error.message);
      }
    };
    getMyEducations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id]);

  /* Locations */
  const [query, setQuery] = useState("");
  const [listCountries, setListCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  useEffect(() => {
    const getListCountries = async (req, res) => {
      try {
        const res = await axiosGet(`/locations/all/countries?q=${query}`);
        setListCountries(res.data);
        // setSelectedCountry(res.data[0]);
      } catch (error) {
        handleError(error.message);
      }
    };
    getListCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  const filteredCountries =
    query === ""
      ? listCountries
      : listCountries.filter((item) =>
          item.country.toLowerCase().includes(query.toLowerCase())
        );
  console.log(selectedCountry);

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
      <div>
        <label className="block text-sm text-left font-medium text-slate-300">
          First name *
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
            className="shadow-sm focus:ring-indigo-500 bg-transparent focus:ring-0 text-slate-300 focus:border-gray-200 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-2">
        <label className="block text-sm text-left font-medium text-slate-300">
          Last name *
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            className="shadow-sm focus:ring-indigo-500 bg-transparent focus:ring-0 text-slate-300 focus:border-gray-200 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-2">
        <label className="block text-sm text-left font-medium text-slate-300">
          Headline *
        </label>
        <div className="mt-1">
          <input
            type="text"
            value={headline}
            onChange={(event) => setHeadline(event.target.value)}
            className="shadow-sm focus:ring-indigo-500 bg-transparent focus:ring-0 text-slate-300 focus:border-gray-200 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-lg text-left font-medium text-slate-300">
          Current Position
        </label>
        {userProfile?.currentPosition?.length === 0 && (
          <div className="mt-2">
            <div className="block text-sm text-left font-medium text-slate-300">
              <div className="flex px-2 rounded-md text-blue-500 hover:bg-slate-700 w-max cursor-pointer py-1">
                <PlusIcon className="w-5 h-5" /> Add new position
              </div>
            </div>
          </div>
        )}
        <div className="mt-6">
          <label className="block text-sm text-left font-medium text-slate-300">
            Industry *
          </label>
          <div className="mt-1">
            <input
              type="text"
              value={industry}
              onChange={(event) => setIndustry(event.target.value)}
              className="shadow-sm focus:ring-indigo-500 bg-transparent focus:ring-0 text-slate-300 focus:border-gray-200 block w-full sm:text-sm border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
        <label className="block text-lg text-left font-medium text-slate-300">
          Education
        </label>
        <div className="mt-2">
          <label className="block text-sm text-left font-medium text-slate-300">
            Education *
          </label>
          <div className="mt-1">
            <Listbox value={selectedEducation} onChange={setSelectedEducation}>
              {({ open }) => (
                <>
                  <div className="mt-1 relative">
                    <Listbox.Button className="bg-transparent text-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="block truncate">
                        {selectedEducation?.education}
                      </span>
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-slate-700 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {listEducationProfile.map((item) => (
                          <Listbox.Option
                            key={item._id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? "text-white bg-slate-800/50"
                                  : "text-slate-400",
                                "cursor-default text-left select-none relative py-2 pl-3 pr-9"
                              )
                            }
                            value={item}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={classNames(
                                    selected
                                      ? "font-semibold text-slate-300"
                                      : "font-normal",
                                    "block truncate"
                                  )}
                                >
                                  {item.education}
                                </span>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? "text-white" : "text-indigo-600",
                                      "absolute inset-y-0 right-0 flex items-center pr-4"
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
            <fieldset className="space-y-5">
              <legend className="sr-only">Show education in my intro</legend>
              <div className="relative flex items-center">
                <div className="flex items-center h-5">
                  <input
                    checked={showEducation}
                    id="checkedEducation"
                    onChange={(event) => setShowEducation(event.target.checked)}
                    type="checkbox"
                    className="bg-transparent h-7 w-7 text-indigo-600 border-gray-300 rounded"
                  />
                </div>
                <div className="ml-2 text-md">
                  <label
                    htmlFor="checkedEducation"
                    className="font-medium text-slate-300"
                  >
                    Show education in my intro
                  </label>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <label className="block text-lg text-left font-medium text-slate-300">
          Location
        </label>
        <div className="mt-2">
          <div className="mt-1">
            <Combobox
              as="div"
              value={selectedCountry}
              onChange={setSelectedCountry}
            >
              <Combobox.Label className="block text-sm font-medium text-slate-300 text-left">
                Country/Region *
              </Combobox.Label>
              <div className="relative mt-1">
                <Combobox.Input
                  className="w-full bg-transparent rounded-md border border-gray-300 text-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  onChange={(event) => {
                    setQuery(event.target.value);
                  }}
                  displayValue={(listCountries) => listCountries?.country}
                />

                <Combobox.Options className="absolute z-10 bg-slate-700 border border-slate-600 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                  {filteredCountries.length > 0 ? (
                    filteredCountries.map((item) => (
                      <Combobox.Option
                        key={item._id}
                        value={item}
                        className={({ active }) =>
                          classNames(
                            "relative cursor-pointer text-left select-none py-2 pl-8 pr-4",
                            active
                              ? "bg-slate-800/50 text-slate-300"
                              : "text-slate-200"
                          )
                        }
                      >
                        {({ active, selected }) => (
                          <>
                            <span
                              className={classNames(
                                "block truncate",
                                selected && "font-semibold"
                              )}
                            >
                              {item.country}
                            </span>

                            {selected && (
                              <span
                                className={classNames(
                                  "absolute inset-y-0 left-0 flex items-center pl-1.5",
                                  active ? "text-white" : "text-indigo-600"
                                )}
                              >
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </span>
                            )}
                          </>
                        )}
                      </Combobox.Option>
                    ))
                  ) : (
                    <Combobox.Option
                      className={({ active }) =>
                        classNames(
                          "relative cursor-default select-none py-2 pl-3 pr-9",
                          active ? "bg-indigo-600 text-white" : "text-gray-900"
                        )
                      }
                    >
                      {({ active, selected }) => (
                        <>
                          <div className="flex items-center">
                            <span
                              className={classNames(
                                "ml-3 truncate text-slate-200",
                                selected && "font-semibold"
                              )}
                            >
                              No results found
                            </span>
                          </div>
                        </>
                      )}
                    </Combobox.Option>
                  )}
                </Combobox.Options>
              </div>
            </Combobox>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormProfileBox;
