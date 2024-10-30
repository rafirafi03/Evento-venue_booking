"use client"

import React, { useState } from "react";
import "@radix-ui/themes/styles.css";
import { FaUpload } from "react-icons/fa";
import { useAddVenueMutation } from "app/store/slices/companyApiSlices";
import { useRouter } from "next/navigation";
import Header from "app/(components)/login-header/header";
import Aside from 'app/(components)/company/aside/page';
import { getUserIdFromToken } from "utils/tokenHelper"

export default function page() {
  const [addVenue] = useAddVenueMutation();

  const companyId = getUserIdFromToken('authCompanyToken')

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [passwordError, setPassError] = useState<string>("");
  const [confirmPassError, setConfirmPassError] = useState<string>("");

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [imageToReplace, setImageToReplace] = useState<number | null>(null);

  const router = useRouter()

  const resizeImage = (file: File, width: number, height: number): Promise<File | null> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
  
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.src = e.target?.result as string;
  
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
  
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            canvas.toBlob(
              (blob) => {
                if (blob) {
                  // Convert Blob to File
                  const resizedFile = new File([blob], file.name, {
                    type: 'image/jpeg',
                    lastModified: Date.now(),
                  });
                  resolve(resizedFile); // Returns the resized image file
                } else {
                  resolve(null);
                }
              },
              'image/jpeg',
              0.8 // Adjust quality as needed
            );
          } else {
            resolve(null);
          }
        };
      };
  
      reader.readAsDataURL(file);
    });
  };
  
  

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
  
      if (imageToReplace !== null) {
        // Resize the image before replacing it
        const resizedImage = await resizeImage(filesArray[0], 5000, 3000); // Adjust width and height as needed
  
        if (resizedImage) {
          const updatedFiles = [...selectedImages];
          updatedFiles[imageToReplace] = resizedImage; // Only assign if resizedImage is not null
          setSelectedImages(updatedFiles);
          setImageToReplace(null);
        } else {
          console.error("Failed to resize image.");
        }
      } else {
        const newFiles = await Promise.all(
          filesArray.map((file) => resizeImage(file, 5000, 3000)) // Resize each file
        );
  
        // Filter out any null values in case resizing failed for any image
        setSelectedImages((prevFiles) => [
          ...prevFiles,
          ...newFiles.filter((file): file is File => file !== null),
        ].slice(0, 6));
      }
    }
  };
  


  const handleImageReplace = (index: number) => {
    setImageToReplace(index); 
    document.getElementById("imageInput")?.click();
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('companyId', companyId);
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("capacity", capacity.toString());
    formData.append("address", address);
    formData.append("phone", phone.toString());
    formData.append("city", city);
    formData.append("state", state);
    formData.append("folderName", "venueImages");
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    const response = await addVenue(formData).unwrap();

    router.push('/company/venues')

    console.log(response);
  };

  return (

    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px]">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside/>
        </aside>
        <div className="flex-1 p-4 bg-slate-100">
        <div className="m-5">
      <h1 className="font-extrabold text-2xl mt-5 mb-5">Add Venue</h1>
      <div className="max-w-full rounded overflow-hidden shadow-lg p-6 bg-white">
        <h1 className="font-extrabold text-lg mb-7 text-center font-sans">
          Venue Details
        </h1>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-1/2 px-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              Venue Name
            </label>
            <input
              className={`${
                nameError
                  ? "w-full px-3 py-2 border-red-100 shadow-black rounded-md text-[rgb(255,0,0)] focus:outline-none focus:border-[rgb(255,0,0)]"
                  : "w-full border-slate-200 bg-slate-50 px-3 py-2 shadow-black rounded-md text-gray-700 focus:outline-none focus:border-red-400"
              }`}
              id="name"
              type="text"
              name="name"
              placeholder="Venue Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              htmlFor="Type of venue"
            >
              Type of Venue
            </label>
            <input
              id="type"
              type="text"
              name="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className={`${
                emailError
                  ? "w-full px-3 py-2 rounded-md text-[rgb(255,0,0)] border-[rgb(255,0,0)] focus:outline-none focus:border-[rgb(255,0,0)]"
                  : "w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-purple-300"
              }`}
              placeholder="Type of Venue"
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
              Description
            </label>
            <input
              id="description"
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Description"
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
              htmlFor="phone"
            >
              Capacity
            </label>
            <input
              id="capacity"
              type="number"
              name="capacity"
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Capacity of Venue"
            />
            {phoneError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {phoneError}
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
              Address
            </label>
            <input
              id="address"
              type="text"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Address"
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
              htmlFor="phone"
            >
              Phone
            </label>
            <input
              id="phone"
              type="tel"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(Number(e.target.value))}
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Phone Number"
            />
            {phoneError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {phoneError}
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
              City
            </label>
            <input
              id="city"
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="city"
              // value={password}
              // onChange={handleChange}
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
              State
            </label>
            <input
              id="state"
              type="text"
              name="state"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="state"
              // value={confirmPass}
              // onChange={handleChange}
            />
            {confirmPassError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {confirmPassError}
              </p>
            )}
          </div>
        </div>
        <hr className="mt-8" />
        <h1 className="font-extrabold text-lg mb-7 mt-5 font-sans text-center">
          Venue Images
        </h1>

        <div className="flex justify-center items-center flex-wrap gap-4 mb-5">
          {selectedImages.map((image, index) => {
            // Create a URL for each image file to display it
            const imageUrl = URL.createObjectURL(image);

            return (
              <div
                key={index}
                className="relative w-1/4 h-48 border-2 border-dashed border-gray-300 rounded-lg shadow-md cursor-pointer"
                onClick={() => handleImageReplace(index)} // Click to replace the image
              >
                <img
                  src={imageUrl}
                  alt={`Selected ${index}`}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
                />
              </div>
            );
          })}

          {selectedImages.length < 6 && (
            <div
              className="relative w-1/4 h-48 border-2 border-dashed border-gray-300 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:border-red-300 transition-all duration-300 bg-gray-50 hover:bg-gray-100"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              <div className="flex flex-col items-center justify-center text-gray-400 text-center">
                <FaUpload className="text-4xl mb-2" />
                <p className="text-base font-semibold">Click to upload</p>
                <p className="text-xs">add you venue images</p>
              </div>
            </div>
          )}

          <input
            type="file"
            id="imageInput"
            className="hidden"
            accept="image/*"
            multiple={imageToReplace === null}
            onChange={handleImageChange}
          />
        </div>
        <div className="flex justify-center items-center">
          <button
            onClick={handleSubmit}
            className="focus:outline-none text-white bg-[rgb(255,0,0)] hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-10 py-2.5 me-2 mb-2 dark:bg-[rgb(255,0,0)] dark:hover:bg-red-700 dark:focus:ring-red-900 transition-transform duration-300 transform hover:scale-105"
          >
            Add
          </button>
        </div>
      </div>
    </div>
        </div>
      </div>
    </>
  );
}
