import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import Steps from "./Steps";
import FormStep1 from "./shared/FormStep1";
import FormStep2 from "./shared/FormStep2";

export default function FormApply({ open, setOpen }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({});
  const [isError, setIsError] = useState(false);
  console.log(form);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-hidden"
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
              <Steps step={step} />
              <div>
                <div className="text-center sm:mt-5">
                  <div>
                    <form action="#" className="mt-5">
                      <Tab.Group>
                        {({ selectedIndex }) => (
                          <>
                            <Tab.Panels className="mt-2">
                              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                {step === 1 && (
                                  <FormStep1
                                    form={form}
                                    setForm={setForm}
                                    setIsError={setIsError}
                                  />
                                )}
                                {step === 2 && (
                                  <FormStep2
                                    form={form}
                                    setForm={setForm}
                                    setIsError={setIsError}
                                  />
                                )}
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
                  onClick={() => {
                    !isError && setStep((step) => step + 1);
                  }}
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
                  //   onClick={handleSaveSkills}
                >
                  Next
                </button>
                {step === 2 || step === 3 ? (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setStep((step) => step - 1)}
                  >
                    Back
                  </button>
                ) : (
                  <button
                    type="button"
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                    onClick={() => setOpen(false)}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
