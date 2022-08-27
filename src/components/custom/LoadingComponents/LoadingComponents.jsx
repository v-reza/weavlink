import { CircularProgress } from "@mui/material";
import React from "react";

const LoadingComponents = () => {
  return (
    <div>
      <ul role="list" className="space-y-4">
        <div className="overflow-hidden sm:rounded-md ">
          <div className="bg-transparent rounded-lg shadow ">
            <div className="p-8">
              <div className="flex items-center justify-center dark:text-white gap-3">
                <CircularProgress /> Loading...
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
};

export default LoadingComponents;
