"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Star, Clock, Home, Calendar, Edit } from "lucide-react";
import Header from "components/userComponents/header";
import {
  useGetUserDetailsQuery,
  useResetPasswordMutation,
  useEditUserProfileMutation,
  useGetFavouritesQuery,
  useDeleteFromFavouritesMutation,
} from "app/store/slices/userApiSlices";
import { IBooking, IFavourite, IReview } from "types/types";
import { useGetUserBookingsQuery } from "app/store/slices/bookingApiSlices";
import { useCancelBookingMutation } from "app/store/slices/bookingApiSlices";
import { useGetRatingsByUserIdQuery } from "app/store/slices/companyApiSlices";
import { getUserIdFromToken } from "utils/tokenHelper";
import toast, { Toaster } from "react-hot-toast";
import AuthHOC, { Role } from "components/common/auth/authHoc";
import { editProfileSchema } from "app/schema/validation";
import CancleBookingModal from "components/userComponents/cancelBookingModal";
import Image from "next/image";
import fetchErrorCheck from "utils/fetchErrorCheck";

export default function UserProfile() {
  const router = useRouter();

  const userId = getUserIdFromToken("authUserToken");

  const { data: userDetails, error: userFetchError } =
    useGetUserDetailsQuery(userId);

  const { data: userReview } = useGetRatingsByUserIdQuery(userId);

  console.log(userReview);

  useEffect(() => {
      const isError = fetchErrorCheck({fetchError : userFetchError, role: 'user'})

      if(isError) {
        router.push('/login')
      }
  }, [userFetchError, router]);

  const { data: initialBookings } = useGetUserBookingsQuery(userId);
  console.log(initialBookings, " initialbookingsssss");

  const { data: initialFavourites } = useGetFavouritesQuery(userId);

  console.log(initialFavourites, "favrts in frontend");
  const [resetPass] = useResetPasswordMutation();
  const [editUser] = useEditUserProfileMutation();
  const [deleteFromFavourites] = useDeleteFromFavouritesMutation();
  const [cancelBooking] = useCancelBookingMutation();

  console.log(userDetails, "userdetils in fronend hurreyey");

  const [currPass, setCurrPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setComfirmPass] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});
  const [cancelBookingModal, setCancelBookingModal] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>("");
  const [initialUserName, setInitialUserName] = useState(userName);
  const [bookings, setBookings] = useState<IBooking[]>(initialBookings || []);
  const [favourites, setFavourites] = useState<IFavourite[]>(
    initialFavourites || []
  );

  // Set initial values when component mounts
  useEffect(() => {
    if (userDetails?.userName) {
      setUserName(userDetails.userName);
      setInitialUserName(userDetails.userName);
    }
  }, [userDetails]);

  useEffect(() => {
    if (initialBookings) {
      setBookings(initialBookings);
    }
  }, [initialBookings]);

  useEffect(() => {
    if (initialFavourites) {
      setFavourites(initialFavourites);
    }
  }, [initialFavourites]);

  const [activeTab, setActiveTab] = useState("upcoming");

  const handleEditUserProfile = async () => {
    if (userName === initialUserName) {
      console.log("No changes detected.");
      return; // Exit if no change
    }

    // Validate the input data with Zod
    const validationResult = editProfileSchema.safeParse({ name: userName });

    if (!validationResult.success) {
      // If validation fails, set errors and exit
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name ? fieldErrors.name[0] : "",
      });
      return;
    }

    // Clear previous errors if validation succeeds
    setErrors({ name: "" });
    try {
      const loadingToast = toast.loading("Saving...");
      setInitialUserName(userName);
      setUserName(userName);
      const res = await editUser({ userId, userName }).unwrap();
      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success(<b>user details updated!</b>);
      } else {
        toast.error(<b>Could not save.</b>);
      }
    } catch (error) {
      toast.dismiss(); // Dismiss loading toast in case of error
      toast.error(<b>Error occurred.</b>);
      console.log(error);
    }
  };

  const handleSubmitResetPass = async () => {
    try {
      if (newPass !== confirmPass) {
        console.log("password doesnt match.");
        return;
      }

      if (currPass.trim() == "") {
        setErrors({ password: "Current Password needed!" });
        return;
      } else if (newPass.trim() == "") {
        setErrors({ password: "new Password required!" });
        return;
      } else if (newPass.length < 6) {
        setErrors({ password: "new password atleast 6 characters needed!" });
        return;
      } else if (confirmPass.trim() == "") {
        setErrors({ password: "confirmPass required!" });
        return;
      } else if (confirmPass.length < 6) {
        setErrors({
          password: "confirm password atleast 6 characters needed!",
        });
        return;
      }

      const loadingToast = toast.loading("Saving...");
      const res = await resetPass({ userId, currPass, newPass }).unwrap();
      toast.dismiss(loadingToast);

      if (res.success) {
        toast.success(<b>reset password successfull!</b>);
        setCurrPass("");
        setNewPass("");
        setComfirmPass("");
      } else {
        toast.error(<b>Could not save.</b>);
      }

      console.log(res);
    } catch (error) {
      toast.dismiss(); // Dismiss loading toast in case of error
      toast.error(<b>Error occurred.</b>);
      console.log(error);
    }
  };

  const handleDeleteFromFavourites = async (venueId: string) => {
    try {
      const loadingToast = toast.loading("removing from favourites...");
      const response = await deleteFromFavourites({ userId, venueId }).unwrap();
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success(<b>Succesfully removed!</b>);
        setFavourites((prevFavourites: IFavourite[]) =>
          prevFavourites.filter(
            (favourites: IFavourite) => favourites.venueId !== venueId
          )
        );
      } else {
        toast.error(<b>failed to remove from favourites!</b>);
      }
      console.log(response);
    } catch (error) {
      toast.dismiss();
      toast.error(<b>failed to remove from favourites!</b>);
      console.log(error);
    }
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookingId(bookingId);
    setCancelBookingModal(true);
  };

  const isClose = () => {
    setCancelBookingModal(false);
  };

  const handleCancellation = async () => {
    try {
      const loadingToast = toast.loading("cancelling...");
      const response = await cancelBooking({ bookingId }).unwrap();
      toast.dismiss(loadingToast);

      if (response.success) {
        toast.success(<b>Cancellation successfull</b>);
        setBookings((prevBookings: IBooking[]) =>
          prevBookings.filter((booking: IBooking) => booking._id !== bookingId)
        );
      } else {
        toast.error(<b>Cancellation failed</b>);
      }

      console.log(response);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error(error.message);
      }
      toast.error(<b>Error occurred.</b>);
    }
  };

  return (
    <AuthHOC role={Role.User}>
      <div className="bg-slate-50 h-screen">
        <div>
          <Toaster position="bottom-center" reverseOrder={false} />
        </div>
        <div className="my-16">
          <Header />
        </div>

        <div className="container mx-auto p-6 bg-gray-50">
          {cancelBookingModal && (
            <CancleBookingModal
              isOpen={cancelBookingModal}
              isClose={isClose}
              handleCancelConfirm={handleCancellation}
            />
          )}
          <div className="grid gap-6 md:grid-cols-[300px_1fr]">
            <aside className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
                <div className="text-center p-6">
                  <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full overflow-hidden">
                    <Image
                      src={
                        userDetails?.image ||
                        `https://ui-avatars.com/api/?name=${
                          userName ? userName : userDetails?.userName || "User"
                        }&background=random`
                      }
                      alt={userName ? userName : userDetails?.userName}
                      className="w-full h-full object-cover"
                      width={500}
                      height={500}
                    />
                  </div>
                  <h2 className="mt-4 text-2xl font-bold text-gray-900">
                    {userName ? userName : userDetails?.userName}
                  </h2>
                  <p className="text-gray-600">{userDetails?.email}</p>
                </div>
                <div className="px-6 pb-6">
                  <div className="flex flex-col items-center space-y-4">
                    <button
                      onClick={() => setActiveTab("settings")}
                      className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    >
                      <Edit className="w-4 h-4 inline mr-2" />
                      Edit Profile
                    </button>
                  </div>
                </div>
              </div>
            </aside>
            <main>
              <div className="bg-white border-b border-gray-200">
                <nav className="flex space-x-4" aria-label="Tabs">
                  {["upcoming", "history", "reviews", "favourites"].map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-3 py-2 font-medium text-sm rounded-t-lg ${
                          activeTab === tab
                            ? "border-b-2 border-red-500 text-red-600"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    )
                  )}
                </nav>
              </div>
              <div className="mt-4">
                {activeTab === "upcoming" && (
                  <div className="space-y-4">
                    {bookings?.length > 0 ? (
                      <>
                        {bookings?.map((booking: IBooking) => (
                          <div
                            key={booking._id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                          >
                            <div className="flex items-center space-x-4">
                              <Image
                                src={booking?.venueDetails.image}
                                alt={booking?.event}
                                className="w-24 h-16 object-cover rounded"
                                width={500}
                                height={500}
                              />
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {booking?.event}
                                </h3>
                                <div className="text-sm text-gray-500">
                                  <div className="flex items-center mt-1">
                                    <Home className="w-4 h-4 mr-2" />
                                    {booking?.venueDetails.name},{" "}
                                    {booking?.venueDetails.city}
                                  </div>
                                  <div className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-2" />
                                    {new Date(
                                      booking?.bookingDateStart
                                    ).toLocaleDateString()}{" "}
                                    to{" "}
                                    {new Date(
                                      booking?.bookingDateEnd
                                    ).toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                              <button
                                onClick={() =>
                                  router.push(`/bookingDetails/${booking._id}`)
                                }
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() => handleCancelBooking(booking._id)}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              >
                                Cancel Booking
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                          <h2 className="my-10 text-center text-gray-400">
                            No upcoming bookings
                          </h2>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {activeTab === "history" && (
                  <div className="space-y-4">
                    {bookings?.map((booking: IBooking) => (
                      <div
                        key={booking._id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                      >
                        <div className="flex items-center space-x-4">
                          <Image
                            src={booking.venueDetails.image}
                            alt={booking.venueDetails.name}
                            className="w-24 h-16 object-cover rounded"
                            width={500}
                            height={500}
                          />
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {booking.event}
                            </h3>
                            <div className="text-sm text-gray-500">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-2" />
                                {booking.venueDetails.name},{" "}
                                {booking.venueDetails.city}
                              </div>
                              <div className="flex items-center mt-1">
                                <Clock className="w-4 h-4 mr-2" />
                                {new Date(
                                  booking.bookingDateStart
                                ).toLocaleDateString()}{" "}
                                to{" "}
                                {new Date(
                                  booking.bookingDateEnd
                                ).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex space-x-2">
                          <button
                            onClick={() =>
                              router.push(`/bookingDetails/${booking._id}`)
                            }
                            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                          >
                            View Details
                          </button>
                          <button className="px-4 py-2 text-sm font-medium text-red-600 bg-white border border-red-600 rounded-md hover:bg-red-600 hover:text-white focus:outline-none focus:ring-1 focus:ring-red-500 focus:ring-offset-2">
                            Leave Review
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {userReview.map((review: IReview) => (
                      <div
                        key={review._id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {review.review}
                        </h3>
                        <div className="flex items-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < review.star
                                  ? "text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700">{review.review}</p>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "favourites" && (
                  <div className="space-y-4">
                    {favourites?.length > 0 ? (
                      <>
                        {favourites?.map((fav: IFavourite) => (
                          <div
                            key={fav._id}
                            className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                          >
                            <div className="flex items-center space-x-4">
                              <Image
                                src={fav.venueImage}
                                alt={fav.venueName}
                                className="w-24 h-16 object-cover rounded"
                                width={500}
                                height={500}
                              />
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {fav.venueName}
                                </h3>
                                <div className="text-sm text-gray-500">
                                  <div className="flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {fav.venueAddress}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="mt-4 flex space-x-2">
                              <button
                                onClick={() =>
                                  router.push(`venueDetails/${fav.venueId}`)
                                }
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              >
                                View Details
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteFromFavourites(fav.venueId)
                                }
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        ))}
                      </>
                    ) : (
                      <>
                        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                          <h2 className="my-10 text-center text-gray-400">
                            No favourites
                          </h2>
                        </div>
                      </>
                    )}
                  </div>
                )}
                {activeTab === "settings" && (
                  <>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Account Settings
                      </h3>
                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
                          />
                          {errors.name && (
                            <div className="text-sm text-bold text-[rgb(255,0,0)]">
                              {errors.name}
                            </div>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            defaultValue={userDetails.email}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
                            disabled
                          />
                        </div>

                        <button
                          onClick={handleEditUserProfile}
                          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 my-5">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Reset Password
                      </h3>
                      {errors.password && (
                        <div className="text-sm text-[rgb(255,0,0)] mb-2">
                          {errors.password}
                        </div>
                      )}

                      <div className="space-y-4">
                        <div>
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Current Password
                          </label>
                          <input
                            type="password"
                            id="currPass"
                            name="currPass"
                            placeholder="Enter current password"
                            value={currPass}
                            onChange={(e) => setCurrPass(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700"
                          >
                            New Password
                          </label>
                          <input
                            type="password"
                            id="newPass"
                            name="newPass"
                            placeholder="Enter new Password"
                            value={newPass}
                            onChange={(e) => setNewPass(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
                          />
                        </div>
                        <div>
                          <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Confirm Password
                          </label>
                          <input
                            type="password"
                            id="confirmPass"
                            name="confirmPass"
                            placeholder="Confirm new password"
                            value={confirmPass}
                            onChange={(e) => setComfirmPass(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
                          />
                        </div>
                        <div className="flex items-center">
                          <p className="ml-2 block text-sm text-gray-700 hover:text-red-500 cursor-pointer">
                            Forgot password?
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleSubmitResetPass}
                          className="w-full px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </main>
          </div>
        </div>
      </div>
    </AuthHOC>
  );
}
