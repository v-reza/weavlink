import React from "react";

const Theme = ({ children }) => {
  return (
    <div className="bg-white dark:bg-slate-900 transition-all">{children}</div>
  );
};

export default Theme;
