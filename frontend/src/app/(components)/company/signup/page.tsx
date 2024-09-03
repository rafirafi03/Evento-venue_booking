"use client"

import React, { useMemo, useState } from 'react'
import Header from '../../login-header/header'
import Image from 'next/image'
import { FaLock, FaUserAlt } from 'react-icons/fa';
import countryList from 'react-select-country-list'
import Select from 'react-select'

const Page = () => {

    const [companyName, setCompanyName] = useState<string>('')
    const [email, setEmail] = useState<string>("");
    const [city, setCity] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [phone, setPhone] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [license, setLicense] = useState<string>("");

    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(),[])

  const changeHandler = (value: string) => {
    setValue(value)
  }

  return (
    <div>
              <Header />
              <div className="min-h-screen flex items-center justify-center bg-slate-100 pt-32 pb-10">
                <div className="flex display-flex transform transition duration-500 hover:scale-105">
                  <div className="shadow-lg shadow-black w-full max-w-md">
                    <Image
                      src="/assets/images/intrologin-user.jpeg"
                      alt=""
                      width={500}
                      height={1000}
                      className="h-full object-cover"
                    />
                  </div>

                  <div className="bg-white p-8 shadow-lg w-full max-w-md">
                    <h4 className="text-xl font-sans font-bold mb-6 text-center text-gray-800">
                      Register your account
                    </h4>
                    <div className="mb-4 relative">
                      <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        id="userName"
                        type="text"
                        placeholder="Enter company name here..."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                      {/* <div className="text-red-600 text-xs ml-5">{error}</div> */}
                    </div>
                    <div className="mb-4 relative">
                    <Select options={options} value={value} onChange={changeHandler} />

                    </div>
                    <div className="mb-4 relative">
                      <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        id="city"
                        type=""
                        placeholder="Enter your email"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                    <div className="mb-4 relative">
                      <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        id="phone"
                        type="number"
                        placeholder="Enter your phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="mb-6 relative">
                      <FaLock className="absolute left-3 top-3 text-gray-400" />
                      <input
                        className="pl-10 pr-4 py-2 rounded-lg shadow-sm border font-light focus:outline-none focus:border-indigo-500 w-full"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                    <div className="mb-6 relative">
                      <FaLock className="absolute left-3 top-3 text-gray-400" />
                      <input
                        className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        id="confirmPassword"
                        type="password"
                        placeholder="confirm password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        // onClick={handleSubmit}
                        type="button"
                        className="bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
                      >
                        signup
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-600">
                        already have an account?
                        <span
                        //   onClick={handleOnClick}
                          className='text-[rgb(255,0,0)] font-bold cursor-pointer'
                        >
                          {" "}  Log in
                        </span>
                      </p>
                    </div>

                    <hr className="shadow-md mt-5" />
                  </div>
                </div>
              </div>

    </div>
  )
}

export default Page
