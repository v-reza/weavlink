/* eslint-disable @next/next/no-img-element */
import Card from "@/uiComponents/Card";
import Divider from "@/uiComponents/Divider";
import { PencilIcon, PlusIcon } from "@heroicons/react/outline";
import React from "react";

const Experience = () => {
  return (
    <div className="mt-4">
      <Card>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-white text-md font-medium">Experience</span>
            <div className="flex space-x-3">
              <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                <PlusIcon className="w-5 h-5 text-slate-300" />
              </div>
              <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                <PencilIcon className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="flex-shrink-0">
              <img
                src="/avatar.png"
                className="w-12 h-12 object-cover"
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-white">
                <span>Web Developer</span>
              </div>
              <div className="text-sm text-slate-300">
                <span>Icube by SIRCLO • Contract</span>
              </div>
              <div className="text-sm text-slate-500 font-medium">
                <span>Mar 2022 - Present • Contract</span>
              </div>
              <div className="text-sm text-slate-500 font-medium">
                <span>Yogyakarta, Yogyakarta, Indonesia</span>
              </div>
              <div className="text-sm flex items-center mt-4 ">
                <span className="text-white font-medium">Skills:</span>
                <span className="text-slate-300 text-sm truncate">
                  &nbsp; React Native • React js • Node js • Express js •
                  MongoDB 
                </span>
              </div>
            </div>
          </div>
          {/* <Divider mt={"mt-2"} /> */}
        </div>
      </Card>
    </div>
  );
};

export default Experience;
