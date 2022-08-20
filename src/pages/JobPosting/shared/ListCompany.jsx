/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import { axiosGet } from "../../../helper/axiosHelper";
import useAuth from "../../../hooks/useAuth";
import useHeader from "../../../hooks/useHeader";
import useFolder from "../../../hooks/useFolder";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListCompany({ form, setForm }) {
  const [myCompany, setMyCompany] = useState([]);
  const folder = useFolder();
  const { token } = useAuth();
  const headers = useHeader(token);
  useEffect(() => {
    const getMyCompany = async () => {
      const res = await axiosGet("/company/check/my-company", headers);
      setMyCompany(res.data);
    };
    getMyCompany();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [selectedCompany, setSelectedCompany] = useState();
  const [query, setQuery] = useState("");
  const filteredCompany =
    query === ""
      ? myCompany
      : myCompany.filter((company) => {
          return company?.companyName
            .toLowerCase()
            .includes(query.toLowerCase());
        });
  useEffect(() => {
    setForm({ ...form, companyName: selectedCompany?.companyName });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCompany]);

  return (
    <Combobox as="div" value={selectedCompany} onChange={setSelectedCompany}>
      <div className="relative mt-1">
        <Combobox.Input
          className="w-full rounded-md border border-gray-300 bg-transparent py-2 pl-3 pr-10 shadow-sm dark:text-white focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          displayValue={(myCompany) => myCompany?.companyName}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </Combobox.Button>

        <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white border border-2 dark:border-slate-500 border dark:bg-slate-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredCompany.length > 0 ? (
            filteredCompany.map((company) => (
              <Combobox.Option
                key={company._id}
                value={company}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-indigo-600 text-white" : "text-gray-900"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <img
                        src={
                          company.companyLogo
                            ? company.companyLogo
                            : folder + "/noCompany.png"
                        }
                        alt=""
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={classNames(
                          "ml-3 truncate dark:text-slate-200",
                          selected && "font-semibold"
                        )}
                      >
                        {company.companyName}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={classNames(
                          "absolute inset-y-0 right-0 flex items-center pr-4",
                          active ? "text-white" : "text-indigo-600"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    )}
                  </>
                )}
              </Combobox.Option>
            ))
          ) : (
            <Combobox.Option
              className={({ active }) =>
                classNames(
                  "relative cursor-default select-none py-2 pl-3 pr-9",
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <div className="flex items-center">
                    <span
                      className={classNames(
                        "ml-3 truncate dark:text-slate-200",
                        selected && "font-semibold"
                      )}
                    >
                      No results found
                    </span>
                  </div>
                </>
              )}
            </Combobox.Option>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
