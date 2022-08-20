import React, { Suspense } from "react";
import {
  BookmarkIcon,
  BellIcon,
  CashIcon,
  ClipboardCheckIcon,
  CalendarIcon,
  BriefcaseIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";
import SidebarListCompany from "./shared/SidebarListCompany";
import useFolder from "../../../hooks/useFolder";
import { PlusSmIcon } from "@heroicons/react/solid";
import { LinearProgress } from "@mui/material";
const navigation = [
  { name: "My Jobs", href: "#", icon: BookmarkIcon, current: true },
  { name: "Job alerts", href: "#", icon: BellIcon, current: false },
  { name: "Salary", href: "#", icon: CashIcon, current: false },
  { name: "Skills Test", href: "#", icon: ClipboardCheckIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SidebarMyCompany({
  setOpen,
  myCompany,
  setDetailCompany,
}) {
  const navigate = useNavigate();
  const folder = useFolder();
  return (
    <div className="hidden lg:block flex-grow h-max sm:col-span-4 xs:col-span-4 lg:col-span-4 xl:col-span-4 bg-white dark:bg-slate-800 rounded-lg shadow">
      <nav
        aria-label="Sidebar"
        className="h-max top-4 divide-y divide-gray-300 flex-grow overflow-y-auto"
      >
        <div className="pb-6 space-y-1 px-6 mt-4">
          <div className="flex items-center justify-between">
            <h2 className="mb-3 dark:text-white text-md">My Company</h2>
            <section aria-labelledby="who-to-follow-heading">
              <div
                onClick={() => setOpen(true)}
                className="flex items-center justify-center cursor-pointer w-full block text-center px-4 py-2 shadow-sm text-sm font-medium rounded-full border-2 border-blue-500 text-gray-700 bg-white hover:bg-gray-50 dark:bg-slate-800/90 dark:text-white dark:highlight-white/5 dark:hover:bg-slate-700"
              >
                <PlusSmIcon className="w-5 h-5 dark:text-slate-300" />
                <span className="text-sm dark:text-slate-300">New Company</span>
              </div>
            </section>
          </div>
          {myCompany.length > 0 ? (
            <Suspense fallback={<LinearProgress />}>
              {myCompany.map((company) => (
                <SidebarListCompany
                  key={company._id}
                  company={company}
                  setDetailCompany={setDetailCompany}
                />
              ))}
            </Suspense>
          ) : (
            <>
              <div className="mt-4 flex items-center justify-center">
                <img
                  src={folder + "/myCompanyNotFound.png"}
                  alt=""
                  width={150}
                  height={150}
                />
              </div>
              <p className="mt-4 dark:text-slate-300 text-base font-medium text-center">
                No Company found yet.
              </p>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
