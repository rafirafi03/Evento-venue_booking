import { FaLock, FaUserAlt, FaGoogle, FaApple, FaFacebook } from "react-icons/fa";
import Header from "../../login-header/header";
import Image from "next/image";

const page = () => {
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
            <form>
              <div className="mb-4 relative">
                <FaUserAlt className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-6 relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  className="pl-10 pr-4 py-2 rounded-lg shadow-sm border focus:outline-none focus:border-indigo-500 w-full"
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between">
                <button className="bg-[rgba(255,0,0)] hover:bg-black text-white font-bold py-2 w-full px-4 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
                  Login
                </button>
              </div>
            </form>
            {/* <div className="mt-4 text-center">
              <p className="text-gray-600">
                Don't have an account?
                <a
                  href="/signup"
                  className="text-indigo-500 hover:text-indigo-700 font-semibold"
                >
                  {" "}
                  Sign up
                </a>
              </p>
            </div> */}

            <hr className="shadow-md mt-5" />

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
