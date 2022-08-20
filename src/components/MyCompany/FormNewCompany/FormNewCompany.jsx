import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import useNotif from "../../../hooks/useNotif";
import { axiosPost } from "../../../helper/axiosHelper";
import useAuth from "../../../hooks/useAuth";
import useHeader from "../../../hooks/useHeader";
import useLoading from "../../../hooks/useLoading";

export default function FormNewCompany({ open, setOpen, setIsNewCompany }) {
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const { dispatch } = useNotif();
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch: loading } = useLoading();

  const handleSubmit = async () => {
    if (
      !companyEmail ||
      !companyName ||
      !companyPhone ||
      !companyAddress ||
      !companyDescription ||
      !companyWebsite
    ) {
      dispatch({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Please fill all required fields",
      });
      return;
    }

    try {
      loading({ type: "PROCESSING" });
      const data = {
        companyEmail: companyEmail,
        companyName: companyName,
        companyPhone: companyPhone,
        companyWebsite: companyWebsite,
        companyAddress: companyAddress,
        companyDescription: companyDescription,
      };
      await axiosPost("/company/new", data, headers)
        .then(() => {
          loading({ type: "FINISHED" });
          setIsNewCompany(true);
          dispatch({
            type: "NOTIF_SUCCESS",
            title: "Success",
            message: "Company has been created",
          });
          setOpen(false);
        })
        .catch(() => {
          loading({ type: "FINISHED" });
          dispatch({    
            type: "NOTIF_ERROR",
            title: "Error",
            message: "Something went wrong",
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
        onClose={setOpen}
      >
        <div className="flex xs:block items-end justify-center mt-10 xs:mt-14 min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block xs:inline-block  sm:h-screen"
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
            <div className="inline-block bg-white dark:bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg xs:w-full xs:h-max sm:w-full sm:p-6">
              <div>
                <h2 className="text-left text-md font-medium dark:text-white">
                  New Company
                </h2>
                <div className="text-center sm:mt-5">
                  <div>
                    <form action="#" className="mt-5">
                      <Tab.Group>
                        {({ selectedIndex }) => (
                          <>
                            <Tab.Panels className="mt-2">
                              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                <form
                                  className="space-y-6"
                                  action="#"
                                  method="POST"
                                >
                                  <div>
                                    <label
                                      htmlFor="email"
                                      className="block text-sm font-medium text-gray-700 text-left dark:text-slate-400"
                                    >
                                      Company Email*
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        value={companyEmail}
                                        onChange={(e) =>
                                          setCompanyEmail(e.target.value)
                                        }
                                        type="email"
                                        required
                                        className="appearance-none block w-full px-3 bg-transparent dark:text-white py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="companyname"
                                      className="block text-sm font-medium text-gray-700 text-left dark:text-slate-400"
                                    >
                                      Company Name*
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        value={companyName}
                                        onChange={(e) => {
                                          setCompanyName(e.target.value);
                                        }}
                                        type="text"
                                        required
                                        className="appearance-none block w-full bg-transparent dark:text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="companyPhone"
                                      className="block text-sm font-medium text-gray-700 text-left dark:text-slate-400"
                                    >
                                      Company Phone*
                                    </label>
                                    <div className="mt-1">
                                      <input
                                        value={companyPhone}
                                        onChange={(e) =>
                                          setCompanyPhone(e.target.value)
                                        }
                                        type="number"
                                        required
                                        className="appearance-none block w-full bg-transparent dark:text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="company-website"
                                      className="block text-sm font-medium text-gray-700 text-left dark:text-slate-400"
                                    >
                                      Company Website*
                                    </label>
                                    <div className="mt-1 flex rounded-md shadow-sm">
                                      <span className="inline-flex items-center px-3 bg-transparent dark:text-slate-500 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                        https://
                                      </span>
                                      <input
                                        value={companyWebsite}
                                        onChange={(e) =>
                                          setCompanyWebsite(e.target.value)
                                        }
                                        type="text"
                                        className="flex-1 min-w-0 block w-full px-3 py-2 bg-transparent dark:text-white rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                                        placeholder="www.example.com"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="companyaddress"
                                      className="block text-sm font-medium text-gray-700 dark:text-slate-400 text-left"
                                    >
                                      Company Address*
                                    </label>
                                    <div className="mt-1">
                                      <textarea
                                        value={companyAddress}
                                        onChange={(e) =>
                                          setCompanyAddress(e.target.value)
                                        }
                                        rows={3}
                                        required
                                        className="appearance-none block w-full px-3 bg-transparent dark:text-white py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <label
                                      htmlFor="companydescription"
                                      className="block text-sm font-medium text-gray-700 text-left dark:text-slate-400"
                                    >
                                      Company Description*
                                    </label>
                                    <div className="mt-1">
                                      <textarea
                                        value={companyDescription}
                                        onChange={(e) =>
                                          setCompanyDescription(e.target.value)
                                        }
                                        rows={3}
                                        required
                                        className="appearance-none block w-full bg-transparent dark:text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                      />
                                    </div>
                                  </div>
                                </form>
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
                  onClick={handleSubmit}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
                >
                  Submit
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
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
