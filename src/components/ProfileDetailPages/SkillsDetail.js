/* eslint-disable @next/next/no-img-element */
import useAuth from "@/hooks/useAuth";
import useGlobal from "@/hooks/useGlobal";
import useHeader from "@/hooks/useHeader";
import useUser from "@/hooks/useUser";
import Button from "@/uiComponents/Button";
import Card from "@/uiComponents/Card";
import Divider from "@/uiComponents/Divider";
import Modal from "@/uiComponents/Modal";
import { axiosGet } from "@/utils/axiosInstance";
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  DotsHorizontalIcon,
  PencilIcon,
  PlusIcon,
} from "@heroicons/react/outline";
import { ArrowRightIcon, UsersIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import FooterFormSkills from "../ProfilePages/Modals/Skills/FooterFormSkills";
import FormSkills from "../ProfilePages/Modals/Skills/FormSkills";

const SkillsDetail = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [skills, setSkills] = useState([]);
  const { token } = useAuth();
  const headers = useHeader(token);
  const { user: currentUser } = useUser();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const router = useRouter();
  useEffect(() => {
    const getMySkills = async () => {
      const res = await axiosGet(`/skills/mySkills/${user._id}`);
      setSkills(res.data.skills);
    };
    getMySkills();
    if (selector?.newSkills) {
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          newSkills: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user._id, selector?.newSkills]);
  return (
    <>
      <Modal
        title={"Add Skill"}
        open={open}
        setOpen={setOpen}
        footer={<FooterFormSkills setOpen={setOpen} />}
      >
        <FormSkills />
      </Modal>
      <div className="mt-4">
        <Card usePx0={true}>
          <div className="p-8">
            <div className="flex items-center justify-between">
              <span className="text-white text-md font-medium flex items-center">
                <div
                  className="hover:bg-slate-700/50 rounded-full cursor-pointer p-1"
                  onClick={() => router.replace(`/profile/${user.username}`)}
                >
                  <ArrowLeftIcon className="w-6 h-6" />
                </div>
                <span className="ml-2">Skills</span>
              </span>
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
                {currentUser?._id === user._id && (
                  <>
                    <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                      <DotsHorizontalIcon className="w-5 h-5 text-slate-300" />
                    </div>
                    <div
                      className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer"
                      onClick={() => setOpen(true)}
                    >
                      <PlusIcon className="w-5 h-5 text-slate-300" />
                    </div>
                  </>
                )}
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
            <div className="flex space-x-2 ">
              <div className="min-w-0 flex-1">
                {skills.length > 0 ? (
                  skills.slice(0, 5).map((skill, index) => (
                    <div className="mt-4" key={skill._id}>
                      <div className="text-sm font-medium text-white flex items-center justify-between">
                        <span>{skill.skill}</span>
                        <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                          <PencilIcon className="w-5 h-5 text-slate-300" />
                        </div>
                      </div>
                      {skill.skillToUse?.length > 0 && (
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
                      )}
                      <div className="mt-2 flex text-sm text-slate-300 font-medium space-x-2">
                        <UsersIcon className="w-5 h-5" />
                        <span>{skill.endorsment?.length || 0} Endorsment</span>
                      </div>
                      {index !== skills.length - 1 && <Divider mt={"mt-2"} />}
                    </div>
                  ))
                ) : (
                  <span className="text-slate-300 font-medium">
                    {user._id !== currentUser?._id ? (
                      <>No skills yet on this users.</>
                    ) : (
                      <>
                        No skills yet. Add your skills to show your expertise.
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
            {/* <Divider mt={"mt-2"} /> */}
          </div>
        </Card>
      </div>
    </>
  );
};

export default SkillsDetail;
