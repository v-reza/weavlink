import React from "react";

const Card = ({ children, ...props }) => {
  return (
    <div {...props}>
      <ul role="list" className="space-y-4">
        <div className="overflow-hidden sm:rounded-md shadow-slate-800">
          <div className="rounded-lg shadow bg-slate-800">
            <div className="p-8">{children}</div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Card;
