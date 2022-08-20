import React from "react";
import Alert from "./shared/Alert";

export default function NestedJobDescription() {
  const JsxCompanyBeforeClick = () => {
    return (
      <div>
        <ul role="list" className="space-y-4">
          <div className="overflow-hidden sm:rounded-md dark:shadow-slate-800">
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
                    <h2 className="text-lg dark:text-slate-300">
                      Description *
                    </h2>
                  </div>
                  <Alert />
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
