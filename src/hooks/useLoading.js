import { useDispatch, useSelector } from "react-redux";

const useLoading = () => {
  const { isLoading, finished, progressBar } = useSelector((state) => state.Loading);
  const dispatch = useDispatch();

  return { isLoading, finished, progressBar, dispatch };
};
export default useLoading;
