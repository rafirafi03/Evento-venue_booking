"use client"
import React, { useState } from "react";
import { faAdd, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ConfirmModal from '../confirmModal/page';
import { useRouter } from "next/navigation";
import Header from "app/(components)/login-header/header";
import Aside from 'app/(components)/company/aside/page';
import { getUserIdFromToken } from "utils/tokenHelper";
import { useGetOffersQuery, useDeleteOfferMutation } from "app/store/slices/companyApiSlices";
import toast, { Toaster } from "react-hot-toast";



export default function page() {

  const companyId = getUserIdFromToken('authCompanyToken')

  const {data: offers, isLoading, isError, refetch} = useGetOffersQuery(companyId);
  const [deleteOffer] = useDeleteOfferMutation()
  console.log(offers)

  const [modalTitle, setModalTitle] = useState<string>('')
  const [modalButton, setModalButton] = useState<string>('')
  const [isConfirmModal, setConfirmModal] = useState<boolean>(false)
  const [offerId, setOfferId] = useState<string>('')

  const router = useRouter()

    const handleChange = ()=> {
        router.push('/company/addOffer')
    }

    const handleConfrimModal = (title: string, button: string, offerId: string)=> {
      setModalTitle(title) 
      setModalButton(button)
      setOfferId(offerId)
      setConfirmModal(true)
    }

    const closeModal = ()=> {
      setConfirmModal(false)
    }

    const confirmDeleteOffer = async()=> {
      try {
        const loadingToast = toast.loading("deleting...");
        const response = await deleteOffer(offerId).unwrap()
        toast.dismiss(loadingToast);

        if (response.success) {
          toast.success(<b>Offer deleted Successfully!</b>);
          refetch()
        } else {
          toast.error(<b>Could not delete.</b>);
        }


      } catch (error) {
        toast.dismiss()
        toast.error(<b>Error Occured.</b>)
      }
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
        <div className="flex-1 p-4 bg-slate-100 h-screen">
        <div className="m-5">
      {isConfirmModal && (
        <ConfirmModal title={modalTitle} button={modalButton} isOpen={isConfirmModal} closeModal={closeModal} confirm={confirmDeleteOffer} />
      )}
      <h1 className="font-extrabold text-2xl mt-5">Offers</h1>
      <div className="flex justify-end mb-5">
      <button
      onClick={handleChange}
        className="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-2 text-center inline-flex items-center dark:bg-red-600 dark:hover:bg-red-600 dark:focus:ring-red-300"
      >
        Add Offer
        <FontAwesomeIcon icon={faAdd} className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-white group-hover:text-white ml-2" />

      </button>
      </div>
      {offers?.length > 0 ? (
        <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-center rtl:text-right text-black dark:text-black">
          <thead className="font-bold text-black uppercase bg-white dark:bg-white dark:text-black">
            <tr>
              <th scope="col" className="px-6 py-3">
                No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                percentage
              </th>
              <th scope="col" className="px-6 py-3">
                validity (days)
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
            
              {offers.map((offer,index) => (
                <tr
                  key={index}
                  className="bg-slate-100 dark:bg-slate-100 hover:bg-slate-200 border-b-2 border"
                >
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {index+1}
                  </th>
                  <th scope="row" className="px-6 py-4 whitespace-nowrap">
                    {offer.name}
                  </th>
                  <td className="px-6 py-4">{offer.percentage}</td>
                  <td className="px-6 py-4">{offer.validity}</td>
                  
                  <td className="px-6 py-4">
                    <FontAwesomeIcon icon={faTrash} onClick={()=>handleConfrimModal('want to delete this offer', 'delete',offer._id)} className="flex-shrink-0 w-5 h-5 text-[rgb(255,0,0)] transition-transform duration-200 transform hover:scale-125 dark:text-[rgb(255,0,0)] group-hover:text-white ml-2" />

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
      
          <h1>No venues found</h1> 

    )}
    </div>
        </div>
      </div>
    </>
    
  );
}
