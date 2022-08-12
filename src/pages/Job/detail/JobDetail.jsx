/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-redundant-roles */
/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { Listbox, Menu, Transition } from "@headlessui/react";
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  CheckCircleIcon,
  CheckIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CurrencyDollarIcon,
  LocationMarkerIcon,
  MailIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { axiosPut } from "../../../helper/axiosHelper";
import PublishJob from "../../../components/Job/shared/PublishJob";
import useAuth from "../../../hooks/useAuth";
import useHeader from "../../../hooks/useHeader";
import useNotif from "../../../hooks/useNotif";

const tabs = [
  { name: "Applied", href: "#", count: "2", current: false },
  { name: "Phone Screening", href: "#", count: "4", current: false },
  { name: "Interview", href: "#", count: "6", current: true },
  { name: "Offer", href: "#", current: false },
  { name: "Disqualified", href: "#", current: false },
];
const candidates = [
  {
    name: "Emily Selman",
    email: "emilyselman@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    applied: "January 7, 2020",
    appliedDatetime: "2020-07-01T15:34:56",
    status: "Completed phone screening",
  },
  // More candidates...
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function JobDetail({
  jobDetail,
  setRedirectJobDetail,
  setJobDetail,
  setIsNewJob,
}) {
  const publishingOptions = [
    {
      id: 1,
      name: "Published",
      description: "This job posting can be viewed by anyone who has the link.",
      current: jobDetail.isActive ? true : false,
    },
    {
      id: 2,
      name: "Draft",
      description: "This job posting will no longer be publicly accessible.",
      current: jobDetail.isActive ? false : true,
    },
  ];
  const [selected, setSelected] = useState(
    jobDetail.isActive ? publishingOptions[0] : publishingOptions[1]
  );

  // useEffect(() => {
  //   setSelected
  // }, []);

  const [open, setOpen] = useState(false);
  const [cancel, setCancel] = useState(false);

  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useNotif();

  useEffect(() => {
    const modalPublishJob = () => {
      if (selected.id === 1 && selected.current === false) {
        setOpen(true);
      }
    };
    modalPublishJob();
  }, [selected]);
  console.log(jobDetail);

  useEffect(() => {
    if (cancel && selected.id === 1 && !selected.current) {
      setSelected(publishingOptions[1]);
    }
    setCancel(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cancel, selected]);

  useEffect(() => {
    const updateJobStatus = async () => {
      if (selected.id === 2 && !selected.current) {
        const data = {
          isActive: false,
        };
        await axiosPut("/jobs/" + jobDetail._id + "/draft", data, headers)
          .then((res) => {
            dispatch({
              type: "NOTIF_SUCCESS",
              title: "Success",
              message: "Successfully updated job status to draft",
            });
            setJobDetail(res.data);
            setIsNewJob(true);
          })
          .catch(() => {
            dispatch({
              type: "NOTIF_ERROR",
              title: "Error",
              message: "Failed to update job status to draft",
            });
          });
      }
    };
    updateJobStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      <PublishJob
        pagesDetail
        open={open}
        setOpen={setOpen}
        jobPublish={jobDetail}
        setIsNewJob={setIsNewJob}
        setJobPublish={setJobDetail}
        setCancel={setCancel}
        setJobDetail={setJobDetail}
      />
      <div className="min-h-full">
        {/* Navbar */}
        <div className="lg:pl-64 flex flex-col">
          {/* Page heading */}
          <header className="bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:flex xl:items-center xl:justify-between">
              <div className="flex-1 min-w-0">
                <nav className="flex" aria-label="Breadcrumb">
                  <ol role="list" className="flex items-center space-x-4">
                    <li
                      onClick={() => {
                        setJobDetail({});
                        setRedirectJobDetail(false);
                      }}
                    >
                      <div className="flex items-center">
                        <ChevronLeftIcon
                          className="cursor-pointer flex-shrink-0 h-5 w-5 text-gray-400  hover:text-gray-700"
                          aria-hidden="true"
                        />
                        <div className="cursor-pointer text-sm font-medium text-gray-500 hover:text-gray-700">
                          Back
                        </div>
                      </div>
                    </li>
                  </ol>
                </nav>
                <h1 className="mt-2 text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
                  {jobDetail.title}
                </h1>
                <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap sm:mt-0 sm:space-x-8">
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <BriefcaseIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {jobDetail.jobType}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <LocationMarkerIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {jobDetail.jobCondition}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <CurrencyDollarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    {/* $120k &ndash; $140k */}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(jobDetail.salary)}{" "}
                    {jobDetail.hiddenSalary && "(Salary is Hidden)"}
                  </div>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <CalendarIcon
                      className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Closing on {jobDetail.closed}
                  </div>
                </div>
              </div>
              <div className="mt-5 flex xl:mt-0 xl:ml-4">
                <span className="hidden sm:block">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500"
                  >
                    <PencilIcon
                      className="-ml-1 mr-2 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Edit
                  </button>
                </span>

                <span className="sm:ml-3 relative z-0">
                  <Listbox value={selected} onChange={setSelected}>
                    {({ open }) => (
                      <>
                        <Listbox.Label className="sr-only">
                          Change published status
                        </Listbox.Label>
                        <div className="relative">
                          <div className="inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                            <div className="relative z-0 inline-flex shadow-sm rounded-md divide-x divide-purple-600">
                              <div className="relative inline-flex items-center bg-purple-500 py-2 pl-3 pr-4 border border-transparent rounded-l-md shadow-sm text-white">
                                <CheckIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                                <p className="ml-2.5 text-sm font-medium">
                                  {selected.name}
                                </p>
                              </div>
                              <Listbox.Button className="relative inline-flex items-center bg-purple-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-purple-600 focus:outline-none focus:z-10 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-purple-500">
                                <span className="sr-only">
                                  Change published status
                                </span>
                                <ChevronDownIcon
                                  className="h-5 w-5 text-white"
                                  aria-hidden="true"
                                />
                              </Listbox.Button>
                            </div>
                          </div>

                          <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="origin-top-right absolute left-0 mt-2 -mr-1 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none sm:left-auto sm:right-0">
                              {publishingOptions.map((option) => (
                                <Listbox.Option
                                  onClick={() => {
                                    setSelected(option);
                                  }}
                                  key={option.name}
                                  className={({ active }) =>
                                    classNames(
                                      active
                                        ? "text-white bg-purple-500"
                                        : "text-gray-900",
                                      "cursor-default select-none relative p-4 text-sm"
                                    )
                                  }
                                  value={option}
                                >
                                  {({ selected, active }) => (
                                    <div className="flex flex-col">
                                      <div className="flex justify-between">
                                        <p
                                          className={
                                            selected
                                              ? "font-semibold"
                                              : "font-normal"
                                          }
                                        >
                                          {option.name}
                                        </p>
                                        {selected ? (
                                          <span
                                            className={
                                              active
                                                ? "text-white"
                                                : "text-purple-500"
                                            }
                                          >
                                            <CheckIcon
                                              className="h-5 w-5"
                                              aria-hidden="true"
                                            />
                                          </span>
                                        ) : null}
                                      </div>
                                      <p
                                        className={classNames(
                                          active
                                            ? "text-purple-200"
                                            : "text-gray-500",
                                          "mt-2"
                                        )}
                                      >
                                        {option.description}
                                      </p>
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </>
                    )}
                  </Listbox>
                </span>

                {/* Dropdown */}
                <Menu as="span" className="ml-3 relative sm:hidden">
                  <Menu.Button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500">
                    More
                    <ChevronDownIcon
                      className="-mr-1 ml-2 h-5 w-5 text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 -mr-1 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Edit
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </header>

          <main className="pt-8 pb-16">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="px-4 sm:px-0">
                <h2 className="text-lg font-medium text-gray-900">
                  Candidates
                </h2>

                {/* Tabs */}
                <div className="sm:hidden">
                  <label htmlFor="tabs" className="sr-only">
                    Select a tab
                  </label>
                  {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
                  <select
                    id="tabs"
                    name="tabs"
                    className="mt-4 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md"
                    defaultValue={tabs.find((tab) => tab.current).name}
                  >
                    {tabs.map((tab) => (
                      <option key={tab.name}>{tab.name}</option>
                    ))}
                  </select>
                </div>
                <div className="hidden sm:block">
                  <div className="border-b border-gray-200">
                    <nav
                      className="mt-2 -mb-px flex space-x-8"
                      aria-label="Tabs"
                    >
                      {tabs.map((tab) => (
                        <a
                          key={tab.name}
                          href={tab.href}
                          className={classNames(
                            tab.current
                              ? "border-purple-500 text-purple-600"
                              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200",
                            "whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm"
                          )}
                        >
                          {tab.name}
                          {tab.count ? (
                            <span
                              className={classNames(
                                tab.current
                                  ? "bg-purple-100 text-purple-600"
                                  : "bg-gray-100 text-gray-900",
                                "hidden ml-2 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block"
                              )}
                            >
                              {tab.count}
                            </span>
                          ) : null}
                        </a>
                      ))}
                    </nav>
                  </div>
                </div>
              </div>

              {/* Stacked list */}
              <ul
                role="list"
                className="mt-5 border-t border-gray-200 divide-y divide-gray-200 sm:mt-0 sm:border-t-0"
              >
                {candidates.map((candidate) => (
                  <li key={candidate.email}>
                    <div className="cursor-pointer group block">
                      <div className="flex items-center py-5 px-4 sm:py-6 sm:px-0">
                        <div className="min-w-0 flex-1 flex items-center">
                          <div className="flex-shrink-0">
                            <img
                              className="h-12 w-12 rounded-full group-hover:opacity-75"
                              src={candidate.imageUrl}
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                            <div>
                              <p className="text-sm font-medium text-purple-600 truncate">
                                {candidate.name}
                              </p>
                              <p className="mt-2 flex items-center text-sm text-gray-500">
                                <MailIcon
                                  className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="truncate">
                                  {candidate.email}
                                </span>
                              </p>
                            </div>
                            <div className="hidden md:block">
                              <div>
                                <p className="text-sm text-gray-900">
                                  Applied on{" "}
                                  <time dateTime={candidate.appliedDatetime}>
                                    {candidate.applied}
                                  </time>
                                </p>
                                <p className="mt-2 flex items-center text-sm text-gray-500">
                                  <CheckCircleIcon
                                    className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400"
                                    aria-hidden="true"
                                  />
                                  {candidate.status}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div>
                          <ChevronRightIcon
                            className="h-5 w-5 text-gray-400 group-hover:text-gray-700"
                            aria-hidden="true"
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Pagination */}
              <nav
                className="border-t border-gray-200 px-4 flex items-center justify-between sm:px-0"
                aria-label="Pagination"
              >
                <div className="-mt-px w-0 flex-1 flex">
                  <a
                    href="#"
                    className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
                  >
                    <ArrowNarrowLeftIcon
                      className="mr-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                    Previous
                  </a>
                </div>
                <div className="hidden md:-mt-px md:flex">
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  >
                    1
                  </a>
                  {/* Current: "border-purple-500 text-purple-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200" */}
                  <a
                    href="#"
                    className="border-purple-500 text-purple-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                    aria-current="page"
                  >
                    2
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  >
                    3
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  >
                    4
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  >
                    5
                  </a>
                  <a
                    href="#"
                    className="border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium"
                  >
                    6
                  </a>
                </div>
                <div className="-mt-px w-0 flex-1 flex justify-end">
                  <a
                    href="#"
                    className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-200"
                  >
                    Next
                    <ArrowNarrowRightIcon
                      className="ml-3 h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </nav>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
