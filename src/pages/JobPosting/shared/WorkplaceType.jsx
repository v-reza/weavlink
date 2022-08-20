/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function WorkplaceType({ form, setForm }) {
  const workplace = [
    { name: "On Site", desc: "Employees come to work-in person." },
    { name: "Hybird", desc: "Employees work on-site and off-site" },
    { name: "Remote", desc: "Employees work of-site" },
  ];
  const [selected, setSelected] = useState(workplace[3]);
  useEffect(() => {
    setForm({ ...form, workplaceType: selected?.name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button className="relative w-full bg-transparent dark:text-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span className="w-full inline-flex truncate">
                <span className="truncate">{selected?.name}</span>
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <SelectorIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white dark:bg-slate-800 border border-2 dark:border-slate-500 shadow-lg max-h-60 rounded-lg py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {workplace.map((workplace, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={workplace}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "truncate dark:text-slate-200"
                            )}
                          >
                            {workplace.name}
                          </span>
                        </div>
                        <span
                          className={classNames(
                            active ? "text-indigo-200" : "text-gray-500",
                            "truncate dark:text-slate-400"
                          )}
                        >
                          {workplace.desc}
                        </span>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
