"use client";

import { useRouter } from "next/navigation";
import {
  FaLock,
  FaUserAlt,
  FaEnvelope,
  FaPhone,
  FaGoogle,
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
} from "app/store/slices/userApiSlices";
import AuthHOC from "components/common/auth/authHoc";
import toast, {Toaster} from "react-hot-toast";

const Page = () => {
  const router = useRouter();

  const [registerUser] = useRegisterPostMutation();
  const [confirmOtp] = useVerifyOtpMutation();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPassError, setConfirmPassError] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("")

  const [modal, setModal] = useState(false);
  const [isLoading, setLoading] = useState(false);

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

    if (name == "name") {
      setUserName(value);

      if (value.trim() == "") {
        setNameError("username required");
      } else if (value.length < 4) {
        setNameError("min 4 characters required");
      } else {
        setNameError("");
      }
    } else if (name == "email") {
      setEmail(value);

      if (!validateEmail(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    } else if (name == "phone") {
      setPhone(value);

      if (value.trim() == "") {
        setPhoneError("phone required");
      } else if (value.length < 10) {
        setPhoneError("invalid phone number");
      } else {
        setPhoneError("");
      }
    } else if (name == "password") {
      setPass(value);

      if (value.trim() == "") {
        setPasswordError("password required");
      } else if (value.length < 6) {
        setPasswordError("Password must be 6 characters");
      } else if (value !== confirmPass) {
        setPasswordError("not matchcing");
      } else {
        setPasswordError("");
        setConfirmPassError("");
      }
    } else if (name == "confirmPass") {
      setConfirmPass(value);
      if (password !== value) {
        setConfirmPassError("password not matching");
      } else {
        setConfirmPassError("");
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await registerUser({ email }).unwrap();
      setLoading(false);
      if (res.success) {
        setModal(true);
      } else if(!res.success) {
        setError('user email already exists')
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Registration failed. Please try again.");
    }
  };

  const handleOtp = async (event: React.FormEvent, otp: string) => {
    try {
      const res = await confirmOtp({
        otp,
        email,
        userName,
        phone,
        password,
      }).unwrap();

      if (res.success) {
        const token = res.token;
        localStorage.setItem("authToken", token);
        router.push("/");
      } else {
        setOtpError('Invalid otp')
      }
    } catch (error) {
      console.log(error)
      setError("OTP verification failed. Please try again.");
    }
  };

  const handleOnClick = () => {
    router.push("/login");
  };

  return (
    <AuthHOC role="user" isAuthPage={true}>
      {modal ? (
        <OtpModal email={email} handleOtp={handleOtp} otpError={otpError} clearError={() => setOtpError("")} />
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
                    {error && (
                      <p className="text-center mb-2 text-[rgb(255,0,0)] font-sans font-bold dark:text-[rgb(255,0,0)]">
                        {" "}
                        {error}
                      </p>
                    )}
                    <div className="mb-4 relative">
                      <FaUserAlt
                        className={`${
                          nameError
                            ? "absolute left-3 top-2 text-[rgb(255,0,0)]"
                            : "absolute left-3 top-2 text-gray-400"
                        }`}
                      />
                      <input
                        className={`${
                          nameError
                            ? "pl-10 pr-4 py-2 rounded-lg text-xs shadow-sm border border-[rgb(255,0,0)] text-[rgb(255,0,0)] placeholder-[rgb(255,0,0)] font-bold focus:outline-none focus:border-[rgb(255,0,0)] w-full"
                            : "pl-10 pr-4 py-2 rounded-lg font-bold text-xs shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        }`}
                        id="userName"
                        type="text"
                        name="name"
                        placeholder="Enter your user name"
                        value={userName}
                        onChange={handleChange}
                      />
                      {nameError && (
                        <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                          {" "}
                          {nameError}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 relative">
                      <FaEnvelope
                        className={`${
                          emailError
                            ? "absolute left-3 top-2 text-[rgb(255,0,0)]"
                            : "absolute left-3 top-2 text-gray-400"
                        }`}
                      />
                      <input
                        className={`${
                          emailError
                            ? "pl-10 pr-4 py-2 rounded-lg text-xs shadow-sm border border-[rgb(255,0,0)] text-[rgb(255,0,0)] placeholder-[rgb(255,0,0)] font-bold focus:outline-none focus:border-[rgb(255,0,0)] w-full"
                            : "pl-10 pr-4 py-2 rounded-lg font-bold text-xs shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        }`}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="Enter your email"
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
                    <div className="mb-4 relative">
                      <FaPhone
                        className={`${
                          phoneError
                            ? "absolute left-3 top-2 text-[rgb(255,0,0)]"
                            : "absolute left-3 top-2 text-gray-400"
                        }`}
                      />
                      <input
                        className={`${
                          phoneError
                            ? "pl-10 pr-4 py-2 rounded-lg text-xs shadow-sm border border-[rgb(255,0,0)] text-[rgb(255,0,0)] placeholder-[rgb(255,0,0)] font-bold focus:outline-none focus:border-[rgb(255,0,0)] w-full"
                            : "pl-10 pr-4 py-2 rounded-lg font-bold text-xs shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        }`}
                        id="phone"
                        type="number"
                        name="phone"
                        placeholder="Enter your phone"
                        value={phone}
                        onChange={handleChange}
                      />
                      {phoneError && (
                        <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                          {" "}
                          {phoneError}
                        </p>
                      )}
                    </div>
                    <div className="mb-4 relative">
                      <FaLock
                        className={`${
                          passwordError
                            ? "absolute left-3 top-2 text-[rgb(255,0,0)]"
                            : "absolute left-3 top-2 text-gray-400"
                        }`}
                      />
                      <input
                        className={`${
                          passwordError
                            ? "pl-10 pr-4 py-2 rounded-lg text-xs shadow-sm border border-[rgb(255,0,0)] text-[rgb(255,0,0)] placeholder-[rgb(255,0,0)] font-bold focus:outline-none focus:border-[rgb(255,0,0)] w-full"
                            : "pl-10 pr-4 py-2 rounded-lg font-bold text-xs shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        }`}
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
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
                    <div className="mb-6 relative">
                      <FaLock
                        className={`${
                          confirmPassError
                            ? "absolute left-3 top-2 text-[rgb(255,0,0)]"
                            : "absolute left-3 top-2 text-gray-400"
                        }`}
                      />
                      <input
                        className={`${
                          confirmPassError
                            ? "pl-10 pr-4 py-2 rounded-lg text-xs shadow-sm border border-[rgb(255,0,0)] text-[rgb(255,0,0)] placeholder-[rgb(255,0,0)] font-bold focus:outline-none focus:border-[rgb(255,0,0)] w-full"
                            : "pl-10 pr-4 py-2 rounded-lg font-bold text-xs shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                        }`}
                        id="confirmPassword"
                        type="password"
                        name="confirmPass"
                        placeholder="Confirm password"
                        value={confirmPass}
                        onChange={handleChange}
                      />
                      {confirmPassError && (
                        <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                          {" "}
                          {confirmPassError}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        onClick={handleSubmit}
                        disabled={isDisabled}
                        type="button"
                        className={`bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105" ${
                          isDisabled ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                      >
                        Sign up
                      </button>
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-gray-600">
                        Already have an account?
                        <span
                          onClick={handleOnClick}
                          className="text-[rgb(255,0,0)] font-bold cursor-pointer"
                        >
                          {" "}
                          Log in
                        </span>
                      </p>
                    </div>

                    <hr className="shadow-md mt-5" />

                    {/* Sign In Options */}
                    <div className="mt-6">
                      <p className="text-center text-gray-600 mb-2">
                        Or sign in with
                      </p>
                      <div className="flex justify-center space-x-4">
                        <button className="flex items-center justify-center bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-blue-600 transform transition duration-500 hover:scale-105">
                          <FaGoogle
                            className="text-black hover:text-white"
                            size={24}
                          />
                        </button>
                        <button className="flex items-center justify-center bg-white border border-gray-200 rounded-full p-2 shadow-md hover:bg-blue-800 transform transition duration-500 hover:scale-105">
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
    </AuthHOC>
  );
};

export default Page;
