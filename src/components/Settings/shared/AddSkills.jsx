import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import useAuth from "../../../hooks/useAuth";
import useHeader from "../../../hooks/useHeader";
import { axiosPost } from "../../../helper/axiosHelper";
import useNotif from "../../../hooks/useNotif";

export default function AddSkills({
  openModalSkills,
  setOpenModalSkills,
  setRefreshProfile,
  listSkills,
}) {
  const [skills, setSkills] = useState("");
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useNotif();

  const [listSkill, setListSkill] = useState([]);

  useEffect(() => {
    const skillObject = [];
    listSkills.skills?.map((skill) => {
      return skillObject.push(skill.toLowerCase());
    });
    setListSkill(skillObject);
  }, [listSkills.skills]);

  const handleSaveSkills = async () => {
    if (skills === "") {
      dispatch({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Please enter your skills",
      });
      return;
    } else if (listSkill.includes(skills.toLowerCase())) {
      dispatch({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Skill already exists",
      });
      return;
    }

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
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setOpenModalSkills}
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
                            <Tab.Panels className="mt-2">
                              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                <div className="relative border border-gray-300 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
                                  <label
                                    htmlFor="name"
                                    className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
                                  >
                                    Skill*
                                  </label>
                                  <input
                                    type="text"
                                    value={skills}
                                    onChange={(e) => setSkills(e.target.value)}
                                    className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
                                    placeholder="PHP / ReactJS / NodeJS / ExpressJS"
                                  />
                                </div>
                              </Tab.Panel>
                            </Tab.Panels>
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
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
                  onClick={handleSaveSkills}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpenModalSkills(false)}
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
