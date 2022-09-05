const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        token: null,
        isLoading: true,
        error: false,
        isAuthenticated: false,
        isGoogleSetPassword: false,
        googleSetUser: null,
      };
    case "LOGIN_SUCCESS":
      return {
        isLoading: false,
        error: false,
        token: action.token,
        isAuthenticated: true,
        isGoogleSetPassword: false,
        googleSetUser: null,
      };
    case "LOGIN_FAILURE":
      return {
        isLoading: false,
        error: true,
        token: null,
        isAuthenticated: false,
        isGoogleSetPassword: false,
        googleSetUser: null,
      };
    case "LOGOUT":
      return {
        isLoading: false,
        error: false,
        token: null,
        isAuthenticated: false,
        isGoogleSetPassword: false,
        googleSetUser: null,
      };
    case "GOOGLE_LOGIN":
      return {
        isLoading: false,
        error: false,
        token: action.token,
      };
    case "GOOGLE_SET_PASSWORD":
      return {
        isLoading: false,
        error: false,
        isGoogleSetPassword: true,
        googleSetUser: action.payload,
      };
    case "SET_REMEMBER_TOKEN":
      return {
        ...state,
        rememberToken: action.payload,
      }
    case "DELETE_REMEMBER_TOKEN": {
      return {
        ...state,
        rememberToken: null,
      }
    }
    default:
  }
};

export default UserReducer;
