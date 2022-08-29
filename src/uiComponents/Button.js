import React from "react";

const Button = ({
  children,
  customClass,
  width = "w-full",
  bg,
  hoverBg,
  setOpen,
  mb = "3",
  px = "4",
  py = "3",
  borderWidth = "1",
  borderColor = "rose-500",
  textAlign = "center",
  textSize = "sm",
  fontWeight = "medium",
  justify = "center",
  rounded = "md",
  ...props
}) => (
  <div
    {...props}
    className={`${
      customClass
        ? customClass
        : `cursor-pointer mb-${mb} ${width} inline-flex justify-start items-center px-${px} py-${py} 
        border border-${borderColor}
            text-${textSize} font-${fontWeight} text-${textAlign} rounded-${rounded} shadow-sm text-white bg-${bg} hover:bg-${hoverBg}`
    }`}
  >
    {children}
  </div>
);

export default Button;
