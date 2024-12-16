"use client";

import {
  MapPin,
  Users,
  IndianRupee,
  Phone,
  Mail,
  Calendar,
  Trash,
  Building,
  CalendarDays,
  Dot,
  XCircle,
  X,
  Check,
} from "lucide-react";
import Header from "components/userComponents/header";
import Aside from "app/(components)/company/aside/page";
import CancelBookingModal from "components/userComponents/cancelBookingModal";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAddReviewMutation } from "app/store/slices/companyApiSlices";
import {
  useCancelBookingMutation,
  useGetBookingDetailsQuery,
} from "app/store/slices/bookingApiSlices";
import toast, { Toaster } from "react-hot-toast";
import RatingCard from "components/common/cards/ratingCard";
import AuthHOC,{Role} from "components/common/auth/authHoc";

export default function BookingDetails({ params }: { params: { id: string } }) {
  const router = useRouter();

  const { id } = params;

  const { data: booking, refetch } = useGetBookingDetailsQuery(id);
  let userId : string;
  let venueId: string;
  let userName : string;
  let userEmail : string;

  useEffect(() => {
    userId = booking?.userId._id
    venueId = booking?.venueId._id
    userName = booking?.userId.name
    userEmail = booking?.userId.email
  })

  const [isCancelModal, setCancelModal] = useState<boolean>(false);

  const [cancelBooking] = useCancelBookingMutation();
  const [addReview] = useAddReviewMutation()

  const closeModal = () => {
    setCancelModal(false);
  };

  const handleCancelBooking = () => {
    setCancelModal(true);
  };

  const handleConfirmCancellation = async () => {
    try {
      const loadingToast = toast.loading("Cancelling...");
      const response = await cancelBooking({ bookingId: id }).unwrap();
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success(<b>Booking Cancelled!</b>);
        refetch();
      } else {
        toast.error(<b>Cancellation failed!</b>);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(<b>Error occurred.</b>);
      console.log(error);
    }
  };

  const handleRatingSubmit = async (star: number, review: string) => {
    try {
      const loadingToast = toast.loading('submitting...')
      const response = await addReview({userId, venueId, userName, userEmail, star, review}).unwrap();
      toast.dismiss(loadingToast)

      if(response.success) {
        toast.success('review submitted!')
      } else {
        toast.error('review submission failed!')
      }

    } catch (error) {
      console.log(error);
      toast.dismiss()
      toast.error('error occured')
    }
  };

  return (
    <AuthHOC role={Role.User} >
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-slate-100 shadow-lg">
        <Header />
      </nav>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      {isCancelModal && (
        <CancelBookingModal
          isOpen={isCancelModal}
          isClose={closeModal}
          handleCancelConfirm={handleConfirmCancellation}
        />
      )}
      <div className="flex-1 p-7 mt-16 bg-slate-100 my-3">
        <div className="min-h-screen bg-white shadow-lg rounded-lg">
          <div className="relative h-64 bg-gray-200 rounded-lg">
            <img
              src={booking?.venueId?.image}
              alt="Venue cover"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
              <h1 className="text-3xl font-bold text-white">{booking?.name}</h1>
            </div>
          </div>

          <div className="max-w-6xl mx-auto my-3 p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white rounded-lg border shadow-md p-6">
                <h2 className="text-2xl font-semibold mb-4">booking Details</h2>
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
                      {new Date(booking?.bookingDateStart).toLocaleDateString()}{" "}
                      to{" "}
                      {new Date(booking?.bookingDateEnd).toLocaleDateString()}
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
                <div className="bg-white rounded-lg shadow-md border p-6">
                  <h3 className="text-xl font-semibold mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 mr-2 text-red-600" />
                      <span>dfsfd</span>
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

            {booking?.status == "confirmed" && (
              <>
                <hr className="my-5" />

                <RatingCard handleRatingSubmit={handleRatingSubmit} />
              </>
            )}
          </div>
        </div>
      </div>
    </AuthHOC>
  );
}
