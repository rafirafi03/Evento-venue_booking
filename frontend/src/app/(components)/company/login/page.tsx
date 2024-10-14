"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  useLoginPostMutation
} from "app/store/slices/companyApiSlices";
// import OtpModal from "../otpModal/page";
import { useRouter } from "next/navigation";

const Page = () => {

  const [loginMutation] = useLoginPostMutation()
  
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");


  const [error, setError] = useState<string>("");

  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const {name, value} = e.target;

      setError('')

      if(name == 'email') {
        setEmail(value);

        if (!validateEmail(value)) {
          setEmailError("Invalid email address");
        } else {
          setEmailError("");
        }
      } else {
        setPassword(value);

      if (value.trim() == "") {
        setPasswordError("password required");
      } else if (value.length < 6) {
        setPasswordError("Password must be 6 characters");
      } else {
        setPasswordError("");
      }
      }
  }

  const handleSubmit = async ()=> {
    try {

      let hasError = false;
      
      if(emailError || passwordError) {
        hasError = true;
      }

      if (hasError) return;

      const res = await loginMutation({email,password}).unwrap()

      if(!res.success) {
        console.log(res,"resinerror")
        setError(res.error)
      } else {
        router.push('/company/main')
      }

      console.log(res,"ress")
    } catch (error) {
      console.log(error)
    }
  }

  return (
        <>
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
                        <h1 className="text-3xl  font-bold font-georgia text-[rgb(255,0,0)]">
                          Evento
                        </h1>
                      </div>
                    </div>

                    <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                      <div className="space-y-6">
                        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                          Sign in to our platform
                        </h5>
                        {error && (
                        <p className="text-[rgb(255,0,0)] mt-2">{error}</p>
                       )}
                        <div>
                          <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your email
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-200 focus:border-red-200 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="Enter your email here..."
                            value={email}
                            onChange={handleChange}
                          />
                          {emailError && (
                          <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                            {" "}
                            {emailError}
                          </p>
                        )}
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                          >
                            Your password
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter password here..."
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-200 focus:border-red-200 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            value={password}
                            onChange={handleChange}
                          />
                          {passwordError && (
                          <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                            {" "}
                            {passwordError}
                          </p>
                        )}
                        </div>
                        <div className="flex items-start">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input
                                id="remember"
                                type="checkbox"
                                value=""
                                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-[rgb(255,0,0)] dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                                required
                              />
                            </div>
                            <label
                              htmlFor="remember"
                              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                            >
                              Remember me
                            </label>
                          </div>
                          <a
                            href="#"
                            className="ms-auto text-xs font-semibold text-[rgb(255,0,0)] hover:underline dark:text-[rgb(255,0,0)]"
                          >
                            forget Password?
                          </a>
                        </div>
                        <button
                          onClick={handleSubmit}
                          className="w-full text-white bg-[rgb(255,0,0)] hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-[rgb(255,0,0)] dark:hover:bg-[rgb(255,0,0)] dark:focus:ring-red-200"
                        >
                          Login to your account
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                          Not registered?{" "}
                          <a
                          onClick={()=> router.push('/company/signup')}
                            className="text-[rgb(255,0,0)] hover:underline dark:text-[rgb(255,0,0)]"
                          >
                            Create account
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </>
  );
};

export default Page;
