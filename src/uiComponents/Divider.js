import React from "react";

const Divider = ({ mt }) => {
  return (
    <div className={`${mt} relative`}>
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="w-full border-t border-slate-600" />
      </div>
    </div>
  );
};

export default Divider;
