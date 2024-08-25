import React from 'react'
import Header from '../../login-header/header'
import Aside from '../aside/page';
import Approval from '../approval/page'

export default function page() {
  return (
    <div>
      <Header/>

      <Aside/>

      <Approval/>
    </div>
  )
}
