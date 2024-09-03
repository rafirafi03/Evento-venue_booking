"use client"

import React, { useEffect, useState } from 'react'
import Header from '../../login-header/header'
import Aside from '../aside/page';
import Approval from '../approval/page'
import { useRouter } from 'next/navigation';

export default function Page() {

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authAdminToken')
    if(!token) {
      router.replace('/admin/login')
    }
  },[router])

  const handleLogout = ()=> {
    localStorage.removeItem('authAdminToken');
    router.replace('/admin/login')
  }

  return (
    <div>
      <Header/>

      <Aside handleLogout={handleLogout}/>

      <Approval/>
    </div>
  )
}
