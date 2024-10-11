import React, { useState } from "react";
import Image from "next/image";
import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetVenuesQuery, useUpdateVenueStatusMutation } from "app/store/slices/companyApiSlices";
import ConfirmModal from '../confirmModal/page'
interface PageProps {
    changePage: (page: string) => void;
  }

export default function page({changePage}:PageProps) {

  const { data: venues, isLoading, isError, refetch} = useGetVenuesQuery(undefined);
  const [updateVenueStatus] = useUpdateVenueStatusMutation()

  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalButton, setModalButton] = useState<string>('')
  const [venueId, setVenueId] = useState<string>('')
  const [isConfirmModal, setConfirmModal] = useState<boolean>(false)

  console.log(venues?.venues)

  const venue = venues?.venues?.venues


    const handleChange = ()=> {
        changePage('addVenue')
    }

    const handleConfrimModal = (title: string, button: string, id: string)=> {
      setModalTitle(title) 
      setModalButton(button)
      setVenueId(id)
      setConfirmModal(true)
    }

    const closeModal = ()=> {
      setConfirmModal(false)
    }

    const confirmVenueListing = async()=> {
      try {
        console.log('confirmvenuelisting')
        const response = await updateVenueStatus({venueId}).unwrap()
        refetch()
        console.log(response)
      } catch (error) {
        console.log(error)
      }
    }


  return (
    <div className="m-5">
      {isConfirmModal && (
        <ConfirmModal title={modalTitle} button={modalButton} isOpen={isConfirmModal} closeModal={closeModal} confirm={confirmVenueListing} />
      )}
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
            
              {venue.map((ven,index) => (
                <tr
                  key={index}
                  className="bg-slate-100 dark:bg-slate-100 hover:bg-slate-200 border-b-2 border"
                >
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {index+1}
                  </th>
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {ven.name}
                  </th>
                  <td className="px-6 py-4">{ven.type}</td>
                  <td className="px-6 py-4">{ven.city}</td>
                  <td className="px-6 py-4">{ven.state}</td>
                  <td className="px-6 py-4">
                    <button  className="bg-slate-700 hover:bg-black transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center">
                      Offers
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    { ven.isListed ? 
                    <button onClick={()=> handleConfrimModal('you want to unlist this venue?','unlist',ven._id)} className="bg-gray-500 hover:bg-black transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center">
                      Unlist
                    </button>
                    :
                    <button onClick={()=> handleConfrimModal('you want to list this venue?','list', ven._id)} className="bg-black hover:bg-[rgb(255,0,0)] transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center">
                      List
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
