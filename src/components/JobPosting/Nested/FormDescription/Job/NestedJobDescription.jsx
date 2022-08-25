import React, { useState } from "react";
import AddSkills from "./shared/AddSkills";
import Alert from "./shared/Alert";
import Select from "./shared/Select";
import Skills from "./shared/Skills";

import SlateTextEditor from "./shared/SlateTextEditor";

export default function NestedJobDescription() {
  const JsxCompanyBeforeClick = () => {
    const [open, setOpen] = useState(false);

    return (
      <div>
        <ul role="list" className="space-y-4">
          <div className="sm:rounded-md dark:shadow-slate-800">
            <div className="bg-white rounded-lg shadow dark:bg-slate-800">
              <div className="p-8 px-0">
                <div className="-mt-2 px-8">
                  <div className="text-left text-lg dark:text-white">
                    1 of 2: Tell us about the role
                  </div>
                </div>
                <div className="mt-4 relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300 dark:border-slate-700" />
                  </div>
                </div>
                <div className="px-8">
                  <div className="mt-6">
                    <small className="text-gray-400 font-medium">
                      * Indicates required
                    </small>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-lg dark:text-slate-300 font-medium">
                      Description *
                    </h2>
                  </div>
                  <Alert />
                  <div className="mt-6">
                    {/* Slate Text Editor */}
                    <SlateTextEditor />
                  </div>
                  <div className="mt-6">
                    <h2 className="text-lg dark:text-slate-300 font-medium">
                      Skills
                    </h2>
                    <p className="text-md dark:text-slate-400">
                      Add skill keywords to make your job more visible to the
                      right candidates.
                    </p>
                    <div className="mt-4">
                      <Skills setOpen={setOpen} />
                      <AddSkills
                        openModalSkills={open}
                        setOpenModalSkills={setOpen}
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <h2 className="text-lg dark:text-slate-300 font-medium">
                      How did you hear about Velkey jobs?
                    </h2>
                    <Select />
                  </div>
                </div>
                <div className="mt-4 relative">
                  <div
                    className="absolute inset-0 flex items-center"
                    aria-hidden="true"
                  >
                    <div className="w-full border-t border-gray-300 dark:border-slate-700" />
                  </div>
                </div>
                <div className="px-8">
                  <div className="mt-8 flex items-center justify-between">
                    <button
                      type="button"
                      className="inline-flex items-center px-3 py-2 shadow-sm text-sm leading-4 font-medium rounded-md text-blue-500 bg-transparent  hover:bg-slate-700 "
                    >
                      Preview
                    </button>

                    <div>
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 shadow-sm text-sm leading-4 font-medium rounded-md text-black dark:text-white bg-transparent hover:bg-slate-700 border dark:border-slate-500 "
                      >
                        Back
                      </button>
                      <button
                        type="button"
                        className="ml-2 inline-flex items-center px-3 py-2 shadow-sm text-sm leading-4 font-medium rounded-md text-black bg-blue-500 hover:bg-blue-800 "
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    );
  };
  return <JsxCompanyBeforeClick />;
}
