/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { axiosPost } from "@/utils/axiosInstance";
import Google from "@/components/Other/Auth/Google";
import useLoading from "@/hooks/useLoading";
import useNotif from "@/hooks/useNotif";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Register() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordKonfirmasi, setVisiblePasswordKonfirmasi] =
    useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordKonfirmasi, setPasswordKonfirmasi] = useState("");
  const [phone, setPhone] = useState("");

  const { dispatch, isAuthenticated } = useAuth();
  const { isLoading, dispatch: dispatchLoading } = useLoading();
  const { dispatch: dispatchNotif } = useNotif();

  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordKonfirmasi) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Password not match with confirm password",
      });
      return;
    } else if (!firstname || !lastname || !email || !password || !phone) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: "Please fill all fields",
      });
      return;
    } else {
      try {
        dispatchLoading({
          type: "PROCESSING",
        });
        const res = await axiosPost("/auth/register", {
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: password,
          phone: phone,
        });
        dispatch({
          type: "LOGIN_SUCCESS",
          token: res.data.token,
        });
        dispatchLoading({
          type: "FINISHED",
        });
      } catch (error) {
        dispatchLoading({
          type: "FINISHED",
        });
        dispatchNotif({
          type: "NOTIF_ERROR",
          title: "Error",
          message: error.response.data.message,
        });
      }
    }
  };

  return (
    <>
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/logo_large.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign Up
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-slate-800/50 py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-slate-700">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="firstname"
                  className="block text-sm font-medium text-slate-300"
                >
                  Firstname
                </label>
                <div className="mt-1">
                  <input
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    required
                    className="bg-slate-700/20 appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent text-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastname"
                  className="block text-sm font-medium text-slate-300"
                >
                  Lastname
                </label>
                <div className="mt-1">
                  <input
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    required
                    className="bg-slate-700/20 appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent text-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-300"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    required
                    className="bg-slate-700/20 appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent text-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="nomorponsel"
                  className="block text-sm font-medium text-slate-300"
                >
                  Phone Number
                </label>
                <div className="mt-1">
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
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
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <input
                      className="hidden js-password-toggle"
                      id="toggle"
                      type="checkbox"
                    />
                    <label
                      onClick={() => setVisiblePassword(!visiblePassword)}
                      className="bg-transparent text-slate-300 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                      htmlFor="toggle"
                    >
                      {visiblePassword ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </label>
                  </div>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type={visiblePassword ? "text" : "password"}
                    required
                    className="bg-slate-700/20 appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent text-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="passwordkonfirmasi"
                  className="block text-sm font-medium text-slate-300"
                >
                  Password Konfirmasi
                </label>
                <div className="relative mt-1">
                  <div className="absolute inset-y-0 right-0 flex items-center px-2">
                    <input
                      className="hidden js-password-toggle"
                      type="checkbox"
                    />
                    <label
                      onClick={() =>
                        setVisiblePasswordKonfirmasi(!visiblePasswordKonfirmasi)
                      }
                      className="bg-transparent text-slate-300 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
                      htmlFor="toggle"
                    >
                      {visiblePasswordKonfirmasi ? (
                        <VisibilityOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </label>
                  </div>
                  <input
                    value={passwordKonfirmasi}
                    onChange={(e) => setPasswordKonfirmasi(e.target.value)}
                    type={visiblePasswordKonfirmasi ? "text" : "password"}
                    required
                    className="bg-slate-700/20 appearance-none block w-full px-3 py-2 border border-slate-600 rounded-md shadow-sm placeholder-transparent text-slate-200 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div
                  className="text-sm"
                  onClick={() =>
                    router.push("/auth/login", null, { shallow: true })
                  }
                >
                  <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                    Already have an account?
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
                  disabled={isLoading}
                  onClick={(e) => handleRegister(e)}
                  type="button"
                  className={classNames(
                    isLoading
                      ? "cursor-not-allowed bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
                      : "cursor-pointer",
                    "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  )}
                >
                  Daftar
                </button>
              </div>
            </form>
            <Google />
          </div>
        </div>
      </div>
    </>
  );
}
