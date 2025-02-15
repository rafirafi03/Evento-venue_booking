"use client"

import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { socket } from "utils/socket";
import { useGetCompanyDetailsQuery } from "app/store/slices/companyApiSlices";
import { getUserIdFromToken } from "utils/tokenHelper";
import { useGetMessagesQuery } from "app/store/slices/chatApiSlices";
import Image from "next/image";
import AuthHOC, { Role } from "../auth/authHoc";
import { useRouter } from "next/navigation";
import fetchErrorCheck from "utils/fetchErrorCheck";

type Message = {
  id: number;
  text: string;
  sender: "user" | "company";
  timestamp: Date;
  senderId: string | null;
  receiverId: string;
};

interface pageProps {
  receiverId: string;
}

export default function ChatComponent({ receiverId }: pageProps) {
  const router = useRouter();
  const userId = getUserIdFromToken("authUserToken");

  const { data: company } = useGetCompanyDetailsQuery(receiverId);

  const { data: chatMessages, error: messageFetchError } = useGetMessagesQuery({
    userId,
    receiverId,
  });

  useEffect(() => {
    const isError = fetchErrorCheck({ fetchError: messageFetchError, role: "user" });

    if(isError) {
      router.push('/login')
    }
  }, [messageFetchError, router]);

  console.log(chatMessages?.response, "messages");

  console.log(company, "venues");

  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const messagesContainerRef = useRef<HTMLDivElement>(null);

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
    if (!socket.connected) {
      console.log("Attempting socket connection");

      // Add connection event listeners
      socket.on("connect", () => {
        console.log("Socket connected successfully", socket.id);
      });

      socket.on("connect_error", (error) => {
        console.log("Socket connection error:", error);
      });

      socket.connect();
    }

    // Listen for messages
    const handleMessage = (message: Message) => {
      console.log(message, "received messageeee");
      if (message.sender !== "user") {
        setMessages((prevMessages) => {
          const messageTime = new Date(message.timestamp).getTime();
          const lastMessageTime =
            prevMessages.length > 0
              ? new Date(
                  prevMessages[prevMessages.length - 1].timestamp
                ).getTime()
              : 0;

          if (messageTime > lastMessageTime) {
            return [...prevMessages, message];
          }
          return prevMessages;
        });
      }
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage); // Make sure it's cleaned up properly
      if (socket.connected) {
        console.log("Disconnecting socket");
        socket.disconnect();
      }
    };
  }, []); // Empty dependency ensures it's connected only once

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage: Message = {
        id: Date.now(),
        text: inputMessage,
        sender: "user",
        timestamp: new Date(),
        senderId: userId,
        receiverId,
      };
      socket.emit("send_message", newMessage);

      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    }
  };

  return (
    <AuthHOC role={Role.User}>
      <div className="flex h-screen bg-gray-100">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col mt-16">
          <div className="bg-white p-4 flex items-center border-b border-gray-200">
            <Image
              src={`https://ui-avatars.com/api/?name=${company?.name}&background=random`}
              alt={company?.name}
              className="w-10 h-10 rounded-full mr-3"
              width={500}
              height={500}
            />
            <h2 className="font-semibold">{company?.name}</h2>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-hidden">
            <div
              className="h-full overflow-y-auto p-4 space-y-4"
              ref={messagesContainerRef}
            >
              {messages?.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl rounded-lg p-3 ${
                      message.sender === "user"
                        ? "bg-red-500 text-white"
                        : "bg-white border border-gray-200"
                    }`}
                  >
                    <p>{message.text}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.sender === "user"
                          ? "text-red-200"
                          : "text-gray-400"
                      }`}
                    >
                      {new Intl.DateTimeFormat("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }).format(new Date(message.timestamp))}
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
        </div>
      </div>
    </AuthHOC>
  );
}
