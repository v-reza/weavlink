/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  LocationMarkerIcon,
  PencilIcon,
} from "@heroicons/react/solid";
import { Menu, Transition } from "@headlessui/react";
import useFolder from "../../../hooks/useFolder";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DetailNavJob() {
  const folder = useFolder();
  return (
    <div className="w-full mx-auto max-w-7xl px-8">
      <div className="px-6 border-t border-slate-600 dark:bg-slate-800">
        <div className="flex items-center mt-2">
          <div className="cursor-pointer border-b-2 border-green-500 py-2">
            <span className="text-sm font-medium text-green-400">Job Info</span>
          </div>
          <div className="cursor-pointer border-b-2 border-transparent ml-6">
            <span className="text-sm font-medium dark:text-white">Settings</span>
          </div>
        </div>
      </div>
    </div>
  );
}
