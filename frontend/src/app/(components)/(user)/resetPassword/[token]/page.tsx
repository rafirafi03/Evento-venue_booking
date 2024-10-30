"use client"

import React, { useState } from "react";
import { useChangePasswordMutation } from "app/store/slices/userApiSlices";

export default function page({ params }: { params: { token: string } }) {

    const [password, setPass] = useState<string>('');
    const [confirmPass, setConfirmPass] = useState<string>("");

    const [changePassword] = useChangePasswordMutation()

    const { token } = params

    const handleSubmit = async()=> {
        try {
            const response = await changePassword({token, password}).unwrap()
            console.log(response)
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <div className="flex justify-center items-center min-h-screen max-w-full bg-gradient-to-br from-gray-500 via-white to-red-100">
      <div className="bg-slate-50 border w-1/2 border-gray-200 rounded-lg shadow-sm p-6 my-5">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Reset Password
        </h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              type="password"
              id="newPass"
              name="newPass"
              value={password}
              onChange={(e)=> setPass(e.target.value)}
              placeholder="Enter new Password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPass"
              name="confirmPass"
              value={confirmPass}
              onChange={(e)=> setConfirmPass(e.target.value)}
              placeholder="Confirm new password"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
            />
          </div>
          <button
            type="button"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
