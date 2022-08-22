import { NOTIF_SUCCESS, NOTIF_ERROR, CLOSE_NOTIF } from "../actions/AllAction";
const initalState = {
  isNotification: false,
  title: "",
  isError: false,
  message: "",
};

const NotificationReducer = (state = initalState, action) => {
  switch (action.type) {
    case NOTIF_SUCCESS: {
      return {
        ...state,
        isNotification: true,
        title: action.title,
        isError: false,
        message: action.message,
      };
    }
    case NOTIF_ERROR: {
      return {
        ...state,
        isNotification: true,
        title: action.title || "Something went wrong",
        isError: true,
        message: action.message,
      };
    }
    case CLOSE_NOTIF: {
      return {
        ...state,
        isNotification: false,
        title: "",
        isError: false,
        message: "",
      };
    }
    default:
      return state;
  }
};

export default NotificationReducer;
