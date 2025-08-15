// socket.js
import { io } from 'socket.io-client';

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Socket connected with ID:", socket.id);  // Log socket ID for debugging
});

socket.on("disconnect", () => {
  console.log("Socket disconnected");
});

export default socket; // Ensure socket is exported as the default export