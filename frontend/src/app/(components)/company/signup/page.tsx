"use client"

import React, { useMemo, useState } from 'react'
import Image from 'next/image'
import { FaLock, FaUserAlt } from 'react-icons/fa';
import { FiUpload } from 'react-icons/fi'
import countryList from 'react-select-country-list'
import Select from 'react-select'
import { useRegisterPostMutation } from '@/app/store/slices/companyApiSlices';

const Page = () => {

  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>("");
  const [country, setCountry] = useState<{label: string, value: string} | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [license, setLicense] = useState<string>("");

  const [registerCompany] = useRegisterPostMutation()

  const options = useMemo(() => countryList().getData(), [])

  const handleCountryChange = (selectedOption: any) => {
    console.log(selectedOption)
    setCountry(selectedOption);
  };

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const handleSubmit = async ()=> {
    try {
      const res = await registerCompany({name,email,phone,country: country?.label,password}).unwrap()

      console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="flex h-screen">
     
      <div className="w-1/3 h-full">
        <Image
          src="/assets/images/intrologin-user.jpeg"
          alt="Signup Image"
          className="w-full h-full object-cover"
          width={50}
          height={50}
        />
      </div>

      <div className="w-2/3 h-full flex items-center justify-center bg-white">
        <div className="w-3/4 max-w-lg">
          {/* Logo and Company Name */}
          <div className="mb-6">
            <div className="flex items-center mb-7">
              <Image
                src="/assets/images/evento-logo.png" 
                alt="Company Logo"
                className="h-12 w-12 mr-3"
                width={50}
                height={50}
              />
              <h1 className="text-3xl  font-bold font-georgia text-[rgb(255,0,0)]">Evento</h1>
            </div>
            <p className="text-gray-600 mt-2 font-bold mb-6">
              Welcome to <span className='font-georgia font-bold text-[rgb(255,0,0)]'>Evento</span>
            </p>
            <p className="text-gray-600 mt-2">
              Please fill out the form below to sign up and wait for admin to approve.
            </p>
          </div>

          
            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                  Company Name
                </label>
                <input
                  id="name"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-purple-300"
                  placeholder="Company Name"
                  value={name}
                  onChange={(e)=> setName(e.target.value)}
                />
              </div>
              <div className="w-1/2 px-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                  placeholder="Email"
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e)=> setPhone(e.target.value)}
                />
              </div>
              <div className="w-1/2 px-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
                  Country
                </label>
                <Select
                  id="country"
                  options={options}
                  value={country}
                  onChange={handleCountryChange}
                  className="w-full"
                  classNamePrefix="react-select"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                  placeholder="Password"
                  value={password}
                  onChange={(e)=> setPassword(e.target.value)}
                />
              </div>
              <div className="w-1/2 px-2">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                  placeholder="Confirm Password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                />
              </div>
            </div>

            <div className="w-full px-2 mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="license">
                Upload License
              </label>
              <div className="relative flex items-center justify-center w-full h-12 px-4 py-2 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500">
                <input
                  id="license"
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex items-center">
                  <FiUpload className="mr-2 text-gray-400" size={20} />
                  <span className="text-gray-600 text-sm">
                    {selectedFile ? selectedFile.name : 'Choose a file'}
                  </span>
                </div>
              </div>
              {selectedFile && (
                <p className="mt-2 text-sm text-gray-600">
                  Selected file: {selectedFile.name}
                </p>
              )}
            </div>

            <div className="mb-6">
              <button
                onClick={handleSubmit}
                className="w-full bg-[rgb(255,0,0)] text-white py-2 rounded-md hover:bg-black focus:outline-none"
              >
                Sign Up
              </button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Page
