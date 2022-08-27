import { useEffect, useState } from "react";
import useAuth from "@hooks/useAuth";
import { axiosPost } from "@utils/axiosInstance";
import { useRouter } from "next/router";
import useNotif from "@hooks/useNotif";
import Notification from "@uiComponents/Notification";
import useLoading from "@hooks/useLoading";
import LoadingBackdrop from "@uiComponents/Loading/LoadingBackdrop";
import Google from "@components/Other/Auth/Google";
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

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
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
  return (
    <>
      <Notification />
      <LoadingBackdrop />
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 text-white">
            Sign in
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-1">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email or phone number
                </label>
                <div className="mt-1">
                  <input
                    value={emailOrPhone}
                    onChange={(e) => setEmailOrPhone(e.target.value)}
                    type="text"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
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
    </>
  );
}
