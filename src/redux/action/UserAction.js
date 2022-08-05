export const LoginStart = () => ({
  type: "LOGIN_START",
});

export const LoginSuccess = (user) => ({
  type: "LOGIN_SUCCESS",
  payload: user,
});

export const LoginFailure = () => ({
  type: "LOGIN_FAILURE",
});

export const UpdateProfileInformation = (user) => ({
  type: "UPDATE_PROFILE_INFORMATION",
  payload: user,
});
