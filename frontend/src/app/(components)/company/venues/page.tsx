"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  useGetVenuesQuery,
  useUpdateVenueStatusMutation,
  useGetOffersQuery,
  useApplyOfferMutation
} from "app/store/slices/companyApiSlices";
import ConfirmModal from "../../../../components/common/confirmModal/page";
import { useRouter } from "next/navigation";
import Header from "app/(components)/login-header/header";
import Aside from "app/(components)/company/aside/page";
import { getUserIdFromToken } from "utils/tokenHelper";
import OfferListModal from "components/companyComponents/modals/offerListModal";
import toast, { Toaster } from "react-hot-toast";


export default function page() {
  const companyId = getUserIdFromToken("authCompanyToken");

  const {
    data: venues,
    isLoading,
    isError,
    refetch,
  } = useGetVenuesQuery(companyId);
  const { data: offers, refetch: offerRefetch } = useGetOffersQuery(companyId);
  const [updateVenueStatus] = useUpdateVenueStatusMutation();
  const [applyOffer] = useApplyOfferMutation()

  useEffect(() => {
    refetch()
  },[venues])

  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalButton, setModalButton] = useState<string>("");
  const [venueId, setVenueId] = useState<string>("");
  const [venueOfferId, setVenueOfferId] = useState<string>('')
  const [isConfirmModal, setConfirmModal] = useState<boolean>(false);
  const [isOfferListModal, setOfferListModal] = useState<boolean>(false);

  const router = useRouter();

  console.log(venues?.venues);

  const venue = venues?.venues?.venues;

  const handleChange = () => {
    router.push("/company/addVenue");
  };

  const handleConfirmModal = (title: string, button: string, id: string) => {
    setModalTitle(title);
    setModalButton(button);
    setVenueId(id);
    setConfirmModal(true);
  };

  const closeModal = () => {
    setConfirmModal(false);
  };

  const confirmVenueListing = async () => {
    try {
      console.log("confirmvenuelisting");
      const response = await updateVenueStatus({ venueId }).unwrap();
      refetch();
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const closeOfferListModal = () => {
    setOfferListModal(false);
  };

  const handleRemoveOffer = async(offerId: string)=> {
    try {
      const loadingToast = toast.loading('Removing...');
      const res = await applyOffer({ venueId }).unwrap();
      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success(<b>Offer applied successfully!</b>);
        refetch()
      } else {
        toast.error(<b>Could not apply.</b>);
      }

    } catch (error) {
      toast.dismiss();
      toast.error(<b>Error occurred.</b>);
      console.log(error);
    }
  }

  const handleApplyOffer = async (offerId: string) => {
    try {
      const loadingToast = toast.loading('Saving...');
      const res = await applyOffer({ venueId, offerId }).unwrap();
      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success(<b>Offer applied successfully!</b>);
        refetch()
      } else {
        toast.error(<b>Could not apply.</b>);
      }

    } catch (error) {
      toast.dismiss();
      toast.error(<b>Error occurred.</b>);
      console.log(error);
    }
  };

  return (
    <>
    <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      {isOfferListModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <OfferListModal
            venueOfferId = {venueOfferId}
            isOpenModal={isOfferListModal}
            onClose={closeOfferListModal}
            offers={offers}
            onSubmit={handleApplyOffer}
            removeOffer={handleRemoveOffer}
          />
        </div>
      )}

      <div className="flex mt-[64px]">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside />
        </aside>
        <div className="flex-1 p-4 bg-slate-100 h-screen">
          <div className="m-5">
            {isConfirmModal && (
              <ConfirmModal
                title={modalTitle}
                button={modalButton}
                isOpen={isConfirmModal}
                closeModal={closeModal}
                confirm={confirmVenueListing}
              />
            )}
            <h1 className="font-extrabold text-2xl mt-5">Venues</h1>
            <div className="flex justify-end mb-5">
              <button
                onClick={handleChange}
                className="text-white bg-red-500 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs px-2 py-1 text-center inline-flex items-center dark:bg-red-500 dark:hover:bg-red-500 dark:focus:ring-red-300"
              >
                Add Venue
                <FontAwesomeIcon
                  icon={faAdd}
                  className="flex-shrink-0 w-5 h-5 text-white transition duration-75 dark:text-white group-hover:text-white ml-2"
                />
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
                      {venue.map((ven, index) => (
                        <tr
                          key={index}
                          className="bg-slate-100 dark:bg-slate-100 hover:bg-slate-200 border-b-2 border"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {index + 1}
                          </th>
                          <th
                            scope="row"
                            className="px-6 py-4 whitespace-nowrap"
                          >
                            {ven.name}
                          </th>
                          <td className="px-6 py-4">{ven.type}</td>
                          <td className="px-6 py-4">{ven.city}</td>
                          <td className="px-6 py-4">{ven.state}</td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() => {
                                setOfferListModal(true);
                                setVenueId(ven._id);
                                setVenueOfferId(ven.offerId)
                              }}
                              className="bg-slate-700 hover:bg-black transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center"
                            >
                              Offers
                            </button>
                          </td>
                          <td className="px-6 py-4">
                            {ven.isListed ? (
                              <button
                                onClick={() =>
                                  handleConfirmModal(
                                    "you want to unlist this venue?",
                                    "unlist",
                                    ven._id
                                  )
                                }
                                className="bg-gray-500 hover:bg-black transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center"
                              >
                                Unlist
                              </button>
                            ) : (
                              <button
                                onClick={() =>
                                  handleConfirmModal(
                                    "you want to list this venue?",
                                    "list",
                                    ven._id
                                  )
                                }
                                className="bg-black hover:bg-[rgb(255,0,0)] transition-transform duration-300 hover:scale-110 text-white text-xs p-2 rounded-xl h-5 flex items-center"
                              >
                                List
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <button
                              onClick={() =>
                                router.push(`/company/venueDetails/${ven._id}`)
                              }
                              className="bg-black transition-transform duration-300 hover:scale-110 text-xs text-white p-2 rounded-xl h-5 flex items-center"
                            >
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
              <h1>No venues found</h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
