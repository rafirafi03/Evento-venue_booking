"use client";

import React, { useMemo, useState } from "react";
import Image from "next/image";
import { FiUpload } from "react-icons/fi";
import countryList from "react-select-country-list";
import Select from "react-select";
import {
  useConfirmOtpMutation,
  useRegisterPostMutation,
} from "@/app/store/slices/companyApiSlices";
import OtpModal from "../otpModal/page";
import { useRouter } from "next/navigation";

const Page = () => {
  const [name, setName] = useState<string>("");
  const [nameError, setNameError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [country, setCountry] = useState<{
    label: string;
    value: string;
  } | null>(null);
  const [countryError, setCountryError] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPass, setConfirmPass] = useState<string>("");
  const [confirmPassError, setConfirmPassError] = useState<string>("");
  // const [licenseError, setLicenseError] = useState<string>("");

  const [error, setError] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("")

  const router = useRouter();

  const [modal, setModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [registerCompany] = useRegisterPostMutation();
  const [confirmOtp] = useConfirmOtpMutation();

  const options = useMemo(() => countryList().getData(), []);

  const handleCountryChange = (selectedOption: any) => {
    console.log(selectedOption);
    setCountryError("")
    if(selectedOption) {
      setCountry(selectedOption);
    } else {
      setCountryError('Country required')
    }
  };

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setError("");

    if (name == "name") {
      setName(value);

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
      setPassword(value);

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

  const [license, setlicense] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setLicenseError('')
    const file = event.target.files ? event.target.files[0] : null;
    setlicense(file);
  };

  const handleSubmit = async () => {
    try {
      const fields = [
        { value: name, setError: setNameError, errorMsg: "Name required" },
        { value: email, setError: setEmailError, errorMsg: "Email required" },
        { value: phone, setError: setPhoneError, errorMsg: "Phone required" },
        { value: country, setError: setCountryError, errorMsg: "Country required" },
        { value: password, setError: setPasswordError, errorMsg: "Password required" },
        { value: confirmPass, setError: setConfirmPassError, errorMsg: "Confirm password required" },
        // { value: license, setError: setLicenseError, errorMsg: "License required" },
      ];
  
      let hasError = false;
  
      fields.forEach(({ value, setError, errorMsg }) => {
        if (!value) {
          setError(errorMsg);
          hasError = true;
        } else {
          setError("");
        }
      });
  
      if (hasError) return;
  
      setLoading(true);
      const res = await registerCompany({ email }).unwrap();
  
      if (res) {
        setLoading(false);
        setModal(true);
      }
  
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleOtp = async (event: React.FormEvent, otp: string) => {
    event.preventDefault()
    try {
      console.log("hiiiiii");
      const res = await confirmOtp({
        otp,
        name,
        email,
        phone,
        country: country?.label,
        password,
      }).unwrap();

      console.log(res, "resssfrntend");

      if (!res.success) {
        console.log('elsecase')
        setOtpError('Invalid otp')
        
      } else {
        console.log("ressuccessssss");
        const token = res.token;
        localStorage.setItem("authToken", token);
        setModal(false);
        router.push("/company/signup");
      }
    } catch (error) {
      console.log(error);
      setError("OTP verification failed. Please try again.");
    }
  };

  return (
    <div>
      {modal ? (
        <OtpModal email={email} handleOtp={handleOtp} otpError={otpError} clearError={() => setOtpError("")}/>
      ) : (
        <>
          {loading ? (
            <h1>Loading.....</h1>
          ) : (
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
                      <p className="text-gray-600 mt-2 font-bold mb-6">
                        Welcome to{" "}
                        <span className="font-georgia font-bold text-[rgb(255,0,0)]">
                          Evento
                        </span>
                      </p>
                      {error ? (
                        <p className="text-[rgb(255,0,0)] mt-2">{error}</p>
                      ) : (
                        <p className="text-gray-600 mt-2">
                          Please fill out the form below to sign up and wait for
                          admin to approve.
                        </p>
                      )}
                    </div>

                    <div className="flex flex-wrap -mx-2 mb-4">
                      <div className="w-1/2 px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="firstName"
                        >
                          Company Name
                        </label>
                        <input
                          className={`${
                            nameError
                              ? "w-full px-3 py-2 border rounded-md text-[rgb(255,0,0)] border-[rgb(255,0,0)] focus:outline-none focus:border-[rgb(255,0,0)]"
                              : "w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-purple-300"
                          }`}
                          id="name"
                          type="text"
                          name="name"
                          placeholder="Company Name"
                          value={name}
                          onChange={handleChange}
                        />
                        {nameError && (
                        <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                          {" "}
                          {nameError}
                        </p>
                      )}
                      </div>
                      <div className="w-1/2 px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="email"
                        >
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          name="email"
                          className={`${
                            emailError
                              ? "w-full px-3 py-2 border rounded-md text-[rgb(255,0,0)] border-[rgb(255,0,0)] focus:outline-none focus:border-[rgb(255,0,0)]"
                              : "w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-purple-300"
                          }`}
                          placeholder="Email"
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
                    </div>

                    <div className="flex flex-wrap -mx-2 mb-4">
                      <div className="w-1/2 px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="phone"
                        >
                          Phone
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          name="phone"
                          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                          placeholder="Phone Number"
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
                      <div className="w-1/2 px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="country"
                        >
                          Country
                        </label>
                        <Select
                          id="country"
                          options={options}
                          value={country}
                          name="country"
                          onChange={handleCountryChange}
                          className="w-full"
                          classNamePrefix="react-select"
                        />
                        {countryError && (
                        <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                          {" "}
                          {countryError}
                        </p>
                      )}
                      </div>
                    </div>

                    <div className="flex flex-wrap -mx-2 mb-4">
                      <div className="w-1/2 px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="password"
                        >
                          Password
                        </label>
                        <input
                          id="password"
                          type="password"
                          name="password"
                          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                          placeholder="Password"
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
                      <div className="w-1/2 px-2">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="confirmPassword"
                        >
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          type="password"
                          name="confirmPass"
                          className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
                          placeholder="Confirm Password"
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
                    </div>

                    <div className="w-full px-2 mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="license"
                      >
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
                            {license ? license.name : "Choose a file"}
                          </span>
                        </div>
                      </div>
                      {license && (
                        <p className="mt-2 text-sm text-gray-600">
                          Selected file: {license.name}
                        </p>
                      )}
                      {/* {licenseError && (
                        <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                          {" "}
                          {licenseError}
                        </p>
                      )} */}
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
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Page;
