import OtherAuth from "./OtherAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Toast from "../../components/custom/Toast/Toast";
import loginCall from "../../helper/loginCall";
import useAuth from "../../hooks/useAuth";
export default function Login() {
  const navigate = useNavigate();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isToast, setToast] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(false);
  const { dispatch, error: err } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!emailOrPhone || !password) {
        setError(true);
        setMessage("Semua field harus diisi");
        setToast(true);
        return;
      }
      await loginCall(
        {
          email: emailOrPhone,
          password: password,
        },
        dispatch
      );
    } catch (error) {
      setError(true);
      setToast(true);
      setMessage(error.message);
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
      <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Masuk
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
                  Email atau nomor ponsel
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
                <div className="text-sm" onClick={() => navigate("/register")}>
                  <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                    Belum punya akun?
                  </div>
                </div>
                <div className="text-sm">
                  <div className="cursor-pointer font-medium text-indigo-600 hover:text-indigo-500">
                    Lupa Password?
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={(e) => handleLogin(e)}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Masuk
                </button>
              </div>
            </form>
            <OtherAuth />
          </div>
        </div>
      </div>
      <Toast
        open={isToast}
        setOpen={setToast}
        message={message}
        variant={error ? "error" : "success"}
      />
    </>
  );
}
