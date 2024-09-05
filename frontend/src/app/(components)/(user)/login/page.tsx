'use client'

import { FaLock, FaUserAlt, FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import Header from "../../login-header/header";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginPostMutation } from "@/app/store/slices/userApiSlices";

const Page = () => {
  const router = useRouter();

  const [loginMutation] = useLoginPostMutation()

  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(""); 
    console.log("Login successful!");

    try {
      const res = await loginMutation({email, password}).unwrap()

      if(res.success) {
        router.push('/')
      }
    } catch (error) {
      console.log(error)
    }

  };

  const handleOnClick = () => {
    router.push("/signup");
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-slate-100 pt-20">
        <div className="flex display-flex transform transition duration-500 hover:scale-105">
          <div className="shadow-lg w-full max-w-md">
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
              Login to your account
            </h4>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4">
                {error}
              </div>
            )}
            <div className="mb-4 relative">
              <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6 relative">
              <FaLock className="absolute left-3 top-3 text-gray-400" />
              <input
                className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPass(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                onClick={(e) => handleLogin(e)}
                className="bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don't have an account?
                <span
                  onClick={handleOnClick}
                  className="text-[rgb(255,0,0)] font-bold cursor-pointer"
                >
                  {" "}
                  Sign up
                </span>
              </p>
            </div>

            <hr className="shadow-md mt-5" />


            <div className="mt-6">
              <p className="text-center text-gray-600 mb-2">Or sign in with</p>
              <div className="flex flex-col space-y-4">
                <button className="flex items-center justify-start bg-white text-black py-2 px-4 rounded-lg font-semibold border border-gray-200 shadow-md hover:bg-blue-600 hover:text-white transform transition duration-300 w-full">
                  <FaGoogle className="mr-2" />
                  <span className="flex-grow text-center">Sign in with Google</span>
                </button>
                <button className="flex items-center justify-start bg-white text-black border border-gray-200 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 hover:text-white transform transition duration-300 w-full">
                  <FaFacebook className="mr-2" />
                  <span className="flex-grow text-center">Sign in with Facebook</span>
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
