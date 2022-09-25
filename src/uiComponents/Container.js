/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/display-name */
import React, { useState } from "react";
import classnames from "classnames";
import { ctx } from "@/utils/constants";

const ContainerSidebar = ({ children, ...props }) => <>{children}</>;
const ContainerMain = ({
  lg = "lg:col-span-9",
  xl = "xl:col-span-6",
  md = "md:col-span-8",
  children,
  ...props
}) => {
  return (
    <>
      <main className={`${lg} ${xl} ${md}`}>{children}</main>
    </>
  );
};
const ContainerRightbar = ({
  children,
  sm,
  md,
  lg = "lg:col-span-4",
  xl = "xl:col-span-4",
  ...props
}) => {
  return (
    <>
      <aside className={ctx(`hidden xl:block ${lg} ${xl} lg:block`)}>
        <div className="top-4 space-y-4">{children}</div>
      </aside>
    </>
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
