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

Container.Main = ({ lg = "9", xl = "6", children }) => (
  <main className={`lg:col-span-${lg} xl:col-span-${xl}`}>{children}</main>
);

Container.Rightbar = ({ children, sm, md, lg = "2", xl = "2", ...props }) => (
  <aside
    className={`hidden xl:block xl:col-span-${xl} lg:block lg:col-span-${lg}`}
  >
    <div className="top-4 space-y-4">{children}</div>
  </aside>
);

export default Container;
