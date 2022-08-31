import { Dialog, Tab, Transition } from "@headlessui/react";
import {
  AtSymbolIcon,
  CodeIcon,
  LinkIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { Fragment } from "react";
import classNames from "@/utils/classNames";

const Modal = ({ open, setOpen, title, children, ...props }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0" onClose={setOpen}>
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
            <div className="inline-block bg-slate-800 rounded-lg px-4 pt-5 pb-4 text-left shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg xs:w-full xs:h-max sm:w-full sm:p-6">
              <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4 mt-2">
                <button
                  type="button"
                  className="bg-transparent rounded-md text-gray-400 hover:text-gray-500"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close</span>
                  <XIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <Dialog.Title className="text-lg text-left px-4 text-white font-medium">
                {title}
              </Dialog.Title>
              <Dialog.Description>
                <br />
              </Dialog.Description>
              <div className="overflow-x-hidden h-full ">
                <div className="text-center sm:mt-2">
                  <div>
                    <form action="#" className="mt-5 h-80">
                      <Tab.Group>
                        {({ selectedIndex }) => (
                          <>
                            <Tab.Panels>
                              <Tab.Panel className="p-0.5 px-4 -m-0.5 rounded-lg">
                                {children}
                              </Tab.Panel>
                            </Tab.Panels>
                          </>
                        )}
                      </Tab.Group>
                    </form>
                  </div>
                </div>
              </div>
              {/* <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense"> */}
              <div className="w-full">
                <div className="flex items-center justify-end space-x-2">
                  <button
                    // onClick={handleSubmit}
                    type="button"
                    className="w-max inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
