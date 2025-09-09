'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import NewRoomPopup from '../../component/chat/createRoom';
import getMyChat from '../../util/chat'

export default function ChatLayout({ children }) {
  const [chats, setChats] = useState([]);
  const [ showNewRoomPopup, setShowNewRoomPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Load user's chats on component mount
    const loadChats = async () => {
      try {
        // Replace with your actual getMyChat() function
        const userChats = await getMyChat();
        // console.log("checking user chats:- ", userChats);
        setChats(userChats);
        
        // Mock data for demonstration
        // const mockChats = [
        //   {
        //     id: '1',
        //     name: 'John Doe',
        //     lastMessage: 'Hey, how are you?',
        //     timestamp: '2:30 PM',
        //     avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff'
        //   },
        //   {
        //     id: '2',
        //     name: 'Jane Smith',
        //     lastMessage: 'See you tomorrow!',
        //     timestamp: '1:15 PM',
        //     avatar: 'https://ui-avatars.com/api/?name=Jane+Smith&background=6366F1&color=fff'
        //   },
        //   {
        //     id: '3',
        //     name: 'Team Discussion',
        //     lastMessage: 'Great work everyone!',
        //     timestamp: '12:45 PM',
        //     avatar: 'https://ui-avatars.com/api/?name=Team&background=10B981&color=fff'
        //   }
        // ];
        // setChats(mockChats);
      } catch (error) {
        console.error('Error loading chats:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChats();
  }, []);

  const handleChatClick = (chatId) => {
    router.push(`/chat/${chatId}`);
  };

  return (
    <div className="flex w-screen h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className=" p-4 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Messages</h1>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-4">
              <div className="animate-pulse space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-2">
              {chats.data.chatRooms.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => handleChatClick(chat.id)}
                  className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                >
                  <img
                    src={chat.avatar}
                    alt={'img'}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900 truncate">
                        {chat.name}
                      </h3>
                      <span className="text-xs text-gray-500">
                        {chat.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate mt-1">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Create New Chat Button */}
        <div className="p-4 border-t border-gray-200">
          <button onClick={() => setShowNewRoomPopup(true)} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2">
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
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>New Chat</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* New Room Popup */}
      <NewRoomPopup 
        isOpen={showNewRoomPopup} 
        onClose={() => setShowNewRoomPopup(false)} 
      />
    </div>
  );
}