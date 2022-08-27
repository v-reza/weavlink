/* eslint-disable react/display-name */
import React from "react";

const Container = ({ children, ...props }) => (
  <div className="min-h-full">
    <div className="py-10">
      <div className="max-w-3xl mx-auto sm:px-6 xs:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
        {children}
      </div>
    </div>
  </div>
);

Container.Sidebar = ({ children, ...props }) => <>{children}</>;

Container.Main = ({ children }) => (
  <main className="lg:col-span-9 xl:col-span-6">{children}</main>
);

Container.Rightbar = ({ children, ...props }) => (
  <aside className="hidden xl:block xl:col-span-4 lg:block lg:col-span-3">
    <div className="top-4 space-y-4">{children}</div>
  </aside>
);

export default Container;
