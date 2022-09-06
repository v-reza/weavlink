/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { Fragment, useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { axiosPost } from "@/utils/axiosInstance";
import { useRouter } from "next/router";
import useNotif from "@/hooks/useNotif";
import Notification from "@/uiComponents/Notification";
import useLoading from "@/hooks/useLoading";
import LoadingBackdrop from "@/uiComponents/Loading/LoadingBackdrop";
import Google from "@/components/Other/Auth/Google";
import Image from "next/image";
import { useCookies } from "react-cookie";
import axios from "axios";
import Card from "@/uiComponents/Card";
import { Menu, Transition } from "@headlessui/react";
import { DotsVerticalIcon } from "@heroicons/react/outline";
import classNames from "@/utils/classNames";
import DotsLoader from "@/uiComponents/DotsLoader";
export default function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isToast, setToast] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const { dispatch, error: err, isAuthenticated } = useAuth();
  const router = useRouter();
  const { dispatch: dispatchNotif } = useNotif();
  const { dispatch: dispatchLoading } = useLoading();
  const [cookies, setCookie, removeCookie] = useCookies();
  const [myIpAddress, setMyIpAddress] = useState(null);
  const [myRememberUser, setMyRememberUser] = useState([]);
  const [rememberUser, setRememberUser] = useState(false);

  useEffect(() => {
    const getMyIpAddress = async () => {
      const res = await axios.get("https://geolocation-db.com/json/");
      setMyIpAddress(res.data.IPv4);
    };
    getMyIpAddress();
  }, []);

  useEffect(() => {
    setMyRememberUser(
      cookies?.remembertoken?.filter((item) => item.ipAddress === myIpAddress)
    );
    setRememberUser(cookies?.remembertoken?.length > 0 ? true : false);
  }, [cookies?.remembertoken, myIpAddress]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    setTimeout(() => {
      if (myRememberUser?.length === 0) {
        setRememberUser(false);
      }
    }, 1500)
  }, [myRememberUser])

  const handleLoginRemember = async (id) => {
    try {
      dispatchLoading({ type: "LOADING" });
      await axiosPost("/auth/login-remember", {
        userId: id,
      }).then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          token: res.data.token,
        });
        dispatchLoading({ type: "FINISHED" });
        router.push("/");
      });
    } catch (error) {
      dispatchLoading({ type: "FINISHED" });
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message,
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (rememberUser) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: "Please choose one account to login",
        });
        return;
      }
      if (!emailOrPhone || !password) {
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: "Please fill all fields",
        });
        return;
      }
      dispatchLoading({ type: "PROCESSING" });
      const data = {
        email: emailOrPhone,
        password: password,
      };
      await axiosPost("/auth/login", data).then((res) => {
        dispatch({
          type: "LOGIN_SUCCESS",
          token: res.data.token,
        });
        dispatchLoading({ type: "FINISHED" });
        router.push("/");
      });
    } catch (error) {
      dispatchLoading({ type: "FINISHED" });
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Invalid email or password",
      });
    }
  };

  useEffect(() => {
    if (err) {
      setError(true);
      setToast(true);
      setMessage("Email atau password salah");
    }
  }, [err]);

  const keydownEnter = (e) => {
    if (e.keyCode === 13) {
      handleLogin(e);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keydownEnter);

    return () => {
      document.removeEventListener("keydown", keydownEnter);
    };
  }, [keydownEnter]);

  // const RenderLogin = () => {
  //   return (

  //   );
  // };

  // return !rememberUser ? (
  return (
    <>
      {rememberUser ? (
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              className="bg-amber-400 rounded-md mx-auto h-12 w-auto"
              src="/weavlink-logo.png"
              alt="Logo"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-200">
              Welcome Back
            </h2>
            <div className="mt-8">
              <Card rounded="xs">
                <div className="border border-slate-600">
                  {myRememberUser.length > 0 ? (
                    myRememberUser?.map((item) => (
                      <div
                        key={item.id}
                        className="flex cursor-pointer hover:bg-slate-700/20 bg-slate-700/30 py-2"
                      >
                        <div
                          onClick={() => handleLoginRemember(item.id)}
                          className="flex w-full"
                        >
                          <div className="flex-shrink-0 px-2">
                            <img
                              className="h-10 w-10 rounded-full"
                              src={
                                item.profilePicture
                                  ? item.profilePicture
                                  : "/avatar.png"
                              }
                              referrerPolicy="no-referrer"
                              alt=""
                            />
                          </div>
                          <div className="min-w-0 flex-1 ml-4 space-x-2">
                            <div className="text-sm ">
                              <p className="text-left font-medium text-slate-200 ">
                                {item.username}
                              </p>
                              <p className="text-left truncate text-xs text-slate-300">
                                {item.email}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0 w-max flex-1 flex items-end justify-end  self-center ">
                          <Menu
                            as="div"
                            className="relative inline-block text-left"
                          >
                            <div>
                              <Menu.Button className="-m-2 p-2 rounded-full flex items-center text-gray-400 hover:text-gray-600">
                                <span className="sr-only">Open options</span>
                                <DotsVerticalIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              </Menu.Button>
                            </div>

                            <Transition
                              as={Fragment}
                              enter="transition ease-out duration-100"
                              enterFrom="transform opacity-0 scale-95"
                              enterTo="transform opacity-100 scale-100"
                              leave="transition ease-in duration-75"
                              leaveFrom="transform opacity-100 scale-100"
                              leaveTo="transform opacity-0 scale-95"
                            >
                              <Menu.Items className="z-50 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1 z-20">
                                  <Menu.Item>
                                    {({ active }) => (
                                      <div
                                        onClick={() => {
                                          if (
                                            cookies?.remembertoken?.length === 1
                                          ) {
                                            removeCookie("remembertoken", {
                                              path: "/",
                                            });
                                            console.log("keluar cookie");
                                          } else {
                                            console.log("masuk cookie");
                                            setCookie(
                                              "remembertoken",
                                              cookies?.remembertoken?.filter(
                                                (cookie) =>
                                                  cookie.id !== item.id
                                              ),
                                              { path: "/" }
                                            );
                                          }
                                        }}
                                        className={classNames(
                                          active
                                            ? "bg-gray-100 text-gray-900"
                                            : "text-gray-700",
                                          "cursor-pointer flex px-4 py-2 text-sm z-20 "
                                        )}
                                      >
                                        <span>Forget this account</span>
                                      </div>
                                    )}
                                  </Menu.Item>
                                </div>
                              </Menu.Items>
                            </Transition>
                          </Menu>
                        </div>
                      </div>
                    ))
                  ) : (
                    <DotsLoader
                      className="flex items-center justify-center overflow-hidden"
                      color="grey"
                    />
                  )}
                </div>
                <div
                  onClick={() => setRememberUser(false)}
                  className="mt-1 flex cursor-pointer hover:bg-slate-700/20 bg-slate-700/30 py-2 rounded-md"
                >
                  <div className="flex flex-shrink-0 px-2">
                    <img
                      className="h-10 w-10 rounded-full"
                      src="/avatar.png"
                      referrerPolicy="no-referrer"
                      alt=""
                    />
                    <p className="text-center flex items-center justify-center ml-4 font-medium text-slate-400 text-sm">
                      Log in with another account
                    </p>
                  </div>
                  {/* <div className="min-w-0 ml-4 space-x-2">
                  <div className="text-sm flex items-center justify-center "></div>
                </div> */}
                </div>
              </Card>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Notification />
          <LoadingBackdrop />
          <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
              <img
                className="bg-amber-400 rounded-md mx-auto h-12 w-auto"
                src="/weavlink-logo.png"
                alt="Logo"
              />
              <h2 className="mt-6 text-center text-3xl font-extrabold text-slate-200">
                Sign in
              </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
              <div className="bg-slate-800/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-700">
                <form className="space-y-6" action="#" method="POST">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Email or phone number
                    </label>
                    <div className="mt-1">
                      <input
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        type="text"
                        required
                        className="bg-slate-700/20 appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent text-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-slate-300"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        autoComplete="current-password"
                        required
                        className="bg-slate-700/20 appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent text-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <div
                        className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500"
                        onClick={() =>
                          router.push("/auth/register", null, { shallow: true })
                        }
                      >
                        Dont Have Account?
                      </div>
                    </div>
                    <div className="text-sm">
                      <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                        Forgot Password?
                      </div>
                    </div>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={(e) => handleLogin(e)}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <Google />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
  // ) : (
  // <RenderMyRememberUser />
  // );
}
