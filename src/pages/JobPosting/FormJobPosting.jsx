import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WorkplaceType from "./shared/WorkplaceType";
import ListCompany from "./shared/ListCompany";
import JobType from "./shared/JobType";
import JobTitle from "./shared/JobTitle";
import JobLocation from "./shared/JobLocation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormJobPosting() {
  const [form, setForm] = useState({});
  const [disableSubmit, setDisableSubmit] = useState(true);

  useEffect(() => {
    if (
      form.jobTitle &&
      form.companyName &&
      form.jobLocation &&
      form.workplaceType &&
      form.jobType
    ) {
      setDisableSubmit(false);
    } else {
      setDisableSubmit(true);
    }
  }, [form]);
  return (
    <>
      <form className="mt-6 space-y-6" action="#" method="POST">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Job title
          </label>
          <div className="mt-1">
            <JobTitle form={form} setForm={setForm} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            My Company
          </label>
          <div className="mt-1">
            <ListCompany form={form} setForm={setForm} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Workplace Type
          </label>
          <div className="mt-1">
            <WorkplaceType form={form} setForm={setForm} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Job Type
          </label>
          <div className="mt-1">
            <JobType form={form} setForm={setForm} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-slate-300">
            Job Location
          </label>
          <div className="mt-1">
            <JobLocation form={form} setForm={setForm} />
          </div>
        </div>

        <div>
          <button
            disabled={disableSubmit}
            type="button"
            className={classNames(
              disableSubmit
                ? "cursor-not-allowed bg-gray-500 hover:bg-gray-600"
                : "bg-indigo-600 hover:bg-indigo-700",
              "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            )}
          >
            Get Started for free
          </button>
        </div>
      </form>
    </>
  );
}
