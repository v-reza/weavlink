import React, { useEffect, useState, Fragment } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { Combobox, Transition, Listbox } from "@headlessui/react";
import classNames from "@/utils/classNames";
import { axiosGet } from "@/utils/axiosInstance";
import useGlobal from "@/hooks/useGlobal";
import { SelectorIcon } from "@heroicons/react/outline";
const date = [
  { id: 1, name: "Month" },
  { id: 2, name: "January" },
  { id: 3, name: "February" },
  { id: 4, name: "March" },
  { id: 5, name: "April" },
  { id: 6, name: "May" },
  { id: 7, name: "June" },
  { id: 8, name: "July" },
  { id: 9, name: "August" },
  { id: 10, name: "September" },
  { id: 11, name: "October" },
  { id: 12, name: "November" },
  { id: 13, name: "December" },
];

const FormEducation = () => {
  const [selectedStartDate, setSelectedStartDate] = useState(date[0]);
  const [selectedEndDate, setSelectedEndDate] = useState(date[0]);
  const [years, setYears] = useState([]);
  const [selectedStartYears, setSelectedStartYears] = useState();
  const [selectedEndYears, setSelectedEndYears] = useState();
  const [query, setQuery] = useState("");
  const [selectedEducations, setSelectedEducations] = useState(null);
  const [listEducations, setListEducations] = useState([]);
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  useEffect(() => {
    const getListEducations = async () => {
      const res = await axiosGet(`/educations/list?query=${query}`);
      setListEducations(res.data);
    };
    getListEducations();
  }, [query]);

  useEffect(() => {
    const getYears = () => {
      const currentYear = new Date().getFullYear();
      const yearsArr = [
        {
          name: "Years",
        },
      ];
      for (let i = 1922; i <= currentYear; i++) {
        yearsArr.push({ name: i });
      }
      setYears(yearsArr);
      setSelectedStartYears(yearsArr[0]);
      setSelectedEndYears(yearsArr[0]);
    };
    getYears();
  }, []);

  useEffect(() => {
    dispatchGlobal({
      type: "GLOBAL_STATE",
      payload: {
        educations: {
          ...selector.educations,
          education: selectedEducations?.name,
          startYears: selectedStartYears?.name,
          endYears: selectedEndYears?.name,
          startDate: selectedStartDate?.name,
          endDate: selectedEndDate?.name,
        },
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    selectedEducations,
    selectedStartYears,
    selectedEndYears,
    selectedStartDate,
    selectedEndDate,
  ]);

  const filteredEducations =
    query === ""
      ? listEducations
      : listEducations.filter((education) =>
          education?.name.toLowerCase().includes(query.toLowerCase())
        );

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
      <Combobox
        as="div"
        value={selectedEducations}
        onChange={setSelectedEducations}
      >
        <Combobox.Label className="block text-sm font-medium text-slate-300 text-left">
          School*
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full bg-transparent rounded-md border border-gray-300 text-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            displayValue={(listEducations) => listEducations?.name}
          />

          <Combobox.Options className="absolute z-10 bg-slate-700 border border-slate-600 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredEducations.length > 0 ? (
              filteredEducations.map((education) => (
                <Combobox.Option
                  key={education._id}
                  value={education}
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
                        {education.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 left-0 flex items-center pl-1.5",
                            active ? "text-white" : "text-indigo-600"
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
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
      <div className="mt-4">
        <label className="block text-sm text-left font-medium text-slate-300">
          Degree
        </label>
        <div className="mt-1">
          <input
            value={selector?.educations?.degree}
            onChange={(event) =>
              dispatchGlobal({
                type: "GLOBAL_STATE",
                payload: {
                  educations: {
                    ...selector.educations,
                    degree: event.target.value,
                  },
                },
              })
            }
            type="text"
            className="bg-transparent border border-gray-300 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Ex: Bachelor's"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm text-left font-medium text-slate-300">
          Field of study
        </label>
        <div className="mt-1">
          <input
            value={selector?.educations?.fieldOfStudy}
            onChange={(event) =>
              dispatchGlobal({
                type: "GLOBAL_STATE",
                payload: {
                  educations: {
                    ...selector.educations,
                    fieldOfStudy: event.target.value,
                  },
                },
              })
            }
            type="text"
            className="bg-transparent border border-gray-300 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Ex: Business"
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-6 gap-2">
        <div className="col-span-3">
          <Listbox value={selectedStartDate} onChange={setSelectedStartDate}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-slate-300 text-left">
                  Start date
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-transparent relative w-full border border-gray-300 text-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedStartDate.name}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-slate-400"
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
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-slate-800 border border-slate-600 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {date.map((date, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-slate-700/50"
                                : "text-slate-300",
                              "text-left cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={date}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {date.name}
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
        </div>
        <div className="col-span-3">
          <Listbox value={selectedStartYears} onChange={setSelectedStartYears}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-slate-300 text-left">
                  &nbsp;
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-transparent relative w-full border border-gray-300 text-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedStartYears?.name}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-slate-400"
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
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-slate-800 border border-slate-600 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {years.map((year, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-slate-700/50"
                                : "text-slate-300",
                              "text-left cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={year}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {year.name}
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
        </div>
      </div>
      <div className="mt-4 grid grid-cols-6 gap-2">
        <div className="col-span-3">
          <Listbox value={selectedEndDate} onChange={setSelectedEndDate}>
            {({ open }) => (
              <>
                <Listbox.Label className="block flex items-center text-sm font-medium text-slate-300 text-left">
                  End date <span className="hidden sm:block text-xs text-slate-400 ml-1">(or expected)</span>
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-transparent relative w-full border border-gray-300 text-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedEndDate.name}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-slate-400"
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
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-slate-800 border border-slate-600 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {date.map((date, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-slate-700/50"
                                : "text-slate-300",
                              "text-left cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={date}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {date.name}
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
        </div>
        <div className="col-span-3">
          <Listbox value={selectedEndYears} onChange={setSelectedEndYears}>
            {({ open }) => (
              <>
                <Listbox.Label className="block text-sm font-medium text-slate-300 text-left">
                  &nbsp;
                </Listbox.Label>
                <div className="mt-1 relative">
                  <Listbox.Button className="bg-transparent relative w-full border border-gray-300 text-white rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                    <span className="block truncate">
                      {selectedEndYears?.name}
                    </span>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <SelectorIcon
                        className="h-5 w-5 text-slate-400"
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
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-slate-800 border border-slate-600 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                      {years.map((year, index) => (
                        <Listbox.Option
                          key={index}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "text-white bg-slate-700/50"
                                : "text-slate-300",
                              "text-left cursor-default select-none relative py-2 pl-3 pr-9"
                            )
                          }
                          value={year}
                        >
                          {({ selected, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selected ? "font-semibold" : "font-normal",
                                  "block truncate"
                                )}
                              >
                                {year.name}
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
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm text-left font-medium text-slate-300">
          Grade
        </label>
        <div className="mt-1">
          <input
            value={selector?.educations?.grade}
            onChange={(e) => {
              dispatchGlobal({
                type: "GLOBAL_STATE",
                payload: {
                  educations: {
                    ...selector?.educations,
                    grade: e.target.value,
                  },
                },
              });
            }}
            type="text"
            className="bg-transparent border border-gray-300 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="mt-4">
        <label className="block text-sm text-left font-medium text-slate-300">
          Activities and societies
        </label>
        <div className="mt-1">
          <textarea
            value={selector?.educations?.activities}
            onChange={(e) => {
              dispatchGlobal({
                type: "GLOBAL_STATE",
                payload: {
                  educations: {
                    ...selector?.educations,
                    activities: e.target.value,
                  },
                },
              });
            }}
            rows={3}
            className="bg-transparent border border-gray-300 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
            placeholder="Ex: Bachelor's"
          />
        </div>
      </div>
      <div className="mt-4 mb-4">
        <label className="block text-sm text-left font-medium text-slate-300">
          Description
        </label>
        <div className="mt-1">
          <textarea
            value={selector?.educations?.description}
            onChange={(e) => {
              dispatchGlobal({
                type: "GLOBAL_STATE",
                payload: {
                  educations: {
                    ...selector?.educations,
                    description: e.target.value,
                  },
                },
              });
            }}
            rows={3}
            className="bg-transparent border border-gray-300 text-white shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default FormEducation;
