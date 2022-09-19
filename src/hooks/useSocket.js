import { SocketContext } from "@/context/SocketContext";
import { useContext } from "react";

const useSocket = () => useContext(SocketContext);

export default useSocket;
