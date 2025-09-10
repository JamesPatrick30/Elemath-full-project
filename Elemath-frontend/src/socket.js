import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE, {
  withCredentials: true, // ✅ needed to send cookies
  autoConnect: false, // don’t connect immediately
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