/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { Fragment, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { axiosGet } from "../../helper/axiosHelper";
import useAuth from "../../hooks/useAuth";
import ProfileComp from "../../components/Profile/Profile";

const team = [
  {
    name: "Leslie Alexander",
    handle: "lesliealexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Michael Foster",
    handle: "michaelfoster",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Dries Vincent",
    handle: "driesvincent",
    role: "Manager, Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    name: "Lindsay Walton",
    handle: "lindsaywalton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Profile() {
  const { username } = useParams();
  const userId = username.split("-").pop();
  const [user, setUser] = useState([]);
  const [userProfile, setUserProfile] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [refreshProfile, setRefreshProfile] = useState(false);
  const { user: currentUser } = useAuth();
  const location = useLocation();

  const usernameProfile = user.firstname + user.lastname + "-" + user._id;

  const tabs = [
    {
      name: "Profile",
      href: "#",
      current:
        location.pathname ===
        "/profile/" + usernameProfile.replace(" ", "-").toLowerCase()
          ? true
          : false,
    },
    { name: "Experience", href: "#", current: false },
    { name: "Education", href: "#", current: false },
    { name: "Skills", href: "#", current: false },
  ];

  useEffect(() => {
    document.title = user.firstname + " " + user.lastname + " | Velkey";
  }, [user.firstname, user.lastname]);

  useEffect(() => {
    const getUser = async () => {
      const res = await axiosGet("/users/" + userId);
      setUser(res.data);
    };
    getUser();
    setRefreshProfile(false);
  }, [userId, refreshProfile]);

  useEffect(() => {
    const getUserProfile = async () => {
      const res = await axiosGet("/userprofile/" + userId);
      setUserProfile(res.data);
    };
    getUserProfile();
    setRefreshProfile(false);
  }, [userId, refreshProfile]);

  return (
    <>
      <div className="h-full flex">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none xl:order-last">
              <ProfileComp
                currentUser={currentUser}
                tabs={tabs}
                team={team}
                user={user}
                userProfile={userProfile}
                setRefreshProfile={setRefreshProfile}
              />
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
