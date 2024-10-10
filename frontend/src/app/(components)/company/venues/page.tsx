import React from "react";
import Image from "next/image";
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetVenuesQuery } from "app/store/slices/companyApiSlices";

interface PageProps {
    changePage: (page: string) => void;
  }

export default function page({changePage}:PageProps) {

  const { data: venues, isLoading, isError, refetch} = useGetVenuesQuery(undefined);

  console.log(venues?.venues)

  const venue = venues?.venues?.venues


    const handleChange = ()=> {
        changePage('addVenue')
    }


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
      {venue?.length > 0 ? (
        <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-black dark:text-black">
          <thead className="font-bold text-black uppercase bg-white dark:bg-white dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                type
              </th>
              <th scope="col" className="px-6 py-3">
                city
              </th>
              <th scope="col" className="px-6 py-3">
                state
              </th>
              <th scope="col" className="px-6 py-3">
                offers
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                action
              </th>
              {/* <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th> */}
            </tr>
          </thead>
          <tbody className="dark:text-black font-bold">
            
              {venue.map((company,index) => (
                <tr
                  key={index}
                  className="bg-slate-100 dark:bg-slate-100 hover:bg-slate-200 border-b-2 border"
                >
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {index+1}
                  </th>
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {company.name}
                  </th>
                  <td className="px-6 py-4">{company.type}</td>
                  <td className="px-6 py-4">{company.city}</td>
                  <td className="px-6 py-4">{company.state}</td>
                  <td className="px-6 py-4">
                    { company.city ? 
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
                    { company.city ? 
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
