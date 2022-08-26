const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        isLoading: true,
        error: false,
        isAuthenticated: false,
        isGoogleSetPassword: false,
        googleSetUser: null,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isLoading: false,
        error: false,
        token: action.token,
        isAuthenticated: true,
        isGoogleSetPassword: false,
        googleSetUser: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isLoading: false,
        error: true,
        token: null,
        isAuthenticated: false,
        isGoogleSetPassword: false,
        googleSetUser: null,
      };
    case "LOGOUT":
      return {
        user: null,
        isLoading: false,
        error: false,
        token: null,
        isAuthenticated: false,
        isGoogleSetPassword: false,
        googleSetUser: null,
      };
    case "GOOGLE_LOGIN":
      return {
        user: action.payload,
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
    case "UPDATE_PROFILE_INFORMATION":
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    case "NEW_COMPANY_START":
      return {
        ...state,
        isNewCompany: true,
      };
    case "NEW_COMPANY_PROCESS":
      return {
        ...state,
        isNewCompany: true,
        dataNewCompany: action.payload,
      };
    case "NEW_COMPANY_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: false,
        token: action.token,
        isAuthenticated: true,
        isNewCompany: false,
      };
    default:
  }
};

export default UserReducer;
