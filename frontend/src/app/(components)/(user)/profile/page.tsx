"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Star,
  Clock,
  Home,
  Calendar,
  Edit,
} from "lucide-react";
import Header from "components/userComponents/header";
import {
  useGetUserDetailsQuery,
  useResetPasswordMutation,
  useEditUserProfileMutation,
  useGetFavouritesQuery,
  useDeleteFromFavouritesMutation
} from "app/store/slices/userApiSlices";
import { useGetUserBookingsQuery } from "app/store/slices/bookingApiSlices";
import { useCancelBookingMutation } from "app/store/slices/bookingApiSlices";
import { getUserIdFromToken } from "utils/tokenHelper";
import toast, { Toaster } from "react-hot-toast";
import AuthHOC from "components/common/auth/authHoc";
import { editProfileSchema } from "app/schema/validation";
import CancleBookingModal from 'components/userComponents/cancelBookingModal';

export default function UserProfile() {
  // useAuth()


  const router = useRouter()
  const token = localStorage.getItem("authToken");

  // const [editUserProfile] = useEditUserProfileMutation()

  const userId = getUserIdFromToken('authUserToken');

  const {
    data: userDetails,
    error,
    isLoading,
    refetch: refetchUserDetails
  } = useGetUserDetailsQuery(userId);

  const { data: bookings, refetch: refetchBookings } = useGetUserBookingsQuery(userId) 

  console.log(bookings," bookings in frontend")
  const { data: favourites, refetch: refetchGetFavourites} = useGetFavouritesQuery(userId)

  console.log(favourites,"favrts in frontend")
  const [resetPass] = useResetPasswordMutation();
  const [editUser] = useEditUserProfileMutation();
  const [deleteFromFavourites] = useDeleteFromFavouritesMutation()
  const [cancelBooking] = useCancelBookingMutation()

  console.log(userDetails, "userdetils in fronend hurreyey");

  const [currPass, setCurrPass] = useState<string>("");
  const [newPass, setNewPass] = useState<string>("");
  const [confirmPass, setComfirmPass] = useState<string>("");
  const [userName, setUserName] = useState<string>('');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [cancelBookingModal, setCancelBookingModal] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('')

  useEffect(() => {
    if(userDetails) {
      setUserName(userDetails.userName)
    }
  },[userDetails])

  const [activeTab, setActiveTab] = useState("upcoming");

  const user = {
    name: "Alex Johnson",
    email: "alex@example.com",
    avatar: "/placeholder.svg?height=100&width=100",
    memberSince: "January 2023",
  };

  const bookingHistory = [
    {
      id: 3,
      venue: "Lakeview Hall",
      date: "2023-05-01",
      time: "14:00",
      image: "/placeholder.svg?height=100&width=150",
    },
    {
      id: 4,
      venue: "Mountain Lodge",
      date: "2023-04-10",
      time: "10:00",
      image: "/placeholder.svg?height=100&width=150",
    },
  ];

  const userReviews = [
    {
      id: 1,
      venue: "Lakeview Hall",
      rating: 5,
      comment: "Fantastic venue with great views!",
    },
    {
      id: 2,
      venue: "Mountain Lodge",
      rating: 4,
      comment: "Cozy atmosphere, perfect for our retreat.",
    },
  ];

  const handleEditUserProfile = async (e)=> {

    e.preventDefault();
    
    // Validate the input data with Zod
    const validationResult = editProfileSchema.safeParse({ name: userName, });
    
    if (!validationResult.success) {
      // If validation fails, set errors and exit
      const fieldErrors = validationResult.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name ? fieldErrors.name[0] : '',
      });
      return;
    }
    
    // Clear previous errors if validation succeeds
    setErrors({ name: ''});
    try {
      const loadingToast = toast.loading('Saving...');
      setUserName(userName)
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
  }
  
  const handleSubmitResetPass = async () => {
    try {
      if (newPass !== confirmPass) {
        console.log("password doesnt match.");
        return;
      }
      const loadingToast = toast.loading('Saving...');
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

  const handleDeleteFromFavourites = async(userId: string, venueId: string) => {
    try {
      const loadingToast = toast.loading('removing from favourites...')
      const response = await deleteFromFavourites({userId, venueId}).unwrap()
      toast.dismiss(loadingToast)

      if(response.success) {
        toast.success(<b>Succesfully removed!</b>)
        refetchGetFavourites()
      } else {
        toast.error(<b>failed to remove from favourites!</b>)
      }
      console.log(response)
    } catch (error) {
      toast.dismiss()
      toast.error(<b>failed to remove from favourites!</b>)
      console.log(error)
    }
  }

  const handleCancelBooking = (bookingId: string)=> {
    setBookingId(bookingId)
    setCancelBookingModal(true)

  }

  const isClose = ()=> {
    setCancelBookingModal(false)
  }

  const handleCancellation = async ()=> {
    try {
      const loadingToast = toast.loading('cancelling...')
      const response = await cancelBooking({bookingId}).unwrap();
      toast.dismiss(loadingToast)

      if(response.success) {
        toast.success(<b>Cancellation successfull</b>)
        refetchBookings()
      } else {
        toast.error(<b>Cancellation failed</b>)
      }

      console.log(response)
    } catch (error) {
      toast.dismiss()
      toast.error(<b>Error occurred</b>)
      console.log(error)
    }
  }

  return (
    <AuthHOC role="user">
    <div>
      <div>
        <Toaster position="bottom-center" reverseOrder={false} />
      </div>
      <div className="my-16">
        <Header />
      </div>
      
      <div className="container mx-auto p-6 bg-gray-50">
      { cancelBookingModal && 
            <CancleBookingModal isOpen={cancelBookingModal} isClose={isClose} handleCancelConfirm={handleCancellation} />
          }
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          <aside className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
              <div className="text-center p-6">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full overflow-hidden">
                  <img
                    src="/assets/images/homepage-image.jpg"
                    alt={user.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-2xl font-bold text-gray-900">
                  {userName? userName : userDetails?.userName}
                </h2>
                <p className="text-gray-600">{userDetails?.email}</p>
              </div>
              <div className="px-6 pb-6">
                <div className="flex flex-col items-center space-y-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    Member since {user.memberSince}
                  </span>
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
            {/* <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Venue Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-700">Preferred Location: Downtown</span>
              </div>
              <div className="flex items-center">
                <Building className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-700">Venue Type: Conference Halls</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-700">Typical Group Size: 50-100</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-700">Budget Range: $500 - $1000</span>
              </div>
            </div>
          </div> */}
          </aside>
          <main>
            <div className="bg-white border-b border-gray-200">
              <nav className="flex space-x-4" aria-label="Tabs">
                {[
                  "upcoming",
                  "history",
                  "reviews",
                  "favourites",
                ].map((tab) => (
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
                ))}
              </nav>
            </div>
            <div className="mt-4">
              {activeTab === "upcoming" && (
                <div className="space-y-4">
                  {bookings?.length > 0 ? (
                    <>
                  {bookings?.map((booking) => (
                    <div
                      key={booking._id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={booking?.venueDetails.image}
                          alt={booking?.event}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking?.event}
                          </h3>
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center mt-1">
                              <Home className="w-4 h-4 mr-2" />
                              {booking.time}
                            </div>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {new Date(booking?.bookingDateStart).toLocaleDateString()} to {new Date(booking?.bookingDateEnd).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 flex space-x-2">
                        <button onClick={()=> router.push(`/bookingDetails/${booking._id}`)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                          View Details
                        </button>
                        <button onClick={()=> handleCancelBooking(booking._id)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                          Cancel Booking
                        </button>
                      </div>
                    </div>
                  ))}
                  </>
                ) : (
                  <>
                    <div
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                      >
                    <h2 className="my-10 text-center text-gray-400">No upcoming bookings</h2>

                      </div>
                    </>
                )}
                </div>
              )}
              {activeTab === "history" && (
                <div className="space-y-4">
                  {bookingHistory.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src="/assets/images/homepage-image.jpg"
                          alt={booking.venue}
                          className="w-24 h-16 object-cover rounded"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {booking.venue}
                          </h3>
                          <div className="text-sm text-gray-500">
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-2" />
                              {booking.date}
                            </div>
                            <div className="flex items-center mt-1">
                              <Clock className="w-4 h-4 mr-2" />
                              {booking.time}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <button className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                          Leave Review
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="space-y-4">
                  {userReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                    >
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {review.venue}
                      </h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < review.rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              )}
              {activeTab === "favourites" && (
                <div className="space-y-4">
                  { favourites?.length > 0 ? (
                    <>
                    {favourites?.map((fav) => (
                      <div
                        key={fav.id}
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                            src={fav.venueImage}
                            alt={fav.venueName}
                            className="w-24 h-16 object-cover rounded"
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
                          <button onClick={()=>router.push(`venueDetails/${fav.venueId}`)} className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            View Details
                          </button>
                          <button onClick={()=>handleDeleteFromFavourites(userId, fav.venueId)} className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                    </>
                  ) : (
                    <>
                    <div
                        className="bg-white border border-gray-200 rounded-lg shadow-sm p-6"
                      >
                    <h2 className="my-10 text-center text-gray-400">No favourites</h2>

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
                          onChange={(e)=> setUserName(e.target.value)}
                          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-gray-400 focus:border-gray-400 sm:text-sm"
                        />
                        {errors.name && <div className="text-sm text-bold text-[rgb(255,0,0)]">{errors.name}</div>}
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

                      {/* <div className="flex items-center">
                    <input type="checkbox" id="notifications" name="notifications"
                           className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded" />
                    <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                      Receive email notifications
                    </label>
                  </div> */}
                      <button
                        type="button"
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
