/* eslint-disable jsx-a11y/no-redundant-roles */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { axiosPut } from "../../../helper/axiosHelper";
import useAuth from "../../../hooks/useAuth";
import useNotif from "../../../hooks/useNotif";
import useHeader from "../../../hooks/useHeader";
import { Switch } from "@headlessui/react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function PublishJob({
  open,
  setOpen,
  setIsNewJob,
  jobPublish,
  setJobPublish,
}) {
  const [enabled, setEnabled] = useState(false);
  const cancelButtonRef = useRef(null);
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useNotif();

  const handlePublish = async (jobId) => {
    try {
      const data = {
        hiddenSalary: enabled,
      };
      await axiosPut("/jobs/" + jobId + "/publish", data, headers)
        .then(() => {
          dispatch({
            type: "NOTIF_SUCCESS",
            title: "Success",
            message: enabled
              ? "Job is published and salary will be visible"
              : "Job is publisehd and salary will be hidden",
          });
          setIsNewJob(true);
          setOpen(false);
        })
        .catch(() => {
          dispatch({
            type: "NOTIF_ERROR",
            title: "Error",
            message: "Job has not been published",
          });
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="text-center sm:mt-5">
                  <div className="mt-2">
                    <form action="#">
                      <Tab.Group>
                        {({ selectedIndex }) => (
                          <>
                            <Tab.List className="flex items-center">
                              <Tab
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                                      : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                                    "px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                                  )
                                }
                              >
                                Publish Job
                              </Tab>
                            </Tab.List>
                            <Tab.Panels className="mt-6">
                              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                <Switch.Group
                                  as="div"
                                  className="flex items-center"
                                >
                                  <Switch
                                    checked={enabled}
                                    onChange={setEnabled}
                                    className={classNames(
                                      enabled ? "bg-indigo-600" : "bg-gray-200",
                                      "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    )}
                                  >
                                    <span
                                      aria-hidden="true"
                                      className={classNames(
                                        enabled
                                          ? "translate-x-5"
                                          : "translate-x-0",
                                        "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
                                      )}
                                    />
                                  </Switch>
                                  <Switch.Label as="span" className="ml-3">
                                    <span className="text-sm font-medium text-gray-900">
                                      Hidden Salary{" "}
                                    </span>
                                  </Switch.Label>
                                </Switch.Group>
                              </Tab.Panel>
                            </Tab.Panels>
                            <span className="text-sm text-gray-500 text-left">
                              If active the salary will be hidden, the
                              applicants will not be able to see the salary, but
                              the job will be visible. If not active the salary
                              will be visible.
                            </span>
                          </>
                        )}
                      </Tab.Group>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                  onClick={() => handlePublish(jobPublish._id)}
                >
                  Publish
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                    setJobPublish({});
                  }}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
