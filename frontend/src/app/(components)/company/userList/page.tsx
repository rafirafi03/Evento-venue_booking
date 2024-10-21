import Header from 'app/(components)/login-header/header'
import Aside from 'app/(components)/company/aside/page'
import React from 'react'

export default function page() {
  return (
    <>
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px]">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside/>
        </aside>
        <div className="flex-1 p-4 bg-slate-100">
            <div>users</div>
        </div>
      </div></>
  )
}
