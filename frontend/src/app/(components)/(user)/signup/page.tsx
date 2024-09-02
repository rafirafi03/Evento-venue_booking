"use client";

import {
  FaLock,
  FaUserAlt,
  FaGoogle,
  FaApple,
  FaFacebook,
} from "react-icons/fa";
import Header from "../../login-header/header";
import OtpModal from "../OtpModal/page";
import Skl from "../../skeleton/page";
import Image from "next/image";
import { useState } from "react";
import {
  useRegisterPostMutation,
  useVerifyOtpMutation,
} from "@/app/store/slices/userApiSlices";
import { CgPassword } from "react-icons/cg";

const Page = () => {
  const [registerUser] = useRegisterPostMutation();
  const [confirmOtp] = useVerifyOtpMutation();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [modal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (userName === "") {
      setError("userName required");
    } else {
      console.log(email, "email frontend");
      setLoading(true);
      const res = await registerUser({ email }).unwrap();
      setLoading(false);
      if (res) {
        setModal(true);
      }
      console.log(res, "ressssssssssssss");
    }
  };

  const handleOtp = async (event: React.FormEvent, otp: string) => {
    console.log(password, "passpass");

    const res = await confirmOtp({
      otp,
      email,
      userName,
      phone,
      password,
    }).unwrap();

    if (res) {
      console.log("true");
    } else {
      console.log("false");
    }
  };

  return (
    <div>
      {modal ? (
        <OtpModal email={email} handleOtp={handleOtp} />
      ) : (
        <>
          {isLoading ? (
            <Skl />
          ) : (
            <>
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
                        placeholder="Enter your userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                      <div className="text-red-600 text-xs ml-5">{error}</div>
                    </div>
                    <div className="mb-4 relative">
                      <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                      <input
                        className="pl-10 pr-4 py-2 rounded-lg font-light shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        onChange={(e) => setPass(e.target.value)}
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
                        onClick={handleSubmit}
                        type="button"
                        className="bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
                      >
                        signup
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-600">
                        already have an account?
                        <a
                          href="/login"
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
                      <p className="text-center text-gray-600 mb-2">
                        Or sign in with
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button className="flex items-center justify-center bg-white border border-gray-200  rounded-full p-2 shadow-md hover:bg-blue-600 transform transition duration-500 hover:scale-105">
                          <FaGoogle
                            className="text-black hover:text-white"
                            size={24}
                          />
                        </button>
                        <button className="flex items-center justify-center bg-white border border-gray-200  rounded-full p-2 shadow-md hover:bg-black transform transition duration-500 hover:scale-105">
                          <FaApple
                            className="text-black hover:text-white"
                            size={24}
                          />
                        </button>
                        <button className="flex items-center justify-center bg-white border border-gray-200  rounded-full p-2 shadow-md hover:bg-blue-800 transform transition duration-500 hover:scale-105">
                          <FaFacebook
                            className="text-black hover:text-white"
                            size={24}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
