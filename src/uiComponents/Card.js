import React from "react";

const Card = ({ children, padding, customClass, usePx0, ...props }) => {
  return (
    <div {...props}>
      <ul role="list" className="space-y-4">
        <div className="overflow-hidden sm:rounded-md shadow-slate-800">
          <div className="rounded-lg shadow bg-slate-800">
            {/* <div className={`${padding ? `p-${padding}` : `p-8`}`}> */}
            {usePx0 ? (
              <div className="px-0">{children}</div>
            ) : (
              <div
                className={`${
                  customClass ? customClass : padding ? `p-${padding}` : `p-8`
                }  `}
              >
                {children}
              </div>
            )}
          </div>
        </div>
      </ul>
    </div>
  );
};

export default Card;
