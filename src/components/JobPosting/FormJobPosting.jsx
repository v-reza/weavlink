import { useNavigate } from "react-router-dom";
import { useState } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function FormJobPosting() {
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [visiblePasswordKonfirmasi, setVisiblePasswordKonfirmasi] =
    useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordKonfirmasi, setPasswordKonfirmasi] = useState("");
  const [isToast, setToast] = useState(false);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <>
      <div className="bg-white py-8 px-2 shadow sm:rounded-lg sm:px-10 border border-1">
        <form className="space-y-6" action="#" method="POST">
          <div>
            <label
              htmlFor="companyname"
              className="block text-sm font-medium text-gray-700"
            >
              Company Name*
            </label>
            <div className="mt-1">
              <input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                type="text"
                required
                className="appearance-none block w-full px-2 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="companyPhone"
              className="block text-sm font-medium text-gray-700"
            >
              Company Phone*
            </label>
            <div className="mt-1">
              <input
                value={companyPhone}
                onChange={(e) => setCompanyPhone(e.target.value)}
                type="number"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="company-website"
              className="block text-sm font-medium text-gray-700"
            >
              Company Website*
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                https://
              </span>
              <input
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                type="text"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300"
                placeholder="www.example.com"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="companyaddress"
              className="block text-sm font-medium text-gray-700"
            >
              Company Address*
            </label>
            <div className="mt-1">
              <textarea
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                rows={3}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="companydescription"
              className="block text-sm font-medium text-gray-700"
            >
              Company Description*
            </label>
            <div className="mt-1">
              <textarea
                value={companyDescription}
                onChange={(e) => setCompanyDescription(e.target.value)}
                rows={3}
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email*
            </label>
            <div className="mt-1">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
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
                <input className="hidden js-password-toggle" type="checkbox" />
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
              type="button"
              className={classNames(
                // isLoading
                //   ? "cursor-not-allowed bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
                //   : "cursor-pointer",
                "w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              )}
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
