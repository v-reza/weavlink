const NotificationReducer = (state, action) => {
  switch (action.type) {
    case "NOTIF_SUCCESS":
      return {
        isNotification: true,
        title: action.title,
        isError: false,
        message: action.message,
      };
    case "NOTIF_ERROR":
      return {
        isNotification: true,
        title: action.title || "Something went wrong",
        isError: true,
        message: action.message,
      };
    case "CLOSE_NOTIF":
      return {
        isNotification: false,
        title: "",
        isError: false,
        message: "",
      };
    default:
  }
};

export default NotificationReducer;
