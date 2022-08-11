import React from "react";

const FormJob = ({
  jobTitle,
  setJobTitle,
  jobDesc,
  setJobDesc,
  jobLocation,
  setJobLocation,
  salary,
  setSalary,
  jobType,
  setJobType,
  jobCondition,
  setJobCondition,
  jobRequirements,
  setJobRequirements,
  closedJob,
  setClosedJob,
}) => {
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
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
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
          value={jobDesc}
          onChange={(e) => setJobDesc(e.target.value)}
          rows={4}
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
          value={jobLocation}
          onChange={(e) => setJobLocation(e.target.value)}
          rows={3}
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
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          type="number"
          min={0}
          onInput={(e) => {
            e.target.value = Math.max(0, parseInt(e.target.value));
          }}
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
          placeholder="8.000.000"
        />
      </div>
      <div className="relative mb-6 px-2 py-2">
        <label
          htmlFor="salaryFormat"
          className="absolute -top-2 left-0 -mt-px text-gray-600 inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(salary)}
        </label>
      </div>
      <div className="relative border border-gray-300 mb-6 rounded-md px-3 py-2 shadow-sm focus-within:ring-1 focus-within:ring-indigo-600 focus-within:border-indigo-600">
        <label
          htmlFor="name"
          className="absolute -top-2 left-2 -mt-px inline-block px-1 bg-white text-xs font-medium text-gray-900"
        >
          Job Type*
        </label>
        <select
          onChange={(e) => setJobType(e.target.value)}
          value={jobType || ""}
          defaultValue={jobType || "default"}
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        >
          <option
            value="default"
            selected
            defaultValue={"default"}
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
        <select
          onChange={(e) => setJobCondition(e.target.value)}
          value={jobCondition || ""}
          // defaultValue="default"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        >
          <option
            value="default"
            selected
            defaultValue={"default"}
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
          value={jobRequirements}
          onChange={(e) => setJobRequirements(e.target.value)}
          rows={3}
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
          value={closedJob}
          onChange={(e) => setClosedJob(e.target.value)}
          type="date"
          className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 focus:ring-0 sm:text-sm"
        />
      </div>
    </>
  );
};

export default FormJob;
