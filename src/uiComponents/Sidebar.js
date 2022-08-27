import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Sidebar = ({
  navigation,
  hidden = ["xs", "sm", "md"],
  block = ["lg", "xl"],
  xs = 0,
  sm = 0,
  md = 0,
  lg = 3,
  xl = 2,
  customClass = null,
  ...props
}) => {
  return (
    <div
      className={`${hidden.map((item) => `${item}:hidden`).join(" ")} ${block
        .map((item) => `${item}:block`)
        .join(" ")} ${!hidden.includes("xs") ? `xs:col-span-${xs}` : ""} ${
        !hidden.includes("sm") ? `sm:col-span-${sm}` : ""
      } ${!hidden.includes("md") ? `md:col-span-${md}` : ""} ${
        !hidden.includes("lg") ? `lg:col-span-${lg}` : ""
      } ${!hidden.includes("xl") ? `xl:col-span-${xl}` : ""} ${
        customClass
          ? customClass
          : "h-max bg-slate-800 rounded-lg shadow sticky top-24"
      }`}
    >
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
