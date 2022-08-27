import { Fragment, useEffect, useState } from "react";
import { UsersIcon } from "@heroicons/react/outline";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { axiosGet } from "@utils/axiosInstance";
import { useRouter } from "next/router";
import useAuth from "@hooks/useAuth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SearchModal({ open, setOpen }) {
  const [query, setQuery] = useState("");
  const { user: currentUser } = useAuth();
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getListUser = async () => {
      const res = await axiosGet("/users");
      setUser(res.data.filter((user) => user._id !== currentUser?._id));
    };
    getListUser();
  }, [currentUser?._id]);


  const filteredUser =
    query === ""
      ? []
      : user.filter((user) => {
          return (
            user.firstname.toLowerCase().includes(query.toLowerCase()) ||
            user.lastname.toLowerCase().includes(query.toLowerCase()) 
          );
        });
  const router = useRouter();
  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setQuery("")}>
      <Dialog
        as="div"
        className="fixed inset-0 z-60 overflow-y-auto p-4 sm:p-6 md:p-20 xs:mt-16 md:mt-0 sm:mt-16"
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className="mx-auto max-w-xl transform rounded-xl bg-white p-2 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all"
            onChange={(user) => {
              router.push(
                user.username
                  ? "/profile/" + user.username
                  : "/profile/" +
                      (user.firstname + user.lastname + "-" + user._id)
                        .replace(" ", "-")
                        .toLowerCase(),
                null,
                { shallow: true }
              );
              setOpen(false);
            }}
          >
            <Combobox.Input
              className="w-full rounded-md border-0 bg-gray-100 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-500 focus:ring-0"
              placeholder="Search..."
              onChange={(event) => setQuery(event.target.value)}
            />

            {filteredUser.length > 0 && (
              <Combobox.Options
                static
                className="-mb-2 max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
              >
                {filteredUser.map((person) => (
                  <Combobox.Option
                    key={person._id}
                    value={person}
                    className={({ active }) =>
                      classNames(
                        "cursor-default select-none rounded-md px-4 py-2",
                        active && "bg-indigo-600 text-white"
                      )
                    }
                  >
                    {person.firstname} {person.lastname}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}

            {query !== "" && filteredUser.length === 0 && (
              <div className="py-14 px-4 text-center sm:px-14">
                <UsersIcon
                  className="mx-auto h-6 w-6 text-gray-400"
                  aria-hidden="true"
                />
                <p className="mt-4 text-sm text-gray-900">
                  No people found using that search term.
                </p>
              </div>
            )}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
