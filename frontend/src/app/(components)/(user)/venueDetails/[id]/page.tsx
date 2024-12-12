"use client";

import React, { useEffect, useState } from "react";
import Header from "../../../../../components/userComponents/header";
import Footer from "../../footer/page";
import { useGetVenueDetailsQuery } from "app/store/slices/companyApiSlices";
import AuthHOC from "components/common/auth/authHoc";
import { loadStripe } from "@stripe/stripe-js";
import { useMakePaymentMutation } from "app/store/slices/bookingApiSlices";
import dotenv from "dotenv";
import BookingModal from "components/userComponents/bookingModal";
import PaymentModal from "components/common/modals/paymentModal";
import { getUserIdFromToken } from "utils/tokenHelper";
import { parseDate, DateValue } from "@internationalized/date";
import { useGetUserDetailsQuery } from "app/store/slices/userApiSlices";
import WalletModal from 'components/common/modals/walletModal';
import ReviewListingCard from "components/common/cards/reviewListingCard";
import toast, {Toaster} from "react-hot-toast";

type RangeValue<T> = {
  start: T;
  end: T;
};

dotenv.config();

export default function page({ params }: { params: { id: string } }) {
  const [makePayment] = useMakePaymentMutation();
  const [isBookingModal, setBookingModal] = useState<boolean>(false);
  const [isPaymentModal, setPaymentModal] = useState<boolean>(false);
  const [isWalletModal, setWalletModal] = useState<boolean>(false);
  const [bookingAmount, setBookingAmount] = useState<number>(0)
  const [event, setEvent] = useState<string>('');
  const [guests, setGuests] = useState<number>(0);
  const [bookingDuration, setBookingDuration] = useState<RangeValue<DateValue>>({
    start: parseDate("2024-04-08"),
    end: parseDate("2024-04-08"),
  });
  const userId = getUserIdFromToken("authUserToken");

  // const router = useRouter();
  const venueId = params.id;

  console.log(params.id, "prmssss idddddd");
  console.log(venueId, "id in frontend");

  const { data: venue} = useGetVenueDetailsQuery(venueId);
  const { data: user } = useGetUserDetailsQuery(userId)

  console.log(venue, "venue in frontend");

  const images = venue?.images;

  useEffect(() => {
    if (venue?.amount) {
      const calculatedAmount = venue.amount * 0.1; // Calculate 10% of venue amount
      setBookingAmount(calculatedAmount);
    }
  }, [venue]);

  const isClose = () => {
    setBookingModal(false);
    setPaymentModal(false);
  };

  const handleBooking = (event: string, guests: number, bookingDuration: RangeValue<DateValue>)=> {
    setEvent(event);
    setGuests(guests);
    setBookingDuration(bookingDuration)
    setPaymentModal(true)
  }

  const handlePaymentMethod = (paymentMethod: string)=> {
    console.log(paymentMethod,"paymentmethoddddddddddd")
    if(paymentMethod == 'online') {
      handlePayment(paymentMethod)
    } else {
      console.log('giii')
      setWalletModal(true)
      setBookingModal(false)
      setPaymentModal(false)
      console.log('giii22222')
    }
  }

  const handlePayment = async (paymentMethod: string) => {
    try {
      const loadingToast = toast.loading('processing payment...')
      if (paymentMethod === "online") {
        // Use Stripe for online payments
        const stripe = await loadStripe(
          "pk_test_51QIW2Z04vhsHHnxMXq9wq2BPsf5Lsy3LgQLC6quw5HKBS2aaVofHBiGzsZKQBG4oiKrNkEMBvHJNvvC5KlCyQCnB00dRuVASgF"
        );
  
        const response = await makePayment({
          userId,
          venueId,
          event,
          guests,
          bookingDuration,
          paymentMethod,
        }).unwrap();
        toast.dismiss(loadingToast)
  
        const result = await stripe?.redirectToCheckout({
          sessionId: response.id,
        });

        if(response.success) {
          toast.success(<b>Payment completed!</b>)
        } else {
          toast.error(<b>Payment failed</b>)
        }
  
        console.log(result, "stripe result in frontend");
      } else {
        // Handle non-online payment methods
        setPaymentModal(false)
        setBookingModal(false)
        setWalletModal(false)      

        const response = await makePayment({
          userId,
          venueId,
          event,
          guests,
          bookingDuration,
          paymentMethod,
        }).unwrap();
        toast.dismiss(loadingToast)

        if(response.success) {
          toast.success(<b>Payment completed!</b>)
        } else {
          toast.error(<b>Payment failed!</b>)
        }
  
        console.log("Payment processed for offline method", response);
      }
  
      // Update UI after payment attempt
    } catch (error) {
      toast.dismiss()
      toast.error(<b>Payment failed!</b>)
      console.log(error);
    }
  };
  

  return (
    <AuthHOC role="user">
      <div className="bg-slate-50">
      <Toaster position="bottom-center" reverseOrder={false}/>
        <div className="my-16">
          <Header />
        </div>

        <div className="mx-auto px-6 max-w-7xl items-center justify-center p-6 rounded-lg">




          {isBookingModal && (
            <BookingModal
            isOpen={isBookingModal}
            isClose={isClose}
            handleBooking={handleBooking}
            capacity={venue.capacity}
            />
          )}


          {isPaymentModal && (
            <PaymentModal isOpen={isPaymentModal} closeModal={isClose} handlePaymentMethod={handlePaymentMethod} balance={user?.wallet} bookingAmount={bookingAmount} />
          )}

          {isWalletModal && (
            <WalletModal isOpen={isWalletModal} isClose={isClose} balance={user?.wallet} bookingAmount={bookingAmount} handlePayment={handlePayment} />
          )}

          <div className="flex max-w-full my-auto mt-5">
            <div className="grid gap-4 w-3/4">
              <div className="h-96 w-full overflow-hidden">
                {" "}
                {/* Set fixed height and full width */}
                <img
                  className="h-full w-full object-cover rounded-lg" // Make the image cover the entire div
                  src={images?.[0]}
                  alt=""
                />
              </div>
              <div className="grid grid-cols-5 gap-4 ">
                {images?.slice(1).map((ven, index) => (
                  <div key={index + 1} className="">
                    <img
                      className="h-32 overflow-hidden max-w-full w-full rounded-lg"
                      src={ven}
                      alt=""
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/4 p-6 ml-5 right-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <a>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {venue?.name}
                </h5>
              </a>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                No reviews. write a review.
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {venue?.address}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {`${venue?.city + "," + venue?.state}`}
              </p>

              <a className="block my-3 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                  Price per day ₹{venue?.amount}
                </h5>
                <hr className="my-2" />
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  upto {venue?.capacity} guests
                </p>
              </a>
              <button
                onClick={() => setBookingModal(true)}
                className="inline-flex justify-center items-center px-3 my-3 mx-5 py-2 w-4/5 text-sm font-medium text-center text-white bg-[rgb(255,0,0)] rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
              >
                Schedule Booking
              </button>

              <hr className="my-3" />

              <p className="text-sm font-bold">{venue?.description}</p>
            </div>
          </div>

          <hr className="my-5" />

          <div className="text-center">
            <h1 className="text-lg font-bold my-3">About</h1>

            <h3 className="text-sm font-bold my-2">
              celebrarte you function with{" "}
              <span className="text-red-500">{venue?.name}</span>
            </h3>

            <p className="text-sm text-center">{venue?.description}.</p>
          </div>

          <hr className="my-5" />

          <ReviewListingCard venueId={venueId} />
          
        </div>

        <div className="mt-5">
          <Footer />
        </div>
      </div>
    </AuthHOC>
  );
}
