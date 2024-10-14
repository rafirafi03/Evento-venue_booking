"use client";

import { FaLock, FaUserAlt, FaGoogle, FaFacebook } from "react-icons/fa";
import Header from "../../login-header/header";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLoginPostMutation } from "app/store/slices/userApiSlices";

const Page = () => {
  const router = useRouter();

  const [loginMutation] = useLoginPostMutation();

  const [email, setEmail] = useState<string>("");
  const [password, setPass] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPassError] = useState<string>("");
  const [error, setError] = useState<string>("");

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const isDisabled =
    emailError !== "" ||
    passwordError !== "" ||
    email === "" ||
    password === "" ||
    error !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setError("");

    if (name == "email") {
      setEmail(value);

      if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    } else if (name == "password") {
      setPass(value);

      if (value.trim() == "") {
        setPassError("password required");
      } else if (value.length < 6) {
        setPassError("Password must be 6 characters");
      } else {
        setPassError("");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const res = await loginMutation({ email, password }).unwrap();

      if (res.success) {
        const token = res.token;
        localStorage.setItem('authToken', token)
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setError("Invalid email or password");
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
            <h4 className="text-xl font-sans font-bold mb-5 text-center text-gray-800">
              Login to your account
            </h4>

            {error && (
              <p className="text-center mb-2 text-[rgb(255,0,0)] font-sans font-bold dark:text-[rgb(255,0,0)]">
                {" "}
                {error}
              </p>
            )}
            <div className="mb-4 relative">
              {emailError ? (
                <>
                  <FaUserAlt className="absolute left-3 top-2 text-[rgb(255,0,0)]" />
                  <input
                    className="pl-10 pr-4 py-2 rounded-lg shadow-sm text-xs border placeholder-[rgb(255,0,0)] placeholder:font-bold border-[rgb(255,0,0)] text-[rgb(255,0,0)] focus:outline-none focus:border-[rgb(255,0,0)] w-full"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                  />
                  <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                    {" "}
                    {emailError}
                  </p>
                </>
              ) : (
                <>
                  <FaUserAlt className="absolute left-3 top-2 text-gray-400" />
                  <input
                    className="pl-10 pr-4 py-2 rounded-lg shadow-sm text-xs border focus:outline-none focus:border-indigo-500 w-full"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            <div className="mb-6 relative">
              {passwordError ? (
                <>
                  <FaLock className="absolute left-3 top-2 text-[rgb(255,0,0)]" />
                  <input
                    className="pl-10 pr-4 py-2 rounded-lg shadow-sm text-xs border placeholder-[rgb(255,0,0)] placeholder:font-bold border-[rgb(255,0,0)] text-[rgb(255,0,0)]  focus:outline-none focus:border-[rgb(255,00)] w-full"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                  />
                  <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                    {" "}
                    {passwordError}
                  </p>
                </>
              ) : (
                <>
                  <FaLock className="absolute left-3 top-2 text-gray-400" />
                  <input
                    className="pl-10 pr-4 py-2 rounded-lg shadow-sm text-xs placeholder:font-bold border focus:outline-none focus:border-indigo-500 w-full"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            <div className="flex items-center justify-between">
              {}
              <button
                type="submit"
                disabled={isDisabled}
                onClick={handleLogin}
                className={`bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105 ${
                  isDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
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
                  <span className="flex-grow text-center">
                    Sign in with Google
                  </span>
                </button>
                <button className="flex items-center justify-start bg-white text-black border border-gray-200 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 hover:text-white transform transition duration-300 w-full">
                  <FaFacebook className="mr-2" />
                  <span className="flex-grow text-center">
                    Sign in with Facebook
                  </span>
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
