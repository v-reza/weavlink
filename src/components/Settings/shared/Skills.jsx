import React from "react";
import { TrashIcon } from "@heroicons/react/solid";
import useAuth from "../../../hooks/useAuth";
import useHeader from "../../../hooks/useHeader";
import useNotif from "../../../hooks/useNotif";
import { axiosDelete } from "../../../helper/axiosHelper";
const Skills = ({ setOpenModalSkills, skills, setRefreshProfile }) => {
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useNotif();
  const handleDeleteSkills = async (e, skillName) => {
    e.preventDefault();
    try {
      await axiosDelete(
        "/userprofile/delete/skills/" + skillName,
        headers
      ).then(() => {
        dispatch({
          type: "NOTIF_SUCCESS",
          title: "Success",
          message: "Skills deleted",
        });
        setRefreshProfile(true);
        setOpenModalSkills(false);
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="py-6 px-4 sm:p-6 lg:pb-8">
        <div className="flex justify-between">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Skills
          </h2>
          <button
            onClick={() => setOpenModalSkills(true)}
            type="button"
            className="ml-5 bg-rose-700 border border-transparent rounded-md shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-sky-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            Add Skills
          </button>
        </div>

        <div className="mt-6 grid grid-cols-6 gap-6">
          {skills.skills?.length > 0 ? (
            skills.skills?.map((skill, index) => (
              <div className="col-span-6 sm:col-span-6" key={index}>
                <label
                  htmlFor="skill"
                  className="flex text-sm font-medium text-gray-700"
                >
                  {skill}
                  <TrashIcon
                    className="cursor-pointer w-4 h-4 ml-3 mt-1"
                    onClick={(e) => handleDeleteSkills(e, skill)}
                  />
                </label>
              </div>
            ))
          ) : (
            <span className="text-sm text-gray-500">No Skills found</span>
          )}
        </div>
      </div>
    </>
  );
};

export default Skills;
