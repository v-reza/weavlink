const UserReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        token: null,
        isLoading: true,
        error: false,
        isAuthenticated: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isLoading: false,
        error: false,
        token: action.token,
        isAuthenticated: true,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isLoading: false,
        error: true,
        token: null,
        isAuthenticated: false,
      };
    case "LOGOUT":
      return {
        user: null,
        isLoading: false,
        error: false,
        token: null,
        isAuthenticated: false,
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
    default:
  }
};

export default UserReducer;
