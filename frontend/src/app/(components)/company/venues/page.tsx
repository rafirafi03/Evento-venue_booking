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
    <div className="m-5">
      <h1 className="font-extrabold text-2xl mt-5">Venues</h1>
      <div className="flex justify-end mb-5">
      <button
      onClick={handleChange}
        className="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-300"
      >
        Add Venue
        <FontAwesomeIcon icon={faAdd} className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-white group-hover:text-white ml-2" />

      </button>
      </div>
      {list.length > 0 ? (
        <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
          <thead className="font-bold text-black uppercase bg-red-300 dark:bg-red-300 dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Company
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Phone
              </th>
              <th scope="col" className="px-6 py-3">
                Offers
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody className="dark:text-black font-bold">
            
              {list.map((company,index) => (
                <tr
                  key={index}
                  className="bg-red-100 dark:bg-red-100 hover:bg-red-200 border-b-2 border-red-200"
                >
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {index+1}
                  </th>
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {company.title}
                  </th>
                  <td className="px-6 py-4">{company.location}</td>
                  <td className="px-6 py-4">{company.location}</td>
                  <td className="px-6 py-4">
                    { company.location ? 
                    <button  className="bg-[rgb(255,0,0)] hover:bg-black transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center">
                      unblock
                    </button>
                    :
                    <button className="bg-black hover:bg-[rgb(255,0,0)] transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center">
                      block
                    </button>
                    }
                    
                  </td>
                  <td className="px-6 py-4">
                    { company.location ? 
                    <button  className="bg-[rgb(255,0,0)] hover:bg-black transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center">
                      unblock
                    </button>
                    :
                    <button className="bg-black hover:bg-[rgb(255,0,0)] transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center">
                      block
                    </button>
                    }
                    
                  </td>
                  <td className="px-6 py-4">
                    <button  className="bg-black transition-transform duration-300 hover:scale-110 text-xs text-white p-2 rounded-xl h-5 flex items-center">
                      View
                    </button>
                  </td>
                  {/* <td className="px-6 py-4 text-right">
                    <a className="hover:underline cursor-pointer">View</a>
                  </td> */}
                </tr>
              ))}
            
          </tbody>
        </table>
      </div>
      {/* <ConfirmModal closeModal={closeModal} confirmBlock={confirmBlock} blockModal={blockModal} blockAction={blockAction}/> */}

      
      </>
    ) : (
      
          <h1>No companies found</h1> 

    )}
    </div>
  );
}
