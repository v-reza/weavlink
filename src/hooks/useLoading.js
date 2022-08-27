import { useDispatch, useSelector } from "react-redux";

const useLoading = () => {
  const { isLoading, finished } = useSelector((state) => state.Loading);
  const dispatch = useDispatch();

  return { isLoading, finished, dispatch };
};
export default useLoading;
