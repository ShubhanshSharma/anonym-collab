'use client';

import { useState } from 'react';

export default function NewRoomPopup({ isOpen, onClose }) {
  const [emailInput, setEmailInput] = useState('');
  const [participants, setParticipants] = useState([]);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleAddParticipant = () => {
    setError('');
    
    if (!emailInput.trim()) {
      setError('Please enter an email address');
      return;
    }

    if (!validateEmail(emailInput.trim())) {
      setError('Please enter a valid email address');
      return;
    }

    if (participants.includes(emailInput.trim())) {
      setError('This email is already added');
      return;
    }

    if (participants.length >= 5) {
      setError('Maximum 5 participants allowed');
      return;
    }

    setParticipants(prev => [...prev, emailInput.trim()]);
    setEmailInput('');
  };

  const handleRemoveParticipant = (emailToRemove) => {
    setParticipants(prev => prev.filter(email => email !== emailToRemove));
    setError('');
  };

  const handleCreateRoom = () => {
    if (participants.length === 0) {
      setError('Please add at least one participant');
      return;
    }

    // For now, just show alert as requested
    alert(`Creating room with participants: ${JSON.stringify(participants)}`);
    
    // Reset form and close popup
    handleClose();
  };

  const handleClose = () => {
    setEmailInput('');
    setParticipants([]);
    setError('');
    onClose();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddParticipant();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-xs bg-opacity-50 z-40"
        onClick={handleClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Room
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Add Participant Section */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add Participants
              </label>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter client's email"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={participants.length >= 5}
                />
                <button
                  onClick={handleAddParticipant}
                  disabled={participants.length >= 5}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors"
                >
                  Add
                </button>
              </div>
              
              {/* Error Message */}
              {error && (
                <p className="text-red-500 text-sm mt-2">{error}</p>
              )}
              
              {/* Participant Count */}
              <p className="text-gray-500 text-sm mt-2">
                {participants.length}/5 participants added
              </p>
            </div>

            {/* Participants List */}
            {participants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Added Participants:
                </h3>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {participants.map((email, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm text-gray-800 truncate flex-1">
                        {email}
                      </span>
                      <button
                        onClick={() => handleRemoveParticipant(email)}
                        className="text-red-500 hover:text-red-700 ml-2 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 font-medium rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleCreateRoom}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Create Room
            </button>
          </div>
        </div>
      </div>
    </>
  );
}