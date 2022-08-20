/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { PlusSmIcon } from "@heroicons/react/solid";
import useFolder from "../../../../../hooks/useFolder";
const whoToFollow = [
  {
    name: "Leonard Krasner",
    handle: "leonardkrasner",
    href: "#",
    imageUrl:
      "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  // More people...
];

export default function DetailCompanyRightbar() {
  const folder = useFolder();
  return (
    <section aria-labelledby="who-to-follow-heading">
      <div className="bg-white rounded-lg shadow dark:bg-slate-800">
        <div className="p-6">
          <div className="flow-root">
            <ul role="list" className="-my-4 divide-y divide-gray-200">
              <li className="flex items-center py-4 space-x-3">
                <div className="flex-shrink-0">
                  <div className="-mt-6">
                    <img
                      className="h-8 w-8 rounded-full"
                      src={folder + "/noCompany.png"}
                      alt=""
                    />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    <p>Company Name</p>
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Job Title
                  </p>
                  <p className="text-sm text-gray-500 dark:text-slate-400">
                    Kota Malang
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-0.5 rounded-full bg-rose-50 text-sm font-medium text-rose-700 hover:bg-rose-100"
                  >
                    <span>
                      Saved as <strong>Draft</strong>
                    </span>
                  </button>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
