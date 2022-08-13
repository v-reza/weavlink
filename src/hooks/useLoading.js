import { useContext } from "react";
import { LoadingContext } from "../redux/context/LoadingContext";

const useLoading = () => useContext(LoadingContext);

export default useLoading;
