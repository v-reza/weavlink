/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useState } from "react";

const Container = ({ children, ...props }) => {
  return (
    <div className="min-h-full">
      <div className="py-10">
        <div className="max-w-3xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          {children}
        </div>
      </div>
    </div>
  );
};

Container.Sidebar = ({ children, ...props }) => <>{children}</>;

Container.Main = ({ children, ...props }) => {
  const [classes, setClasses] = useState(
    `lg:col-span-${props.lg || 9} xl:col-span-${props.xl || 6}`
  );
  return (
    <>
      <main className={"lg:col-span-9 xl:col-span-6"}>{children}</main>
    </>
  );
};

Container.Rightbar = ({ children, sm, md, lg = "2", xl = "2", ...props }) => {
  return (
    <aside
      className={`hidden xl:block xl:col-span-${xl} lg:block lg:col-span-${lg}`}
    >
      <div className="top-4 space-y-4">{children}</div>
    </aside>
  );
};

export default Container;
