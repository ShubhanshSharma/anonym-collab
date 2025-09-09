// lib/socket.ts
import { io } from "socket.io-client";

// use NEXT_PUBLIC_ so it’s available client-side
export const socket = io(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000", {
  autoConnect: false,
  auth: {
    token: typeof window !== "undefined" ? localStorage.getItem("token") : undefined,
  },
});
