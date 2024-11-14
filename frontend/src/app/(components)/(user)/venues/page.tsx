import React from 'react'
import Header from 'components/userComponents/header'
import FilterSection from 'components/userComponents/filterSection'

export default function page() {
  return (
    <div>
      <div className="flex flex-col"> {/* Use flexbox for column layout */}
      <Header />
      <FilterSection/>
    </div>
    </div>
  )
}
