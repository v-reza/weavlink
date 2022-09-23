import { useDispatch, useSelector } from "react-redux";

const useNotif = () => {
  const { isNotification, title, isError, message } = useSelector(
    (state) => state.Notifications
  );
  const dispatch = useDispatch();

  const handleError = (message) => {
    dispatch({
      type: "NOTIF_ERROR",
      title: "Error",
      message: message,
    });
  };
  return { isNotification, title, isError, message, dispatch, handleError };
};

export default useNotif;
