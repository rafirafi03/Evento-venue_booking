"use client"

import React, { useEffect, useState } from "react";
import "@radix-ui/themes/styles.css";
import { FaUpload } from "react-icons/fa";
import { useGetVenueDetailsQuery, useEditVenueMutation } from "app/store/slices/companyApiSlices";
import { useRouter } from "next/navigation";
import Header from "app/(components)/login-header/header";
import Aside from '../../aside/page'

export default function page({ params }: { params: { id: string } }) {

  const {id} = params

  console.log(id)
  const [editVenue] = useEditVenueMutation();
  const {data: venue, isLoading, isError, refetch} = useGetVenueDetailsQuery(id)


  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0);
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [typeError, setTypeError] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [capacityError, setCapacityError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [stateError, setStateError] = useState<string>("");

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [imageToReplace, setImageToReplace] = useState<number | null>(null);

  const router = useRouter()

  useEffect(() => {

    setName(venue?.name)
    setType(venue?.type)
    setDescription(venue?.description)
    setCapacity(venue?.capacity)
    setAmount(venue?.amount)
    setAddress(venue?.address)
    setPhone(venue?.phone)
    setCity(venue?.city)
    setState(venue?.state)
    setSelectedImages(venue?.images)

  },[venue])

  // Handle image addition or replacement
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);

      if (imageToReplace !== null) {
        // Replace the selected image at the specified index
        const updatedFiles = [...selectedImages];
        updatedFiles[imageToReplace] = filesArray[0]; // Replace the file at the specified index
        setSelectedImages(updatedFiles);
        setImageToReplace(null); // Reset the replace index
      } else {
        // Add new images (limiting to 6)
        const newFiles = Array.from(e.target.files);
        setSelectedImages(
          (prevFiles) => [...prevFiles, ...newFiles].slice(0, 6) // Limit to 6 files
        );
      }
    }
  };

  // Handle image replacement click
  const handleImageReplace = (index: number) => {
    setImageToReplace(index); // Set the image index to be replaced
    document.getElementById("imageInput")?.click(); // Trigger file input
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    formData.append('id',id)
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
      if (typeof image === 'string') {
        formData.append("existingImages",image);
      } else {
        formData.append('images', image);
      }
    });

    const response = await editVenue(formData).unwrap();

    console.log(response.data,"response in frontend")

    if(response.success) {
      console.log('succes true in frontend')
      router.push('/company/main')
    }


    console.log(response);
  };

  const handleLogout = ()=> {
    console.log('hii')
  }

  return (

    <>
    <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px]">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside/>
        </aside>
        <div className="flex-1 p-4 bg-slate-100 my-3">
        <div className="m-5">
      <h1 className="font-extrabold text-2xl mt-5 mb-5">Edit Venue</h1>
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
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name here"
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
                typeError
                  ? "w-full px-3 py-2 rounded-md text-[rgb(255,0,0)] border-[rgb(255,0,0)] focus:outline-none focus:border-[rgb(255,0,0)]"
                  : "w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-purple-300"
              }`}
              placeholder="Type of Venue"
            />
            {typeError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {typeError}
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
          <div className="w-1/2 px-2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phone"
            >
              Amount (per day)
            </label>
            <input
              id="description"
              type="text"
              name="description"
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="amount"
            />
            {amountError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {amountError}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap -mx-2 mb-4">
          <div className="w-full px-2">
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
            {descriptionError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {descriptionError}
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
            {addressError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {addressError}
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
            {cityError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {cityError}
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
            {stateError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {stateError}
              </p>
            )}
          </div>
        </div>
        <hr className="mt-8" />
        <h1 className="font-extrabold text-lg mb-7 mt-5 font-sans text-center">
          Venue Images
        </h1>

        <div className="flex justify-center items-center flex-wrap gap-4 mb-5">
          {selectedImages?.map((image, index) => {
            // Create a URL for each image file to display it
            const imageUrl = typeof image === 'string' ? image : URL.createObjectURL(image);

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

          {selectedImages?.length < 6 && (
            <div
              className="relative w-1/4 h-48 border-2 border-dashed border-gray-300 rounded-lg shadow-md flex items-center justify-center cursor-pointer hover:border-red-300 transition-all duration-300 bg-gray-50 hover:bg-gray-100"
              onClick={() => document.getElementById("imageInput")?.click()}
            >
              <div className="flex flex-col items-center justify-center text-gray-400 text-center">
                <FaUpload className="text-4xl mb-2" />
                <p className="text-base font-semibold">Click to upload</p>
                <p className="text-xs">add your venue images</p>
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
    </div>
      </div>
      </>






    
  );
}
