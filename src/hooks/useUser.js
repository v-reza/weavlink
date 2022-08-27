import { useDispatch, useSelector } from "react-redux";

const useUser = () => {
  const { user } = useSelector((state) => state.User);
  const dispatch = useDispatch();

  return { user, dispatch };
};
export default useUser;
