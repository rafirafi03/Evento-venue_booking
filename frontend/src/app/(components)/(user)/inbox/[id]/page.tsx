"use client"

import React from "react";
import Header from "components/userComponents/header";
import ChatUI from "components/common/chatComponent/chatComponent";
import AuthHOC, { Role } from "components/common/auth/authHoc";

export default function Page({ params }: { params: { id: string } }) {

  const {id} = params;

  return (
    <AuthHOC role={Role.User} >
    <div className="h-screen">
      {/* Header */}
      <Header />

      {/* Chat UI */}
      <div className="bg-gray-100">
        <div className="w-full">
          <ChatUI receiverId={id} />
        </div>
      </div>
    </div>
    </AuthHOC>
  );
}
