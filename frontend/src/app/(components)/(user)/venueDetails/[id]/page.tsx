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
  const userId = getUserIdFromToken("authToken");

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

          <h1 className="text-lg font-bold text-center my-5">Reviews</h1>

          <div className="grid mb-8 border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 md:grid-cols-2 bg-white dark:bg-gray-800">
            <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-ss-lg md:border-e dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Very easy this was to integrate
                </h3>
                <p className="my-4">
                  If you care for your time, I hands down would go with this."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/karen-nelson.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Bonnie Green</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 ">
                    Developer at Open AI
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Solid foundation for any project
                </h3>
                <p className="my-4">
                  Designing with Figma components that can be easily translated
                  to the utility classNamees of Tailwind CSS is a huge
                  timesaver!"
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/roberta-casas.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Roberta Casas</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Lead designer at Dropbox
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-b border-gray-200 md:rounded-es-lg md:border-b-0 md:border-e dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Mindblowing workflow
                </h3>
                <p className="my-4">
                  Aesthetically, the well designed components are beautiful and
                  will undoubtedly level up your next application."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/jese-leos.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Jese Leos</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Software Engineer at Facebook
                  </div>
                </div>
              </figcaption>
            </figure>
            <figure className="flex flex-col items-center justify-center p-8 text-center bg-white border-gray-200 rounded-b-lg md:rounded-se-lg dark:bg-gray-800 dark:border-gray-700">
              <blockquote className="max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Efficient Collaborating
                </h3>
                <p className="my-4">
                  You have many examples that can be used to create a fast
                  prototype for your team."
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center ">
                <img
                  className="rounded-full w-9 h-9"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/joseph-mcfall.png"
                  alt="profile picture"
                />
                <div className="space-y-0.5 font-medium dark:text-white text-left rtl:text-right ms-3">
                  <div>Joseph McFall</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    CTO at Google
                  </div>
                </div>
              </figcaption>
            </figure>
          </div>

          <div className="flex justify-center items-center">
            <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-10 rounded-lg shadow-md transition duration-300 ease-in-out">
              Read More
            </button>
          </div>
          <hr className="my-5" />

          <h1 className="text-lg font-bold text-center my-5">
            Write your Review
          </h1>

          <div className="w-full p-4 text-center bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-center my-3">
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-yellow-300 me-1"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <svg
                className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 20"
              >
                <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
              </svg>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                4.95
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                out of
              </p>
              <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                5
              </p>
            </div>

            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            <div className="flex justify-center items-center mt-5">
              <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-5 rounded-lg shadow-md transition duration-300 ease-in-out">
                Submit
              </button>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <Footer />
        </div>
      </div>
    </AuthHOC>
  );
}
