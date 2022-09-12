/* eslint-disable @next/next/no-img-element */
import useGlobal from "@/hooks/useGlobal";
import useNotif from "@/hooks/useNotif";
import useUser from "@/hooks/useUser";
import Card from "@/uiComponents/Card";
import Divider from "@/uiComponents/Divider";
import Modal from "@/uiComponents/Modal";
import { axiosGet } from "@/utils/axiosInstance";
import { PencilIcon, PlusIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import FooterFormEducation from "./Modals/Education/FooterFormEducation";
import FormEducation from "./Modals/Education/FormEducation";

const Education = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [educations, setEducations] = useState([]);

  const { user: currentUser } = useUser();
  const { selector, dispatch: dispatchGlobal } = useGlobal();
  const { dispatch: dispatchNotif } = useNotif();

  useEffect(() => {
    const getMyEducations = async () => {
      try {
        const res = await axiosGet(`/educations/myEducations/${user._id}`);
        setEducations(res.data.education);
      } catch (error) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.message,
        });
      }
    };
    getMyEducations();
    if (selector?.newEducations) {
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          newEducations: false,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?._id, selector?.newEducations]);
  return (
    <>
      <Modal
        title={"Add Education"}
        open={open}
        setOpen={setOpen}
        footer={<FooterFormEducation setOpen={setOpen} />}
        maxWidth={"sm:max-w-2xl"}
      >
        <FormEducation />
      </Modal>
      <div className="mt-4">
        <Card>
          <div>
            <div className="flex items-center justify-between">
              <span className="text-white text-md font-medium">Education</span>
              {currentUser?._id === user._id && (
                <div className="flex space-x-3">
                  <div
                    className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer"
                    onClick={() => setOpen(true)}
                  >
                    <PlusIcon className="w-5 h-5 text-slate-300" />
                  </div>
                  <div className="rounded-full hover:bg-slate-700/50 p-2 cursor-pointer">
                    <PencilIcon className="w-5 h-5 text-slate-300" />
                  </div>
                </div>
              )}
            </div>
            <div className="flex space-x-2 mt-2">
              <div className="min-w-0 flex-1">
                {educations?.length > 0 ? (
                  educations.map((education, index) => (
                    <div className="mt-4" key={education._id}>
                      <div className="text-sm font-medium text-white">
                        <span>{education.education}</span>
                      </div>
                      <div className="text-sm text-slate-300">
                        <span>
                          {education.degree || education.fieldOfStudy ? (
                            <>
                              {education.degree + ", " + education.fieldOfStudy}
                            </>
                          ) : null}
                        </span>
                      </div>
                      <div className="text-sm text-slate-500 font-medium">
                        <span>
                          {education.startYears || education.endYears ? (
                            <>
                              {education.startYears} - {education.endYears}
                            </>
                          ) : null}
                        </span>
                      </div>
                      {index !== educations.length - 1 && (
                        <Divider mt={"mt-2"} />
                      )}
                    </div>
                  ))
                ) : (
                  <span className="text-slate-300 font-medium">
                    {user._id !== currentUser?._id ? (
                      <>No educations yet on this users.</>
                    ) : (
                      <>
                        No educations yet. Add your educations to show your
                        expertise.
                      </>
                    )}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default Education;
