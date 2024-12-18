"use client"

import React from "react";
import Header from "app/(components)/login-header/header";
import ChatUI from "components/companyComponents/chatComponent/chatUI";
import AuthHOC, { Role } from "components/common/auth/authHoc";

export default function Page() {


  return (
    <AuthHOC role={Role.Company} >
    <div className="h-screen">
      {/* Header */}
      <Header />

      {/* Chat UI */}
      <div className="bg-gray-100">
        <div className="w-full mt">
          <ChatUI />
        </div>
      </div>
    </div>
    </AuthHOC>
  );
}
