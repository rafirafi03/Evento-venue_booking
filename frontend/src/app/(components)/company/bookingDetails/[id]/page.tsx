"use client";

import {
  MapPin,
  Users,
  IndianRupee,
  Phone,
  Mail,
  Calendar,
  Building,
  XCircle,
  X,
  Check,
  User,
} from "lucide-react";
import Header from "components/userComponents/header";
import Aside from "components/companyComponents/aside/page";
import CancelBookingModal from "components/userComponents/cancelBookingModal";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  useCancelBookingMutation,
  useGetBookingDetailsQuery,
} from "app/store/slices/bookingApiSlices";
import AuthHOC, { Role } from "components/common/auth/authHoc";
import Image from "next/image";
import { isApiError } from "utils/errors";

export default function BookingDetails({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { id } = params;

  const {
    data: booking,
    error: bookingFetchError,
    refetch,
  } = useGetBookingDetailsQuery(id);

  useEffect(() => {
    if (bookingFetchError && "status" in bookingFetchError) {
      if (bookingFetchError.status === 401) {
        console.warn("Session expired. Logging out...");
        localStorage.removeItem("authCompanyToken");
        router.push("/company/login");
      }
    }
  }, [bookingFetchError, router]);

  const [isCancelModal, setCancelModal] = useState<boolean>(false);

  const [cancelBooking] = useCancelBookingMutation();

  const closeModal = () => {
    setCancelModal(false);
  };

  const handleCancelBooking = () => {
    setCancelModal(true);
  };

  const handleConfirmCancellation = async () => {
    try {
      const response = await cancelBooking({ bookingId: id }).unwrap();

      if (response.success) {
        refetch();
      }
    } catch (error: unknown) {
      console.error(error);

      if (isApiError(error) && error.status === 401) {
        localStorage.removeItem("authCompanyToken");
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

        {isCancelModal && (
          <CancelBookingModal
            isOpen={isCancelModal}
            isClose={closeModal}
            handleCancelConfirm={handleConfirmCancellation}
          />
        )}
        <div className="flex mt-[64px]">
          <aside className="w-64 bg-slate-white dark:bg-gray-800">
            <Aside />
          </aside>
          <div className="flex-1 p-7 bg-slate-100 my-2">
            <div className="min-h-screen bg-white shadow-lg rounded-lg">
              <div className="relative h-64 bg-gray-200 rounded-lg">
                <Image
                  src={booking?.venueId?.image}
                  alt="Venue cover"
                  className="w-full h-full object-cover rounded-lg"
                  width={500}
                  height={500}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                  <h1 className="text-3xl font-bold text-white">
                    {booking?.name}
                  </h1>
                </div>
              </div>

              <div className="max-w-6xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-2xl font-semibold mb-4">
                      booking Details
                    </h2>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Building className="w-5 h-5 mr-2 text-red-600" />
                        <span>{booking?.venueId.name}</span>
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-red-600" />
                        <span>
                          {booking?.venueId.city}, {booking?.venueId.state}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Users className="w-5 h-5 mr-2 text-red-600" />
                        <span>No of Guests: {booking?.guests} guests</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 mr-2 text-red-600" />
                        <span>
                          Date:{" "}
                          {new Date(
                            booking?.bookingDateStart
                          ).toLocaleDateString()}{" "}
                          to{" "}
                          {new Date(
                            booking?.bookingDateEnd
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      {booking?.status == "confirmed" ? (
                        <>
                          <div className="flex items-center">
                            <IndianRupee className="w-5 h-5 mr-2 text-red-600" />
                            <span>Advance: ₹{booking?.amount}</span>
                          </div>
                          <div className="flex items-center">
                            <Check className="w-5 h-5 mr-2 text-success-600" />
                            <span>
                              Staus:{" "}
                              <span className="text-success-600">
                                {booking?.status}
                              </span>
                            </span>
                          </div>
                        </>
                      ) : (
                        <div className="flex items-center">
                          <XCircle className="w-5 h-5 mr-2 text-red-600" />
                          <span>
                            Staus:{" "}
                            <span className="text-danger-500">
                              {booking?.status}
                            </span>
                          </span>
                        </div>
                      )}
                    </div>
                    {/* <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-2">Amenities</h3>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Free Wi-Fi</li>
                      <li>On-site parking</li>
                      <li>Catering services</li>
                      <li>AV equipment</li>
                      <li>Wheelchair accessible</li>
                    </ul>
                  </div> */}
                  </div>

                  <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <h3 className="text-xl font-semibold mb-4">
                        Contact Information
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <User className="w-5 h-5 mr-2 text-red-600" />
                          <span>{booking?.userId.name}</span>
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-5 h-5 mr-2 text-red-600" />
                          <span>{booking?.userId.phone}</span>
                        </div>
                        <div className="flex items-center">
                          <Mail className="w-5 h-5 mr-2 text-red-600" />
                          <span>{booking?.userId.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() =>
                          router.push(
                            `/company/venueDetails/${booking?.venueId._id}`
                          )
                        }
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center"
                      >
                        <Building className="w-4 h-4 mr-2" /> Venue Details
                      </button>
                      {/* <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center">
                      <Calendar className="w-4 h-4 mr-2" /> Manage Availability
                    </button> */}
                      <button
                        onClick={handleCancelBooking}
                        className="w-full border border-red-600 text-red-600 hover:bg-red-50 font-bold py-2 px-4 rounded flex items-center justify-center"
                      >
                        <X className="w-4 h-4 mr-2" /> Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </AuthHOC>
  );
}
