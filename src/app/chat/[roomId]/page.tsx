'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';
import {socket} from '../../../lib/socket';
import { Message } from '@/interface';
import { useAuth } from '@/context/AuthContext';


// structure of message
type FetchMessagesResponse = {
  success: boolean;
  message: string;
  data: Message[];
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  timestamp: string;
};


export default function ChatRoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const {user, token} = useAuth();
  // console.log(user);
  
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {

    // only run if we have both values
    if (!roomId || !token) return;

    const fetchMessages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat/rooms/${roomId}/messages`,
          {
            headers: { Authorization: token ? token : "" },
          }
        );

        if (!res.ok) {
          throw new Error(`Server returned ${res.status}`);
        }

        const data:FetchMessagesResponse = await res.json();

        setMessages(data.data); // update UI state
        console.log("data:", data);
      } catch (err) {
        console.error("Failed to load messages", err);
      }
    };

    fetchMessages();
  }, [roomId, token, setMessages]); // run whenever roomId or token changes


  useEffect(() => {

    socket.connect();

    // listen for incoming messages from server
    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    // optional: notify server which room you’re in
    socket.emit("joinRoom", { roomId: "abc123" });

    return () => {
      socket.off("message");
      socket.disconnect();
    };
  },[])



  useEffect(() => {
    socket.on("connect", () => console.log("🔗 Socket connected", socket.id));

    socket.on("new_message", (msg) => {
      console.log("📩 Incoming new_message:", msg);
    });

    socket.on("error", (err) => console.error("⚠️ Socket error:", err));

    return () => {
      socket.off("new_message");
      socket.off("connect");
      socket.off("error");
    };
  }, []);




  useEffect(() => {
    

    // listen on client
    socket.connect();

    socket.emit("join_room", { roomId: roomId });

    socket.on("message", (msg) => {
      setMessages((prev) => [...prev, { ...msg, isCurrentUser: msg.sender_id === user?.id }]);
    });

    setLoading(false);

    return () => {
      socket.off("message");
      socket.disconnect();
    };

  }, [roomId]);





  // scroll to bottom
  useEffect(() => {
    // Scroll to bottom when new messages are added
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };



  // handle sending messages
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // payload for server
    const payload = {
      roomId: roomId,   // keep this in state / prop
      content: newMessage,
      replyToId: null,
    };

    // send to backend
    socket.emit("send_message", payload);

    if(!user) return;

    setMessages((prev) => [
      ...prev,
      {
        id: user.id, // or from server
        chat_room_id: roomId as string, // assuming payload has roomId
        sender_id: user?.id, // your current user's id
        content: newMessage,
        message_type: "text",
        file_url: null,
        reply_to_id: null,
        edited_at: null,
        is_deleted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        sender: user,
        replyTo: null,
      },
    ]);

    setNewMessage("");
  };





  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Chat Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Chat Room {roomId}
        </h2>
        
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            {/* User Avatar */}
            <img
              src={message.sender?.avatar}
              alt={message.sender?.name}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            
            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.sender_id == user?.id 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              
              {/* Timestamp */}
              <p className="text-xs text-gray-500 mt-1 ml-1">
                {message.createdAt}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 p-4">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition-colors duration-200"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}