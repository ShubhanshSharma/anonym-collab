"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface RoomContextType {
  roomName: string | null;
  roomId: string | null;
  roomParticipants: string[];
  lastMessage: string | null;
  adminName: string | null;
  setRoom: (room: Partial<RoomContextType>) => void;
  setRoomName: (name: string | null) => void;
  setRoomId: (id: string | null) => void;
  setRoomParticipants: (participants: string[]) => void;
  setLastMessage: (message: string | null) => void;
  setAdminName: (admin: string | null) => void;
  clearRoom: () => void;
}

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export function RoomProvider({ children }: { children: ReactNode }) {
  const [roomName, setRoomName] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [roomParticipants, setRoomParticipants] = useState<string[]>([]);
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [adminName, setAdminName] = useState<string | null>(null);

  const setRoom = (room: Partial<RoomContextType>) => {
    if (room.roomName !== undefined) setRoomName(room.roomName);
    if (room.roomId !== undefined) setRoomId(room.roomId);
    if (room.roomParticipants !== undefined)
      setRoomParticipants(room.roomParticipants);
    if (room.lastMessage !== undefined) setLastMessage(room.lastMessage);
    if (room.adminName !== undefined) setAdminName(room.adminName);
  };

  const clearRoom = () => {
    setRoomName(null);
    setRoomId(null);
    setRoomParticipants([]);
    setLastMessage(null);
    setAdminName(null);
  };

  return (
    <RoomContext.Provider
      value={{
        roomName,
        roomId,
        roomParticipants,
        lastMessage,
        adminName,
        setRoom,
        setRoomName,
        setRoomId,
        setRoomParticipants,
        setLastMessage,
        setAdminName,
        clearRoom,
      }}
    >
      {children}
    </RoomContext.Provider>
  );
}

export function useRoom() {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoom must be used within a RoomProvider");
  }
  return context;
}
