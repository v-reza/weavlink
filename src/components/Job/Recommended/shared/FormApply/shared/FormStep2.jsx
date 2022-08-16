/* eslint-disable react-hooks/exhaustive-deps */
/* This example requires Tailwind CSS v2.0+ */
import { useCallback, useEffect, useState } from "react";
import { CheckIcon } from "@heroicons/react/outline";


export default function FormStep2({ form, setForm, setIsError }) {
  const [fileResume, setFileResume] = useState(form.file);
  const [fileNotAllowed, setFileNotAllowed] = useState(false);
  const [fileErrorMessage, setFileErrorMessage] = useState(null);

  const changeFileResume = useCallback(
    (e) => {
      if (e.target.files[0].size > 10000000) {
        setIsError(true);
        setFileNotAllowed(true);
        setFileResume(null);
        setFileErrorMessage("File size is too big");
        setForm({ ...form, file: null });
        return;
      } else if (
        e.target.files[0].type !== "application/pdf" &&
        e.target.files[0].type !== "application/msword" &&
        e.target.files[0].type !==
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        setIsError(true);
        setFileNotAllowed(true);
        setFileResume(null);
        setFileErrorMessage("File type is not allowed");
        setForm({ ...form, file: null });
        return;
      }
      setIsError(false);
      setFileNotAllowed(false);
      setFileResume(e.target.files[0]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [fileResume]
  );

  useEffect(() => {
    setIsError(true)
    if (fileResume) {
      setIsError(false)
      setFileErrorMessage(null);
      setFileNotAllowed(false);
      setForm({ ...form, file: fileResume });
    } else {
      setIsError(true);
    }
  }, [changeFileResume]);
  return (
    <div className="bg-transparent py-5">
      <label className="text-left block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        Upload Resume*
      </label>
      <input
        className="block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        type="file"
        accept=".pdf,.doc,.docx"
        draggable="true"
        onChange={(e) => {
          changeFileResume(e);
        }}
      />
      <p
        className="text-left mt-1 text-sm text-gray-500 dark:text-gray-300"
        id="file_input_help"
      >
        File Type PDF, DOCX (Max 5MB)
      </p>
      {fileResume && (
        <div className="block mt-4 text-left">
          <span className="flex text-green-500 text-sm dark:text-green-00">
            <CheckIcon className="h-5 w-5" />
            Successfully uploaded resume
          </span>
        </div>
      )}
      {fileNotAllowed && (
        <p className="text-left mt-1 text-xs text-red-600" id="phone-error">
          {fileErrorMessage}
        </p>
      )}
    </div>
  );
}
