/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/outline";
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import { useCookies } from "react-cookie";
import axios from "axios";
import useGlobal from "@/hooks/useGlobal";

export default function RememberLogout({ open, setOpen }) {
  const { dispatch } = useAuth();
  const { user } = useUser();
  const [cookies, setCookie, removeCookie] = useCookies();
  const { selector } = useGlobal();

  const rememberAndSignout = () => {
    const myEmail = user.email.split("@");
    const data = [
      {
        id: user._id,
        username: user.firstname + " " + user.lastname,
        profilePicture: user.profilePicture,
        email: myEmail[0][0] + "****" + "@" + myEmail[1],
        ipAddress: selector?.ipAddress,
      },
    ];

    setCookie(
      "remembertoken",
      cookies.remembertoken?.length > 0
        ? [
            ...cookies.remembertoken.filter((item) => item.id !== data[0].id),
            data[0],
          ]
        : data,
      { path: "/" }
    );
    dispatch({ type: "LOGOUT" });
    setOpen(false)
  };
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
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
            <Dialog.Overlay className="fixed inset-0 bg-slate-800 bg-opacity-60 transition-opacity" />
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
            <div className="inline-block align-bottom bg-slate-800 border border-slate-600 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div className="space-y-2">
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 sm:text-sm"
                  onClick={() => rememberAndSignout()}
                >
                  Remember & Sign Out
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-rose-600 text-base font-medium text-white hover:bg-rose-700 sm:text-sm"
                  onClick={() => {
                    dispatch({ type: "LOGOUT" });
                    setOpen(false);
                  }}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
