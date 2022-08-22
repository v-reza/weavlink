import { useDispatch, useSelector } from "react-redux";

const useGlobal = () => {
  const selector = useSelector((state) => state.Global);
  const dispatch = useDispatch();
  return { selector, dispatch };
};

export default useGlobal;
