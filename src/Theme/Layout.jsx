import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-auto">
        <div className="grow">
          <div className="min-h-screen w-screen md:w-full sm:w-full lg:w-full transition duration-200">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
