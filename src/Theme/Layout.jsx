import React from "react";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex flex-auto">
        <div className="grow">
          <div className="min-h-screen transition duration-200">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
