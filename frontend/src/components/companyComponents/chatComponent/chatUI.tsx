"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Send, Search } from "lucide-react";
import { socket } from "utils/socket";
import { getUserIdFromToken } from "utils/tokenHelper";
import { useGetUsersQuery } from "app/store/slices/userApiSlices";
import { useGetMessagesQuery } from "app/store/slices/chatApiSlices";
import Image from "next/image";
import debounce from "lodash/debounce";

// import socket from 'utils/socket'

type Message = {
  id: number;
  text: string;
  sender: "company" | "user";
  timestamp: string;
  senderId: string | null;
  receiverId: string | undefined;
};

type User = {
  _id: string;
  userName: string;
  email: string;
  phone: number;
};

export default function ChatComponent() {
  const searchParams = useSearchParams();
  const filter = {
    search : searchParams.get("search")
  }
    
  const router = useRouter();
  const companyId = getUserIdFromToken("authCompanyToken");

  useEffect(() => {
    const search = searchParams.get("search") || "";
    setSearchValue(search);
  }, [searchParams]);

  const { data: user } = useGetUsersQuery(filter);

  console.log("users:", user);

  const users = user?.users?.users;
  console.log("users:", users);

  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const handelFilter = useMemo(
    () =>
      debounce(() => {
        const params = new URLSearchParams();

        if (searchValue) params.set("search", searchValue);

        router.push(`/company/inbox?${params.toString()}`);
      }, 500),
    [searchValue, router]
  );

  useEffect(() => {
    handelFilter();

    return () => handelFilter.cancel();
  }, [searchValue, handelFilter]);

  const { data: chatMessages } = useGetMessagesQuery({
    userId: companyId,
    receiverId: selectedUserId,
  });

  console.log(chatMessages, "chatmessagesssss");

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages?.response);
    }
  }, [chatMessages]);

  useEffect(() => {
    // Connect to socket
    socket.connect();

    // Listen for messages
    socket.on("receive_message", (message: Message) => {
      if (message.sender !== "company") {
        setMessages((prevMessages) => [...prevMessages, message]);
      }
    });

    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleUserSelect = (user: User) => {
    setSelectedUserId(user._id);
    setSelectedUser(user);

    // Join the chat room for the selected user
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "" && selectedUser) {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: "company",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        senderId: companyId,
        receiverId: selectedUser?._id,
      };
      socket.emit("send_message", newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* User List */}
      <div className="w-1/4 bg-white border-r border-gray-200 mt-16">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
            />
            <Search
              className="absolute left-3 top-2.5 text-gray-400"
              size={20}
            />
          </div>
        </div>
        <div className="overflow-y-auto h-[calc(100vh-73px)]">
          {users?.map((user: User) => (
            <div
              key={user._id}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
                selectedUser?._id === user._id ? "bg-gray-100" : ""
              }`}
              onClick={() => handleUserSelect(user)}
            >
              <Image
                src={`https://ui-avatars.com/api/?name=${
                  user.userName || "User"
                }&background=random`}
                alt={user.userName}
                className="w-10 h-10 rounded-full mr-3"
                width={500}
                height={500}
              />
              <div>
                <h3 className="font-semibold">{user.userName}</h3>
                <p className="text-sm text-gray-500 truncate">{user.email}</p>
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
              <Image
                src={`https://ui-avatars.com/api/?name=${
                  selectedUser?.userName || "User"
                }&background=random`}
                alt={selectedUser.userName}
                className="w-10 h-10 rounded-full mr-3"
                width={500}
                height={500}
              />
              <h2 className="font-semibold">{selectedUser.userName}</h2>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <div
                className="h-full overflow-y-auto p-4 space-y-4"
                ref={messagesContainerRef}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "company"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                        message.sender === "company"
                          ? "bg-red-500 text-white"
                          : "bg-white border border-gray-200"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`text-xs mt-1 ${
                          message.sender === "company"
                            ? "text-red-200"
                            : "text-gray-400"
                        }`}
                      >
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
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 p-1.5 border border-gray-300 rounded-l-lg"
                  placeholder="Type your message..."
                />
                <button
                  onClick={handleSendMessage}
                  className="bg-red-500 text-white p-2 rounded-r-lg hover:bg-red-600 focus:outline-none"
                >
                  <Send size={22} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-gray-500 text-lg">
              Select a user to start chatting
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
