/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import useUser from "@/hooks/useUser";
import Card from "@/uiComponents/Card";
import Divider from "@/uiComponents/Divider";
import { PencilIcon, PlusIcon } from "@heroicons/react/outline";
import React from "react";

const LicensesCertifications = ({ user }) => {
  const { user: currentUser } = useUser();
  const { selector, dispatch: dispatchGlobal } = useGlobal();

  return (
    <div className="mt-4">
      <Card>
        <div>
          <div className="flex items-center justify-between">
            <span className="text-white text-md font-medium">
              Licenses & Certifications
            </span>
            {currentUser?._id === user._id && (
              <div className="flex space-x-3">
                <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                  <PlusIcon className="w-5 h-5 text-slate-300" />
                </div>
                <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                  <PencilIcon className="w-5 h-5 text-slate-300" />
                </div>
              </div>
            )}
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
                <span>Bootcamp Fullstack Web Developer</span>
              </div>
              <div className="text-sm text-slate-300">
                <span>Weavlink, Inc.</span>
              </div>
              <div className="text-sm text-slate-500 font-medium">
                <span>Credential ID: uykjs92hsjklashd8808</span>
              </div>
            </div>
          </div>
          {/* <Divider mt={"mt-2"} /> */}
        </div>
      </Card>
    </div>
  );
};

export default LicensesCertifications;
