"use client";

import {
  MapPin,
  Users,
  DollarSign,
  Phone,
  Mail,
  Edit,
  Calendar,
  Trash,
  TagIcon,
} from "lucide-react";
import Header from "components/common/login-header/header";
import Aside from "components/companyComponents/aside/page";
import {
  useGetVenueDetailsQuery,
  useDeleteVenueMutation,
} from "app/store/slices/companyApiSlices";
import ConfirmModal from "../../../../../components/common/confirmModal/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
import AuthHOC, { Role } from "components/common/auth/authHoc";
import { isApiError } from "utils/errors";
import Image from "next/image";

export default function VenueDetails({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { id } = params;

  const { data: venue } = useGetVenueDetailsQuery(id);
  const [deleteVenue] = useDeleteVenueMutation();

  const images = venue?.images;

  console.log(venue);

  const [isConfirmModal, setConfirmModal] = useState<boolean>(false);
  const [modalTitle, setModalTitle] = useState<string>("");
  const [modalButton, setModalButton] = useState<string>("");

  const handleConfrimModal = (title: string, button: string) => {
    setModalTitle(title);
    setModalButton(button);
    setConfirmModal(true);
  };

  const closeModal = () => {
    setConfirmModal(false);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteVenue(id).unwrap();

      if (response.success) {
        router.push("/company");
      }
    } catch (error: unknown) {
      console.error(error);

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
      {isConfirmModal && (
        <ConfirmModal
          title={modalTitle}
          button={modalButton}
          isOpen={isConfirmModal}
          closeModal={closeModal}
          confirm={confirmDelete}
        />
      )}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div className="flex mt-[64px]">
        <aside className="w-64 bg-slate-white dark:bg-gray-800">
          <Aside />
        </aside>
        <div className="flex-1 p-4 bg-slate-100 my-3">
          <div className="min-h-screen bg-white shadow-lg rounded-lg">
            <div className="relative h-64 bg-gray-200">
              <Image
                src={images?.[0]}
                alt="Venue cover"
                className="w-full h-full object-cover rounded-lg"
                width={500}
                height={500}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h1 className="text-3xl font-bold text-white">{venue?.name}</h1>
              </div>
            </div>

            <div className="max-w-6xl mx-auto p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-semibold mb-4">Venue Details</h2>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2 text-red-600" />
                      <span className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                        {venue?.address}, {venue?.city}, {venue?.state}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2 text-red-600" />
                      <span className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                        Capacity: {venue?.capacity} guests
                      </span>
                    </div>
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2 text-red-600" />
                      {venue?.offerId ? (
                        <>
                          <span className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                            Price: ₹
                            {venue.amount -
                              venue.amount *
                                (venue.offerId?.percentage / 100)}{" "}
                            / hour
                          </span>
                          <span className="text-xs text-red-500 line-through block ml-2">
                            ₹{venue?.amount} / hour
                          </span>
                        </>
                      ) : (
                        <span className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                          Price: ₹{venue?.amount} / hour
                        </span>
                      )}
                    </div>
                    {venue?.offerId && (
                      <div className="flex items-center">
                        <TagIcon className="w-5 h-5 mr-2 text-red-600" />
                        <span className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
                          {venue?.offerId?.percentage} % off
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{venue?.description}</p>
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Amenities</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Free Wi-Fi</li>
                      <li>On-site parking</li>
                      <li>Catering services</li>
                      <li>AV equipment</li>
                      <li>Wheelchair accessible</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-white rounded-lg shadow-md p-6">
                    <h3 className="text-xl font-semibold mb-4">
                      Contact Information
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Phone className="w-5 h-5 mr-2 text-red-600" />
                        <span>{venue?.phone}</span>
                      </div>
                      <div className="flex items-center">
                        <Mail className="w-5 h-5 mr-2 text-red-600" />
                        <span>info@grandballroom.com</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={() =>
                        router.push(`/company/editVenue/${venue._id}`)
                      }
                      className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                    >
                      <Edit className="w-4 h-4 mr-2" /> Edit Venue
                    </button>
                    
                    <button
                      onClick={() =>
                        handleConfrimModal(
                          "you want to delete this venue?",
                          "delete"
                        )
                      }
                      className="w-full border border-red-600 text-red-600 hover:bg-red-50 font-bold py-2 px-4 rounded flex items-center justify-center"
                    >
                      <Trash className="w-4 h-4 mr-2" /> Delete Venue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthHOC>
  );
}
