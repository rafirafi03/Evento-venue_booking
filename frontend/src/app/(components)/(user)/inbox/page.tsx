import React from "react";
import Header from "components/userComponents/header";
import ChatUI from "components/common/chatComponent/chatComponent";

export default function Page() {
  return (
    <div className="h-screen">
      {/* Header */}
      <Header />

      {/* Chat UI */}
      <div className="bg-gray-100">
        <div className="w-full">
          <ChatUI />
        </div>
      </div>
    </div>
  );
}
