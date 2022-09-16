/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { Combobox } from "@headlessui/react";
import classNames from "@/utils/classNames";
import { axiosGet } from "@/utils/axiosInstance";
import useUser from "@/hooks/useUser";
import useGlobal from "@/hooks/useGlobal";
import io from "socket.io-client";
let socket
export default function ConversationsSearch({
  setSelectedConversation,
  setChatBoxOpen,
  setCurrentChat,
  conversation
}) {
  const [query, setQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const { selector, dispatch: dispatchGlobal} = useGlobal()
  const { user } = useUser();
  const server = "http://localhost:5000";
  
  useEffect(() => {
    socket = io(server);
    socket.connect();
    
    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on("getUsers", (data) => {
      dispatchGlobal({
        type: "GLOBAL_STATE",
        payload: {
          ...selector,
          userReceiver: data?.filter((item) => item.userId !== user?._id),
        }
      })
    });
  }, [selectedPerson, selector, user?._id])


  useEffect(() => {
    const getListUsers = async () => {
      try {
        const res = await axiosGet("/users/userSearch");
        setListUsers(res.data.filter((usr) => usr._id !== user?._id));
      } catch (error) {
        console.log(error);
      }
    };
    getListUsers();
  }, [user?._id]);

  const filteredPeople =
    query === ""
      ? []
      : listUsers.filter((user) => {
          return (
            user.firstname.toLowerCase().includes(query.toLowerCase()) ||
            user.lastname.toLowerCase().includes(query.toLowerCase())
          );
        });

  useEffect(() => {
    if (selectedPerson) {
      const filterConversations = conversation.find((conv) => conv.members.includes(selectedPerson._id));
      if (filterConversations) {
        setSelectedConversation(selectedPerson);
        setCurrentChat(filterConversations);
        setChatBoxOpen(true);
      } else {
        setSelectedConversation(selectedPerson);
        setChatBoxOpen(true);
        setCurrentChat(null)
        socket.emit("addUser", selectedPerson._id)
        dispatchGlobal({
          type: "GLOBAL_STATE",
          payload: {
            ...selector,
            receiverId: selectedPerson._id,
          }
        })
      }
    }
  }, [conversation, selectedPerson]);
  // console.log(selectedPerson);
  return (
    <Combobox as="div" value={selectedPerson} onChange={setSelectedPerson}>
      <div className="relative mt-1 p-3">
        <Combobox.Button className="absolute inset-y-0 left-0 flex items-center rounded-r-md px-6 focus:outline-none">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            data-supported-dps="16x16"
            fill="currentColor"
            className="text-slate-500"
            width="14"
            height="14"
            focusable="false"
          >
            <path d="M14.56 12.44L11.3 9.18a5.51 5.51 0 10-2.12 2.12l3.26 3.26a1.5 1.5 0 102.12-2.12zM3 6.5A3.5 3.5 0 116.5 10 3.5 3.5 0 013 6.5z"></path>
          </svg>
        </Combobox.Button>
        <Combobox.Input
          className="w-full rounded-md border border-slate-600 text-white bg-slate-700/50 py-2 pl-8 pr-10 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
          onChange={(event) => setQuery(event.target.value)}
          // displayValue={(person) => person?.name}
          placeholder="Search messages..."
        />

        <Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-slate-800 border border-slate-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {filteredPeople.length > 0 ? (
            filteredPeople.map((person) => (
              <Combobox.Option
                key={person._id}
                value={person}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-slate-700/50 text-white" : "text-slate-400"
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <img
                        src={person.profilePicture || "/avatar.png"}
                        alt=""
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={classNames(
                          "ml-3 truncate",
                          selected && "font-semibold"
                        )}
                      >
                        {person.firstname + " " + person.lastname}
                      </span>
                    </div>
                  </>
                )}
              </Combobox.Option>
            ))
          ) : (
            <Combobox.Option
              className={({ active }) =>
                classNames(
                  "relative cursor-default select-none py-2 pl-3 pr-9",
                  active ? "bg-indigo-600 text-white" : "text-gray-900"
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <div className="flex items-center">
                    <span
                      className={classNames(
                        "ml-3 truncate text-slate-200",
                        selected && "font-semibold"
                      )}
                    >
                      No results found
                    </span>
                  </div>
                </>
              )}
            </Combobox.Option>
          )}
        </Combobox.Options>
      </div>
    </Combobox>
  );
}
