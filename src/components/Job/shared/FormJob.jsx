import React from "react";

const FormJob = () => {
  return (
    <>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="jobtitle"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Job Title*
        </label>
        <input
          type="text"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        />
      </div>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="jobdesc"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Job Description*
        </label>
        <textarea
          rows={4}
          type="text"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        />
      </div>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="joblocation"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Job Location*
        </label>
        <textarea
          rows={3}
          type="text"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        />
      </div>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="salary"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Salary Rp*
        </label>
        <input
          type="number"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="8.000.000"
        />
      </div>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Job Type*
        </label>
        <select className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
          <option
            value="default"
            selected
            className="cursor-default select-none relative py-2 pl-3 pr-9"
          >
            Select a job type
          </option>
          <option
            value="Full Time"
            className="cursor-default select-none relative py-2 pl-3 pr-9"
          >
            Full Time
          </option>
          <option
            value="Part Time"
            className="cursor-default select-none relative py-2 pl-3 pr-9"
          >
            Part Time
          </option>
        </select>
      </div>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="jobcondition"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Job Condition*
        </label>
        <select className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm">
          <option
            value="default"
            selected
            className="cursor-default select-none relative py-2 pl-3 pr-9"
          >
            Select a job condition
          </option>
          <option
            value="Remote"
            className="cursor-default select-none relative py-2 pl-3 pr-9"
          >
            Remote
          </option>
          <option
            value="Work from office"
            className="cursor-default select-none relative py-2 pl-3 pr-9"
          >
            Work from office
          </option>
        </select>
      </div>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="jobrequirement"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Job Requirements*
        </label>
        <textarea
          rows={3}
          type="text"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        />
      </div>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="Closejob"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Closed Job*
        </label>
        <input
          type="date"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        />
      </div>
    </>
  );
};

export default FormJob;
