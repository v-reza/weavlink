import { useCallback, useEffect, useState } from "react";

export default function JobLocation({ form, setForm }) {
  const [jobLocation, setJobLocation] = useState("");
  const handleChangeJobLocation = useCallback(
    (e) => {
      setJobLocation(e.target.value);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [jobLocation]
  );

  useEffect(() => {
    setForm({ ...form, jobLocation: jobLocation });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleChangeJobLocation]);
  return (
    <>
      <textarea
        value={jobLocation}
        onChange={(e) => handleChangeJobLocation(e)}
        rows={3}
        required
        className="appearance-none block w-full bg-transparent dark:text-white px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
      />
    </>
  );
}
