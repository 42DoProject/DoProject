import io from "socket.io-client";

const socket = io(`wss://${process.env.REACT_APP_BACKEND_DOMAIN}`, {
  transports: ["websocket"],
});

socket.onAny((e) => {
  console.log(e);
});

export default socket;
