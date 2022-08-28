import React from "react";

const Button = ({
  children,
  customClass,
  width = "w-full",
  bg,
  hoverBg,
  setOpen,
  ...props
}) => (
  <div
    {...props}
    className={`${
      customClass
        ? customClass
        : `cursor-pointer mb-3 ${width} inline-flex text-center justify-center items-center px-4 py-2 border border-transparent text-sm font-medium text-end rounded-md shadow-sm text-white bg-${bg} hover:bg-${hoverBg}`
    }`}
  >
    {console.log(bg, hoverBg)}
    {children}
  </div>
);

export default Button;
