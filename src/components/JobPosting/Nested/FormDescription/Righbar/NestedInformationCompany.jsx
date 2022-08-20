/* eslint-disable jsx-a11y/no-redundant-roles */
import React from "react";
import { ChatAltIcon } from "@heroicons/react/solid";
import { LightBulbIcon } from "@heroicons/react/outline";
const trendingPosts = [
  {
    id: 1,
    user: {
      name: "Floyd Miles",
      imageUrl:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    body: "What books do you have on your bookshelf just to look smarter than you actually are?",
    comments: 291,
  },
  // More posts...
];

export default function NestedInformationCompany() {
  return (
    <section aria-labelledby="trending-heading">
      <div className="bg-white rounded-lg shadow dark:bg-slate-800">
        <div className="p-6">
          <h2
            id="trending-heading"
            className="text-base font-medium text-gray-900 dark:text-white"
          >
            <LightBulbIcon className="h-6 w-6 text-green-500" />
          </h2>
          <div className="mt-4 flow-root">
            <ul role="list" className="-my-4 divide-y divide-gray-200">
              <li className="flex py-4 space-x-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-800 dark:text-slate-400">
                    <strong>Target your job to the right people</strong>
                    <br />
                    Include a job description and add required skills to target
                    job seekers who match your criteria.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
