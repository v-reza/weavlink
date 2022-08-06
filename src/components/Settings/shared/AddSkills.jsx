import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import useAuth from "../../../hooks/useAuth";
import useHeader from "../../../hooks/useHeader";
import { axiosPost } from "../../../helper/axiosHelper";
import useNotif from "../../../hooks/useNotif";

export default function AddSkills({
  openModalSkills,
  setOpenModalSkills,
  setRefreshProfile,
}) {
  const [skills, setSkills] = useState("");
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useNotif();

  const handleSaveSkills = async () => {
    console.log("clicked");
    try {
      await axiosPost(
        "/userprofile/add/skills",
        {
          skills: skills,
        },
        headers
      ).then(() => {
        dispatch({
          type: "NOTIF_SUCCESS",
          title: "Success",
          message: "Skills added",
        });
        setRefreshProfile(true);
        setOpenModalSkills(false);
        setSkills("");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Transition.Root show={openModalSkills} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpenModalSkills}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="hidden fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity md:block" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-stretch md:items-center justify-center min-h-full text-center md:px-2 lg:px-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-4 md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="flex text-base text-left transform transition w-full md:max-w-2xl md:px-4 md:my-8 lg:max-w-4xl">
                <div className="w-full relative flex items-center bg-white px-4 pt-14 pb-8 overflow-hidden shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
                  <button
                    type="button"
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 sm:top-8 sm:right-6 md:top-6 md:right-6 lg:top-8 lg:right-8"
                    onClick={() => setOpenModalSkills(false)}
                  >
                    <span className="sr-only">Close</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="w-full bg-white overflow-hidden sm:rounded-lg">
                    <div className="px-4 py-5 sm:px-6">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Add new skills
                      </h3>
                    </div>
                    <div className="border-t border-gray-200">
                      <dl>
                        <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="mt-2 text-sm font-medium text-gray-500">
                            Skill*
                          </dt>
                          <dd className="text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <input
                              value={skills}
                              onChange={(e) => setSkills(e.target.value)}
                              type="text"
                              className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            />
                          </dd>
                        </div>
                        <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-1 sm:gap-4 sm:px-6">
                          <dd className="flex justify-end text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            <div className="ml-4 flex-shrink-0">
                              <button
                                onClick={() => setOpenModalSkills(false)}
                                type="button"
                                className="mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-black bg-grey-600 hover:bg-grey-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Close
                              </button>
                              <button
                                onClick={handleSaveSkills}
                                type="button"
                                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                              >
                                Add
                              </button>
                            </div>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
