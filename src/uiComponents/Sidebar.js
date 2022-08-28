import React from "react";
const Sidebar = ({
  hidden = ["sm"],
  block = ["lg", "xl"],
  xs = 0,
  sm = 0,
  md = 0,
  lg = 3,
  xl = 2,
  customClass = null,
  children,
  ...props
}) => {
  return (
    <div
      className={`hidden ${hidden.map((item) => `${item}:hidden`).join(" ")} ${block
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
    {/* // <div className="hidden lg:block lg:col-span-3 xl:col-span-2 h-max bg-slate-800"> */}
      <nav aria-label="Sidebar" className="top-4 divide-y divide-gray-300">
        <div className="pb-6 space-y-1 mt-4 px-3">
          {children}
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
