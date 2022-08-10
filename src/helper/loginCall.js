import { axiosPost } from "./axiosHelper";
const loginCall = async (userCredentials, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axiosPost("/auth/company-login", userCredentials);
    console.log(res)
    dispatch({
      type: "LOGIN_SUCCESS",
      payload: res.data.user,
      token: res.data.token,
    });
  } catch (error) {
    dispatch({ type: "LOGIN_FAILURE", payload: error });
  }
};

export default loginCall;
