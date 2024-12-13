'use client'

import { useState, useRef, useEffect } from 'react'
import { Send, Search } from 'lucide-react'

type Message = {
  id: number
  text: string
  sender: 'user' | 'contact'
  timestamp: string
}

type User = {
  id: number
  name: string
  avatar: string
  lastMessage: string
}

export default function ImprovedChatUI() {
  const [users] = useState<User[]>([
    { id: 1, name: 'Alice Johnson', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Hello there!' },
    { id: 2, name: 'Bob Smith', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'How are you?' },
    { id: 3, name: 'Carol White', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'See you soon!' },
  ])

  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleUserSelect = (user: User) => {
    setSelectedUser(user)
    setMessages([
      { id: 1, text: `Hi, this is ${user.name}. How can I help you?`, sender: 'contact', timestamp: '10:00 AM' },
    ])
  }

  const handleSendMessage = () => {
    if (inputMessage.trim() !== '' && selectedUser) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
      setMessages(prevMessages => [...prevMessages, newMessage])
      setInputMessage('')
      
      // Simulate response
      setTimeout(() => {
        const response: Message = {
          id: Date.now(),
          text: `This is a simulated response from ${selectedUser.name}.`,
          sender: 'contact',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prevMessages => [...prevMessages, response])
      }, 1000)
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* User List */}
      <div className="w-1/4 bg-white border-r border-gray-200 mt-16">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          {users.map(user => (
            <div 
              key={user.id} 
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${selectedUser?.id === user.id ? 'bg-gray-100' : ''}`}
              onClick={() => handleUserSelect(user)}
            >
              <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full mr-3" />
              <div>
                <h3 className="font-semibold">{user.name}</h3>
                <p className="text-sm text-gray-500 truncate">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col mt-16">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 flex items-center border-b border-gray-200">
              <img src={selectedUser.avatar} alt={selectedUser.name} className="w-10 h-10 rounded-full mr-3" />
              <h2 className="font-semibold">{selectedUser.name}</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto p-4 space-y-4" ref={messagesContainerRef}>
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                        message.sender === 'user' 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-red-200' : 'text-gray-400'}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 border-t border-gray-200">
              <div className="flex items-center">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  placeholder="Type your message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-red-500 text-white p-2 rounded-r-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-lg">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  )
}

