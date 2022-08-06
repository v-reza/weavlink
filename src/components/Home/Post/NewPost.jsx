/* eslint-disable jsx-a11y/no-redundant-roles */
/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import { AtSymbolIcon, CodeIcon, LinkIcon } from "@heroicons/react/solid";
import { axiosPost } from "../../../helper/axiosHelper";
import useAuth from "../../../hooks/useAuth";
import useNotif from "../../../hooks/useNotif";
import useHeader from "../../../hooks/useHeader";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NewPost({ open, setOpen, setIsNewPost }) {
  const cancelButtonRef = useRef(null);
  const [desc, setDesc] = useState("");
  const { token } = useAuth();
  const headers = useHeader(token);
  const { dispatch } = useNotif();
  const [file, setFile] = useState([]);

  const handleNewPost = async (e) => {
    if (!desc) {
      dispatch({ type: "NOTIF_ERROR", message: "Please enter a description" });
      return;
    }

    try {
      const newPost = {
        desc: desc,
      };

      const formData = new FormData();
      const fileNameList = [];

      /* Upload Image */
      if (file.length > 0) {
        for (const key of Object.keys(file)) {
          const fileName =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          const customFile = new File([file[key]], fileName, {
            type: file[key].type,
          });
          formData.append("images", customFile);
          fileNameList.push(fileName + "." + file[key].type.split("/")[1]);
        }
      }
      await axiosPost("/images/upload", formData);
      /* Update New Post */
      newPost.images = fileNameList;

      await axiosPost("/posts/newpost", newPost, headers).then(() => {
        dispatch({
          type: "NOTIF_SUCCESS",
          title: "Success",
          message: "Post created",
        });
        setIsNewPost(true);
        setOpen(false);
        setDesc("");
        setFile([]);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleFile = (e) => {
    e.preventDefault();
    const listFile = [];
    listFile.push(e.target.files);
    for (let i = 0; i < listFile.length; i++) {
      setFile([...file, listFile[0][i]]);
    }
  };

  const revokeFile = (fileName) => {
    const newFile = file.filter((item) => item.name !== fileName);
    setFile(newFile);
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="text-center sm:mt-5">
                  <div className="mt-2">
                    <form action="#">
                      <Tab.Group>
                        {({ selectedIndex }) => (
                          <>
                            <Tab.List className="flex items-center">
                              <Tab
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                                      : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                                    "px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                                  )
                                }
                              >
                                Write
                              </Tab>
                              <Tab
                                className={({ selected }) =>
                                  classNames(
                                    selected
                                      ? "text-gray-900 bg-gray-100 hover:bg-gray-200"
                                      : "text-gray-500 hover:text-gray-900 bg-white hover:bg-gray-100",
                                    desc || file.length > 0
                                      ? "text-indigo-500"
                                      : "",
                                    "ml-2 px-3 py-1.5 border border-transparent text-sm font-medium rounded-md"
                                  )
                                }
                              >
                                Preview
                              </Tab>

                              {/* These buttons are here simply as examples and don't actually do anything. */}
                              {selectedIndex === 0 ? (
                                <div className="ml-auto flex items-center space-x-5">
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                    >
                                      <span className="sr-only">
                                        Insert link
                                        <input
                                          accept="image/*"
                                          className="input"
                                          id="contained-button-list-file"
                                          multiple
                                          type="file"
                                          onChange={(e) => handleFile(e)}
                                        />
                                      </span>
                                      <label
                                        htmlFor="contained-button-list-file"
                                        className="cursor-pointer"
                                      >
                                        <LinkIcon
                                          className="h-5 w-5"
                                          aria-hidden="true"
                                        />
                                      </label>
                                    </button>
                                  </div>
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                    >
                                      <span className="sr-only">
                                        Insert code
                                      </span>
                                      <CodeIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                  <div className="flex items-center">
                                    <button
                                      type="button"
                                      className="-m-2.5 w-10 h-10 rounded-full inline-flex items-center justify-center text-gray-400 hover:text-gray-500"
                                    >
                                      <span className="sr-only">
                                        Mention someone
                                      </span>
                                      <AtSymbolIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    </button>
                                  </div>
                                </div>
                              ) : null}
                            </Tab.List>
                            <Tab.Panels className="mt-2">
                              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                <label htmlFor="comment" className="sr-only">
                                  Comment
                                </label>
                                <div>
                                  <textarea
                                    rows={5}
                                    name="comment"
                                    id="comment"
                                    className="shadow-sm focus:ring-rose-500 focus:border-rose-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="Write something..."
                                    value={desc}
                                    onChange={(e) => setDesc(e.target.value)}
                                  />
                                </div>
                              </Tab.Panel>
                              <Tab.Panel className="p-0.5 -m-0.5 rounded-lg">
                                <div className="border-b">
                                  <div className="mx-px mt-px px-3 pb-4 text-sm leading-5 text-gray-800">
                                    {/* Gallery */}
                                    <section
                                      className="mt-2 pb-16"
                                      aria-labelledby="gallery-heading"
                                    >
                                      <h2
                                        id="gallery-heading"
                                        className="sr-only"
                                      >
                                        Recently viewed
                                      </h2>
                                      <ul
                                        role="list"
                                        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
                                      >
                                        {(file || []).map((file, index) => (
                                          <li key={index} className="relative">
                                            <div
                                              onClick={() =>
                                                revokeFile(file.name)
                                              }
                                              className={classNames(
                                                file.current
                                                  ? "ring-2 ring-offset-2 ring-indigo-500"
                                                  : "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500",
                                                "group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden relative"
                                              )}
                                            >
                                              <label className="relative text-sm leading-4 font-medium text-red-500 pointer-events-none">
                                                <span>Delete</span>
                                              </label>
                                              <img
                                                src={URL.createObjectURL(file)}
                                                alt=""
                                                id="mobile-user-photo"
                                                className={classNames(
                                                  file.current
                                                    ? ""
                                                    : "group-hover:opacity-75",
                                                  "object-cover pointer-events-none"
                                                )}
                                              />
                                              <button
                                                type="button"
                                                className="absolute inset-0 focus:outline-none"
                                              >
                                                <span className="sr-only">
                                                  View details for {file.name}
                                                </span>
                                              </button>
                                            </div>
                                          </li>
                                        ))}
                                      </ul>
                                      <div className="flex mt-4">
                                        <span className="text-base">
                                          {desc ? desc : "No description"}
                                        </span>
                                      </div>
                                    </section>
                                  </div>
                                </div>
                              </Tab.Panel>
                            </Tab.Panels>
                          </>
                        )}
                      </Tab.Group>
                    </form>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:col-start-2 sm:text-sm"
                  onClick={(e) => handleNewPost(e)}
                >
                  Post
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Cancel
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
