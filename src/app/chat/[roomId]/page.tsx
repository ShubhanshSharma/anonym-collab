'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams } from 'next/navigation';

export default function ChatRoomPage() {
  const { roomId } = useParams();
  const [messages, setMessages] = useState<{ id: string; userId: string; userName: string; userAvatar: string; message: string; isCurrentUser: boolean; timestamp: string}[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Load chat messages when component mounts or roomId changes
    const loadChatMessages = async () => {
      try {
        // Replace with your actual getChatFromId() function
        // const chatData = await getChatFromId(roomId);
        // setMessages(chatData.messages);
        
        // Mock data for demonstration
        const mockMessages = [
          {
            id: '1',
            userId: 'user1',
            userName: 'John Doe',
            userAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
            message: 'Hey there! How are you doing?',
            timestamp: '2:30 PM',
            isCurrentUser: false
          },
          {
            id: '2',
            userId: 'current',
            userName: 'You',
            userAvatar: 'https://ui-avatars.com/api/?name=You&background=6366F1&color=fff',
            message: 'Hi John! I\'m doing great, thanks for asking. How about you?',
            timestamp: '2:32 PM',
            isCurrentUser: true
          },
          {
            id: '3',
            userId: 'user1',
            userName: 'John Doe',
            userAvatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff',
            message: 'I\'m doing well too! Working on some exciting projects.',
            timestamp: '2:35 PM',
            isCurrentUser: false
          },
          {
            id: '4',
            userId: 'current',
            userName: 'You',
            userAvatar: 'https://ui-avatars.com/api/?name=You&background=6366F1&color=fff',
            message: 'That sounds awesome! I\'d love to hear more about what you\'re working on.',
            timestamp: '2:37 PM',
            isCurrentUser: true
          }
        ];
        setMessages(mockMessages);
      } catch (error) {
        console.error('Error loading chat:', error);
      } finally {
        setLoading(false);
      }
    };

    if (roomId) {
      loadChatMessages();
    }
  }, [roomId]);

  useEffect(() => {
    // Scroll to bottom when new messages are added
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here you would typically send the message via socket.io
      // For now, we'll just add it to the local state
      const message = {
        id: Date.now().toString(),
        userId: 'current',
        userName: 'You',
        userAvatar: 'https://ui-avatars.com/api/?name=You&background=6366F1&color=fff',
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
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
              src={message.userAvatar}
              alt={message.userName}
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />
            
            {/* Message Content */}
            <div className="flex-1 min-w-0">
              <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isCurrentUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-900'
              }`}>
                <p className="text-sm">{message.message}</p>
              </div>
              
              {/* Timestamp */}
              <p className="text-xs text-gray-500 mt-1 ml-1">
                {message.timestamp}
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