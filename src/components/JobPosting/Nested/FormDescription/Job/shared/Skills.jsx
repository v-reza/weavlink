import { XIcon, PlusIcon } from "@heroicons/react/solid";
import React, { useEffect, useState } from "react";
import useGlobal from "../../../../../../hooks/useGlobal";

const Skills = ({ setOpen }) => {
  const initialSkills = [
    {
      name: "React",
    },
    {
      name: "Redux",
    },
    {
      name: "JavaScript",
    },
    {
      name: "HTML",
    },
    {
      name: "CSS",
    },
    {
      name: "Node.js",
    },
  ];
  useEffect(() => {
    dispatch({
      type: "GLOBAL_STATE",
      payload: {
        newSkills: initialSkills,
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { selector, dispatch } = useGlobal();
  const [allSkills, setAllSkills] = useState([]);
  const handleDeleteInitialSkills = (name) => {
    dispatch({
      type: "GLOBAL_STATE",
      payload: {
        newSkills: selector.newSkills.filter((skill) => skill.name !== name),
      },
    });
  };
  console.log(selector);
  useEffect(() => {
    setAllSkills(selector.newSkills);
  }, [selector]);

  return (
    <div className="gap-y-2 grid grid-cols-4 gap-x-2">
      {allSkills?.map((skill, index) => (
        <div key={index}>
          <button
            type="button"
            className="flex w-full items-center justify-between px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-green-600 hover:bg-green-700 "
          >
            {skill?.name}
            <XIcon
              onClick={() => handleDeleteInitialSkills(skill.name)}
              className="ml-2 -mr-0.5 h-4 w-4"
              aria-hidden="true"
            />
          </button>
        </div>
      ))}
      <div>
        <button
          onClick={() => setOpen(true)}
          type="button"
          className="flex w-full items-center justify-between px-3 py-2 border border-transparent shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-transparent border dark:border-slate-400 hover:bg-slate-700 "
        >
          Add Skill
          <PlusIcon className="ml-2 -mr-0.5 h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default Skills;
