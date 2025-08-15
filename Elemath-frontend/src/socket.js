import { io } from "socket.io-client";

const socket = io("http://localhost:3000", {
  withCredentials: true // ✅ needed to send cookies
});

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

socket.on("message", (msg) => {
  console.log("Server says:", msg);
});


socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

export default socket; // Ensure socket is exported as the default export