"use client"

import { FaLock, FaUserAlt, FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import Header from "../../login-header/header";
import Image from "next/image";
import { useState } from "react";
import { useAdminLoginMutation } from "@/app/store/slices/userApiSlices";
import { useRouter } from "next/navigation";

const Page = () => {

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [adminLogin] = useAdminLoginMutation()
  const router = useRouter()

  const handleLogin = async ()=> {
    try {
      const res = await adminLogin({email,password}).unwrap()

      if(res.success) {
        router.push('/admin/dashboard')
      }
    } catch (error) {
      console.log(error);
      
    }
  }

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

          <div className="bg-white justify-center pt-20 p-8 shadow-lg w-full max-w-md">
            <h4 className="text-xl font-sans font-bold mb-6 text-center text-gray-800">
              Welcome Admin
            </h4>
            <p className="text-base font-sans font-bold mb-6 text-center text-gray-500">Log in to admin page</p>
              <div className="mb-4 relative">
                <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value="email"
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
                  value="password"
                  onChange={(e)=> setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between">
                <button onClick={handleLogin} className="bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                  Login
                </button>
              </div>

            <hr className="shadow-md mt-5" />

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
