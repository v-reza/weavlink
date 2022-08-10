import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import Toast from "../../components/custom/Toast/Toast";
import Loading from "../../components/custom/Loading/Loading";
import { axiosPut } from "../../helper/axiosHelper";
import useAuth from "../../hooks/useAuth";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function GoogleSetPassword() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordKonfirmasi, setVisiblePasswordKonfirmasi] =
    useState(false);
  const [password, setPassword] = useState("");
  const [passwordKonfirmasi, setPasswordKonfirmasi] = useState("");
  const [isToast, setToast] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { isLoading, googleSetUser, dispatch } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!password || !passwordKonfirmasi) {
      setError(true);
      setMessage("Semua field harus diisi");
      setToast(true);
      return;
    }

    if (password !== passwordKonfirmasi) {
      setError(true);
      setToast(true);
      setMessage("Password dan konfirmasi password tidak sama");
      return;
    }

    const res = await axiosPut("/auth/google-set-password", {
      email: googleSetUser.email,
      password: password,
    });

    if (res.data.statusCode === 404) {
      setError(true);
      setToast(true);
      setMessage(res.data.message);
      return;
    }

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data.user,
      token: res.data.token,
    });
  };

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
            Buat password kamu
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 border border-1">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
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
                      className="bg-white rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="passwordkonfirmasi"
                  className="block text-sm font-medium text-gray-700"
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
                      className="bg-white rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
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
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
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
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toast
        open={isToast}
        setOpen={setToast}
        message={message}
        variant={error ? "error" : "success"}
      />
      <Loading open={loading} setOpen={setLoading} />
    </>
  );
}
