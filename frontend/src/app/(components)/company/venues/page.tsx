import React from "react";
import Image from "next/image";
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface PageProps {
    changePage: (page: string) => void;
  }

export default function page({changePage}:PageProps) {


    const handleChange = ()=> {
        changePage('addVenue')
    }

  const list = [
    {
      title: "Orange",
      img: "/assets/images/homepage-image.jpg",
      location: "kasaragod,kerala",
    },
    {
      title: "Tangerine",
      img: "/assets/images/homepage-image.jpg",
      location: "kasaragod,kerala",
    },
    {
      title: "Raspberry",
      img: "/assets/images/homepage-image.jpg",
      location: "kozhikkode,kerala",
    },
    {
      title: "Lemon",
      img: "/assets/images/homepage-image.jpg",
      location: "kochi,kerala",
    },
    {
      title: "Avocado",
      img: "/assets/images/homepage-image.jpg",
      location: "malappuram,kerala",
    },
    {
      title: "Lemon 2",
      img: "/assets/images/homepage-image.jpg",
      location: "wayanad,kerala",
    },
    {
      title: "Banana",
      img: "/assets/images/homepage-image.jpg",
      location: "thrissur,kerala",
    },
    {
      title: "Watermelon",
      img: "/assets/images/homepage-image.jpg",
      location: "alappuzha,kerala",
    },
  ];

  return (
    <>
      <h1 className="font-extrabold text-2xl mt-5 mb-5">Venues</h1>
      <div className="flex justify-end mb-5">
      <button
      onClick={handleChange}
        className="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-300"
      >
        Add Venue
        <FontAwesomeIcon icon={faAdd} className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-white group-hover:text-white ml-2" />

      </button>
      </div>
      <div className="gap-5 grid grid-cols-3 sm:grid-cols-4">
        {list.map((item, index) => (
          <div
            key={index}
            className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
          >
            <a href="#">
              <Image
                className="rounded-t-lg"
                width={500}
                height={100}
                src={item.img}
                alt="img"
              />
            </a>
            <div className="p-5">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.location}
              </p>
              {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[rgb(255,0,0)] rounded-lg hover:bg-red-300 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-red-300 dark:hover:bg-red-300 dark:focus:ring-red-300">
            Details
             <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a> */}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
