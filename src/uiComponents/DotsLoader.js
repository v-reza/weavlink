import React from "react";
import { DotSpinner } from "@uiball/loaders";

const DotsLoader = ({ size = 40, speed = 0.9, color = "black", ...props }) => {
  return (
    <div {...props}>
      <DotSpinner size={size} speed={speed} color={color} />
    </div>
  );
};

export default DotsLoader;
