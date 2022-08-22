import { useDispatch, useSelector } from "react-redux";

const useNotif = () => {
  const { isNotification, title, isError, message } = useSelector(
    (state) => state.Notifications
  );
  const dispatch = useDispatch();
  return { isNotification, title, isError, message, dispatch };
};

export default useNotif;
