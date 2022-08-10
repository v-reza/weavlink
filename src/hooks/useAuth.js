import { useContext } from "react";
import { UserContext } from "../redux/context/UserContext";

const useAuth = () => useContext(UserContext)

export default useAuth