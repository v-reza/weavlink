import { useNavigate } from "react-router-dom";
import { useState } from "react";
import WorkplaceType from "./shared/WorkplaceType";
import ListCompany from "./shared/ListCompany";
import JobType from "./shared/JobType";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormJobPosting() {
  return (
    <>
      <form className="mt-6 space-y-6" action="#" method="POST">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Job title
          </label>
          <div className="mt-1">
            <input
              type="text"
              required
              placeholder="Add the title you are hiring for"
              className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:bg-transparent dark:text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            My Company
          </label>
          <div className="mt-1">
            <ListCompany />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Workplace Type
          </label>
          <div className="mt-1">
            <WorkplaceType />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Job Location
          </label>
          <div className="mt-1">
            <textarea
              rows={3}
              required
              className="appearance-none block w-full bg-transparent dark:text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Job Type
          </label>
          <div className="mt-1">
            <JobType />
          </div>
        </div>

        <div>
          <button
            type="button"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Get Started for free
          </button>
        </div>
      </form>
    </>
  );
}
