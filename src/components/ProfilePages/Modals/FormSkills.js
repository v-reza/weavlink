import React, { useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import classNames from "@/utils/classNames";
import { axiosGet } from "@/utils/axiosInstance";
import useGlobal from "@/hooks/useGlobal";
import Card from "@/uiComponents/Card";
import { XIcon } from "@heroicons/react/outline";

const FormSkills = () => {
  const [query, setQuery] = useState("");
  const [selectedSkills, setSelectedSkills] = useState(null);
  const [listSkills, setListSkills] = useState([]);
  const [openSuggestedSkills, setOpenSuggestedSkills] = useState(true);
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  useEffect(() => {
    const getListSkills = async () => {
      const res = await axiosGet(`/skills/list?query=${query}`);
      setListSkills(res.data);
    };
    getListSkills();
  }, [query]);

  useEffect(() => {
    dispatchGlobal({
      type: "GLOBAL_STATE",
      payload: {
        skills: {
          ...selector.skills,
          name: selectedSkills?.name,
        },
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSkills]);

  const filteredSkills =
    query === ""
      ? listSkills
      : listSkills.filter((skill) =>
          skill?.name.toLowerCase().includes(query.toLowerCase())
        );
  console.log(selectedSkills);

  return (
    <div className="sm:mx-auto sm:w-full sm:max-w-md">
      <Combobox as="div" value={selectedSkills} onChange={setSelectedSkills}>
        <Combobox.Label className="block text-sm font-medium text-slate-300 text-left">
          Skill*
        </Combobox.Label>
        <div className="relative mt-1">
          <Combobox.Input
            className="w-full bg-transparent rounded-md border border-gray-300 text-white py-2 pl-3 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            displayValue={(listSkills) => listSkills?.name}
          />

          <Combobox.Options className="absolute z-10 bg-slate-700 border border-slate-600 mt-1 max-h-60 w-full overflow-auto rounded-md  py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <Combobox.Option
                  key={skill._id}
                  value={skill}
                  className={({ active }) =>
                    classNames(
                      "relative cursor-pointer text-left select-none py-2 pl-8 pr-4",
                      active
                        ? "bg-slate-800/50 text-slate-300"
                        : "text-slate-200"
                    )
                  }
                >
                  {({ active, selected }) => (
                    <>
                      <span
                        className={classNames(
                          "block truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {skill.name}
                      </span>

                      {selected && (
                        <span
                          className={classNames(
                            "absolute inset-y-0 left-0 flex items-center pl-1.5",
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
                          "ml-3 truncate text-slate-200",
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
      {!selectedSkills && openSuggestedSkills && (
        <div className="mt-4">
          <Card usePx0={true} bg="slate-600">
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className="text-white text-md font-medium">
                  Suggested Skills
                </span>
                <div className="flex space-x-3">
                  <div
                    className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer"
                    onClick={() => setOpenSuggestedSkills(false)}
                  >
                    <XIcon className="w-5 h-5 text-slate-300" />
                  </div>
                </div>
              </div>
              {/* <Divider mt={"mt-2"} /> */}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default FormSkills;
