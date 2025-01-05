"use client";

import { FaLock, FaEnvelope } from "react-icons/fa";
import Header from "../../../../components/common/login-header/header";
import Image from "next/image";
import { useState } from "react";
import { useAdminLoginMutation } from "app/store/slices/userApiSlices";
import { useRouter } from "next/navigation";
import AuthHOC, {Role} from "components/common/auth/authHoc";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const [error, setError] = useState<string>("");

  const [adminLogin] = useAdminLoginMutation();
  const router = useRouter();

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(String(email).toLowerCase());
  };

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
      setPassword(value);

      if (value.trim() == "") {
        setPasswordError("password required");
      } else if (value.length < 6) {
        setPasswordError("Password must be 6 characters");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleLogin = async () => {
    try {
      const res = await adminLogin({ email, password }).unwrap();

      console.log(res, "ressssss");

      if (res.success) {
        console.log("adminscssssss");
        const token = res.token;
        if (typeof window !== "undefined") {
        localStorage.setItem("authAdminToken", token);
        }
        router.push("/admin");
      } else {
        setError(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthHOC role={Role.Admin} isAuthPage={true}>
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

            {error ? (
              <p className="text-base font-sans font-bold mb-6 text-center text-[rgb(255,0,0)]">
                {error}
              </p>
            ) : (
              <p className="text-base font-sans font-bold mb-6 text-center text-gray-500">
                Log in to admin page
              </p>
            )}
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
            <div className="mb-6 relative">
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
            <div className="flex items-center justify-between">
              <button
                onClick={handleLogin}
                className="bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105"
              >
                Loginn
              </button>
            </div>

            <hr className="shadow-md mt-5" />
          </div>
        </div>
      </div>
    </AuthHOC>
  );
};

export default Page;
