'use client'

import {
  FaLock,
  FaUserAlt,
  FaGoogle,
  FaApple,
  FaFacebook,
} from "react-icons/fa";
import Header from "../../login-header/header";
import Image from "next/image";
import { useState } from "react";

const Page = () => {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [pass, setPass] = useState('')
  const [confirmPass, setConfirmPass] = useState('')

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
            <form>
              <div className="mb-4 relative">
                <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                  id="userName"
                  type="text"
                  placeholder="Enter your userName"
                  value={userName}
                  onChange={(e)=> setUserName(e.target.value)}
                />
              </div>
              <div className="mb-4 relative">
                <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4 relative">
                <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                  id="phone"
                  type="number"
                  placeholder="Enter your phone"
                />
              </div>
              <div className="mb-6 relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="pl-10 pr-4 py-2 rounded-lg shadow-sm border font-light focus:outline-none focus:border-indigo-500 w-full"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="mb-6 relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                  id="password"
                  type="password"
                  placeholder="confirm password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                  signup
                </button>
              </div>
            </form>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                already have an account?
                <a
                  href="/signup"
                  className="text-indigo-500 hover:text-indigo-700 font-semibold"
                >
                  {" "}
                  Log in
                </a>
              </p>
            </div>

            <hr className="shadow-md mt-5" />

            {/* Sign In Options */}
            <div className="mt-6">
              <p className="text-center text-gray-600 mb-2">Or sign in with</p>
              <div className="flex justify-center space-x-4">
                <button className="flex items-center justify-center bg-white border border-gray-200  rounded-full p-2 shadow-md hover:bg-blue-600 transform transition duration-500 hover:scale-105">
                  <FaGoogle className="text-black hover:text-white" size={24} />
                </button>
                <button className="flex items-center justify-center bg-white border border-gray-200  rounded-full p-2 shadow-md hover:bg-black transform transition duration-500 hover:scale-105">
                  <FaApple className="text-black hover:text-white" size={24} />
                </button>
                <button className="flex items-center justify-center bg-white border border-gray-200  rounded-full p-2 shadow-md hover:bg-blue-800 transform transition duration-500 hover:scale-105">
                  <FaFacebook className="text-black hover:text-white" size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
