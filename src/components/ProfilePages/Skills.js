/* eslint-disable @next/next/no-img-element */
import Button from "@/uiComponents/Button";
import Card from "@/uiComponents/Card";
import Divider from "@/uiComponents/Divider";
import { PencilIcon, PlusIcon } from "@heroicons/react/outline";
import { ArrowRightIcon, UsersIcon } from "@heroicons/react/solid";
import React from "react";

const Skills = () => {
  return (
    <div className="mt-4">
      <Card usePx0={true}>
        <div className="p-8">
          <div className="flex items-center justify-between">
            <span className="text-white text-md font-medium">Skills</span>
            <div className="flex space-x-3">
              <div className="hidden sm:block">
                <Button
                  rounded="full"
                  width="max"
                  py="1"
                  borderColor="blue-300"
                  bg="transparent"
                  hoverBg="slate-700"
                >
                  <span className="text-blue-300 font-medium">
                    Demonstrate skills
                  </span>
                </Button>
              </div>
              <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                <PlusIcon className="w-5 h-5 text-slate-300" />
              </div>
              <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                <PencilIcon className="w-5 h-5 text-slate-300" />
              </div>
            </div>
          </div>
          <div className="block sm:hidden mt-1">
            <Button
              rounded="full"
              width="max"
              py="1"
              borderColor="blue-300"
              bg="transparent"
              hoverBg="slate-700"
            >
              <span className="text-blue-300 font-medium">
                Demonstrate skills
              </span>
            </Button>
          </div>
          <div className="flex space-x-2 mt-2">
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium text-white">
                <span>React JS</span>
              </div>
              <div className="flex items-center space-x-2 mt-2">
                <img
                  src="/avatar.png"
                  className="w-5 h-5 object-cover"
                  alt=""
                />
                <div className="text-sm text-slate-300">
                  <span>Web Developer at ICUBE by SIRCLO</span>
                </div>
              </div>
              <div className="mt-2 flex text-sm text-slate-300 font-medium space-x-2">
                <UsersIcon className="w-5 h-5" />
                <span>0 Endorsment</span>
              </div>
            </div>
          </div>
          {/* <Divider mt={"mt-2"} /> */}
        </div>
        <Divider />
        <div className="py-2 w-full cursor-pointer hover:bg-slate-500/30">
          <div className="flex items-center justify-center">
            <span className="text-white text-sm font-medium cursor-pointer flex items-center">
              Show all 12 skills <ArrowRightIcon className="w-4 h-4 ml-2" />
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Skills;
