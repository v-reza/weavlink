import React from "react";
import { signInWithGoogle } from "@/services/firebase";
import { useRouter } from "next/router";
import useAuth from "@/hooks/useAuth";
import { axiosPost } from "@/utils/axiosInstance";
import LoadingBackdrop from "@/uiComponents/Loading/LoadingBackdrop";
import useLoading from "@/hooks/useLoading";
import useNotif from "@/hooks/useNotif";

const Google = () => {
  const { dispatch } = useAuth();
  const router = useRouter();
  const { dispatch: dispatchLoading } = useLoading();
  const { dispatch: dispatchNotif } = useNotif();
  const handleGoogleLogin = async () => {
    try {
      const res = await signInWithGoogle();
      const { email, firstName, lastName, photoUrl } = res._tokenResponse;
      dispatchLoading({ type: "PROCESSING" });
      const resGoogle = await axiosPost("/auth/google-login", {
        email: email,
        firstname: firstName,
        lastname: lastName,
        profilePicture: photoUrl,
      });
      if (resGoogle.data.statusCode === 404) {
        dispatch({ type: "GOOGLE_SET_PASSWORD", payload: resGoogle.data.user });
        router.push("/auth/set-password");
      } else {
        dispatch({
          type: "LOGIN_SUCCESS",
          token: resGoogle.data.token,
        });
      }
      dispatchLoading({ type: "FINISHED" });
    } catch (error) {
      dispatchNotif({
        type: "NOTIF_ERROR",
        title: "Error",
        message: error.message
      })
    }
  };
  return (
    <div>
      <div className="mt-6">
        <div className="relative">
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-transparent rounded-md text-slate-300">
              Or sign in with google
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3">
          <div>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a
              onClick={handleGoogleLogin}
              className="cursor-pointer bg-slate-700/20 w-full inline-flex items-center justify-center py-2 px-4 border border-slate-600 rounded-md shadow-sm text-sm font-medium text-slate-300 hover:bg-slate-800"
            >
              <span className="sr-only">Sign in with Google</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                //   width={20}
                //   height={20}
                fill="currentColor"
                //   className="bi bi-google"
                viewBox="0 0 20 20"
              >
                {" "}
                <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" />{" "}
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Google;
