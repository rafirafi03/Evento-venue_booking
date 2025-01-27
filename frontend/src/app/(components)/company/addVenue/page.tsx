"use client"

import React, { useState } from "react";
import "@radix-ui/themes/styles.css";
import { FaUpload } from "react-icons/fa";
import { useAddVenueMutation } from "app/store/slices/companyApiSlices";
import { useRouter } from "next/navigation";
import Header from "components/common/login-header/header";
import Aside from 'components/companyComponents/aside/page';
import { getUserIdFromToken } from "utils/tokenHelper";
import AuthHOC, {Role} from "components/common/auth/authHoc";
import Image from "next/image";
import { ResizeImage } from "utils/resizeImage";
import { isApiError } from "utils/errors";
import { compressImage } from "utils/imageCompression";

export default function Page() {

  const [addVenue] = useAddVenueMutation();

  const companyId = getUserIdFromToken('authCompanyToken')

  const [name, setName] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [capacity, setCapacity] = useState<number>(0);
  const [amount, setAmount] = useState<number>(0)
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>('');
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  const [nameError, setNameError] = useState<string>("");
  const [typeError, setTypeError] = useState<string>("");
  const [capacityError, setCapacityError] = useState<string>("");
  const [amountError, setAmountError] = useState<string>('')
  const [descriptionError, setDescriptionError] = useState<string>("");
  const [addressError, setAddressError] = useState<string>("");
  const [phoneError, setPhoneError] = useState<string>("");
  const [cityError, setCityError] = useState<string>("");
  const [stateError, setStateError] = useState<string>("");
  const [imageError, setImageError] = useState<string> ('')

  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const [imageToReplace, setImageToReplace] = useState<number | null>(null);

  const router = useRouter()


  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImageError('');
      const filesArray = Array.from(e.target.files);
  
      try {
        if (imageToReplace !== null) {
          // Compress single image for replacement
          const { file: compressedImage } = await compressImage(filesArray[0], 0.3); // 300KB target
          const resizedImage = await ResizeImage(compressedImage, 2000, 2000); // Reduced dimensions
  
          if (resizedImage) {
            const updatedFiles = [...selectedImages];
            updatedFiles[imageToReplace] = resizedImage;
            setSelectedImages(updatedFiles);
            setImageToReplace(null);
          }
        } else {
          // Process multiple images
          const processedImages = await Promise.all(
            filesArray.map(async (file) => {
              const { file: compressed } = await compressImage(file, 0.3);
              console.log('compressed:',compressed)
              return ResizeImage(compressed, 2000, 2000);
            })
          );
  
          setSelectedImages((prevFiles) => [
            ...prevFiles,
            ...processedImages.filter((file): file is File => file !== null),
          ].slice(0, 6));
        }
      } catch (error) {
        console.error("Error processing images:", error);
        setImageError('Error processing images. Please try again.');
      }
    }
  };
  


  const handleImageReplace = (index: number) => {
    setImageToReplace(index); 
    document.getElementById("imageInput")?.click();
  };

  const handleSubmit = async () => {
    try {

    let isValid = true

    if(name.trim() == "") {
      setNameError('venue name required')
      isValid = false
    } else if(name.length < 3) {
      setNameError('name is too short. min 3 length')
      isValid = false
    }

    if(type.trim() == "") {
      setTypeError('type required')
      isValid = false
    }

    if(description.trim() == "") {
      setDescriptionError('venue description required')
      isValid = false
    } else if(description.length < 3) {
      setDescriptionError('description is too short. min 50 length')
      isValid = false
    }

    if(amount <= 0) {
      setAmountError('Invalid amount')
      isValid = false
    }

    if(capacity < 1) {
      setCapacityError('Invalid capacity')
      isValid = false
    } else if(capacity > 5000) {
      setCapacityError('capacity is too high')
      isValid = false
    }
    if(address.trim() == "") {
      setAddressError('venue address required')
      isValid = false
    } else if(address.length < 3) {
      setAddressError('address is too short. min 5 length')
      isValid = false
    }
    
    if(phone.trim() == "") {
      setPhoneError('phone required')
      isValid = false
    } else if(phone.length < 10) {
      setPhoneError('Invalid phone')
      isValid = false
    }
    
    if(city.trim() == "") {
      setCityError('venue city required')
      isValid = false
    } else if(city.length < 3) {
      setCityError('city is too short. min 3 length')
      isValid = false
    }
    
    if(state.trim() == "") {
      setStateError('venue state required')
      isValid = false
    } else if(state.length < 3) {
      setStateError('state is too short. min 3 length')
      isValid = false
    }

    if(selectedImages.length < 1) {
      setImageError('select atleast 1 images')
      isValid = false
    }

    if (!isValid) {
      return 
    } else {

    const formData = new FormData();

    if(companyId) {
      formData.append('companyId', companyId);
    }
    formData.append("name", name);
    formData.append("type", type);
    formData.append("description", description);
    formData.append("capacity", capacity.toString());
    formData.append('amount', amount.toString());
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
  }
    } catch (error: unknown) {
      if (isApiError(error) && error.status === 401) {
        if (typeof window !== "undefined") {
        localStorage.removeItem("authCompanyToken");
        }
        router.push("/company/login");
      } else {
        console.error("An unexpected error occurred", error);
      }
    }
    
  };

  return (
    <AuthHOC role={Role.Company}>
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
              onChange={(e) => {
                setName(e.target.value)
                setNameError('')
              }
              }
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
              onChange={(e) => {
                setType(e.target.value)
                 setTypeError('')
              }
                }
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
              onChange={(e) => {setCapacity(Number(e.target.value))
                setCapacityError('') }
              }
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Capacity of Venue"
            />
            {capacityError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {capacityError}
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
              id="amount"
              type="number"
              name="capacity"
              value={amount}
              onChange={(e) => {setAmount(Number(e.target.value))
                setAmountError('')}
              }
              className="w-full px-3 py-2 border-slate-200 bg-slate-50 rounded-md text-gray-700 focus:outline-none focus:border-indigo-500"
              placeholder="Amount per day for Venue"
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
              onChange={(e) => {setDescription(e.target.value)
                setDescriptionError('')}
              }
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
              onChange={(e) => {setAddress(e.target.value)
                setAddressError('') }
              }
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
              onChange={(e) => {setPhone(e.target.value)
                setPhoneError('')}
              }
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
              onChange={(e) => {setCity(e.target.value)
                setCityError('') }
              }
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
              onChange={(e) => {setState(e.target.value)
                setStateError('')}
              }
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

        {imageError && (
              <p className="mt-1 ml-2 text-xs font-bold text-[rgb(255,0,0)] dark:text-[rgb(255,0,0)]">
                {" "}
                {imageError}
              </p>
            )}

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
                <Image
                  src={imageUrl}
                  alt={`Selected ${index}`}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-300 transform hover:scale-105"
                  width={500}
                  height={500}
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
    </AuthHOC>
  );
}