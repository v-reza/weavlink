import React from "react";
import {
  BookmarkIcon,
  BellIcon,
  CashIcon,
  ClipboardCheckIcon
} from "@heroicons/react/outline";
const navigation = [
  { name: "My Jobs", href: "#", icon: BookmarkIcon, current: true },
  { name: "Job alerts", href: "#", icon: BellIcon, current: false },
  { name: "Salary", href: "#", icon: CashIcon, current: false },
  { name: "Skills Test", href: "#", icon: ClipboardCheckIcon, current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = () => {
  return (
    <div className="hidden lg:block h-max lg:col-span-3 xl:col-span-2 bg-slate-800 rounded-lg shadow sticky top-24">
      <nav aria-label="Sidebar" className="top-4 divide-y divide-gray-300">
        <div className="pb-6 space-y-1 mt-4 px-3">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={classNames(
                "group flex items-center px-3 py-2 text-sm font-medium rounded-md text-white"
              )}
              aria-current={item.current ? "page" : undefined}
            >
              <item.icon
                className={classNames(
                  "flex-shrink-0 -ml-1 mr-3 h-6 w-6 text-white"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
