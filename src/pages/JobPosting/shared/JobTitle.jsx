import { useCallback, useEffect, useState } from "react";

export default function JobTitle({ form, setForm }) {
  const [jobTitle, setJobTitle] = useState("");
  const handleChangeJobTitle = useCallback(
    (e) => {
      setJobTitle(e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jobTitle]
  );
  useEffect(() => {
    setForm({ ...form, jobTitle: jobTitle });
  }, [handleChangeJobTitle]);
  return (
    <>
      <input
        value={jobTitle}
        onChange={(e) => handleChangeJobTitle(e)}
        type="text"
        required
        placeholder="Add the title you are hiring for"
        className="appearance-none block w-full px-3 py-2 border border-gray-300 dark:bg-transparent dark:text-white rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </>
  );
}
