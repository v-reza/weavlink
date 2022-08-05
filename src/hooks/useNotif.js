import { useContext } from "react";
import { NotificationContext } from "../redux/context/NotificationContext";

const useNotif = () => useContext(NotificationContext);

export default useNotif;
