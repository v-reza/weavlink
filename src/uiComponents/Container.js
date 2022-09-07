/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useState } from "react";
import classNames from "@/utils/classNames";

const ContainerSidebar = ({ children, ...props }) => <>{children}</>;
const ContainerMain = ({ lg, xl, children, ...props }) => {
  console.log("lg", lg);
  console.log("xl", xl);
  console.log("props...", props);
  return (
    <>
      {/* <main className={`lg:col-span-${lg || 9} xs:col-span-${xl || 6}`}> */}
      <main
        className={classNames(
          lg ? `lg:col-span-${lg}` : "lg:col-span-9",
          xl ? `xl:col-span-${xl}` : "xl:col-span-6"
        )}
      >
        {children}
      </main>
    </>
  );
};
const ContainerRightbar = ({
  children,
  sm,
  md,
  lg = "2",
  xl = "2",
  ...props
}) => {
  return (
    <aside
      className={`hidden xl:block xl:col-span-${xl} lg:block lg:col-span-${lg}`}
    >
      <div className="top-4 space-y-4">{children}</div>
    </aside>
  );
};

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

Container.Sidebar = ContainerSidebar;
Container.Main = ContainerMain;
Container.Rightbar = ContainerRightbar;

export default Container;
