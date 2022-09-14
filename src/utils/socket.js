import { io } from "socket.io-client"

const server = process.env.NEXT_APP_API

const socket = io(server, {
  transports: ["websocket"],
})

export default socket