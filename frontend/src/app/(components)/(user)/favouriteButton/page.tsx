import { Heart } from "lucide-react";
import {
  useAddToFavouritesMutation,
  useCheckIfFavouritedQuery,
  useDeleteFromFavouritesMutation,
} from "app/store/slices/userApiSlices";
import toast, {Toaster} from "react-hot-toast";
import { use, useEffect } from "react";
import { useRouter } from "next/navigation";

interface propsData {
  userId: string | null;
  venueId: string;
}

const FavouriteButton = ({ userId, venueId }: propsData) => {

  const router = useRouter()
  const {
    data: isFavourited,
    error: favouriteFetchError,
    isLoading,
    refetch,
  } = useCheckIfFavouritedQuery({ userId, venueId });

  const [addToFavourites] = useAddToFavouritesMutation();
  const [deleteFromFavourites] = useDeleteFromFavouritesMutation();

  console.log(isFavourited, "isfavourited in frontedn");

  const handleFavouriteToggle = async () => {
    try {
      if (isFavourited) {
        const loadingToast = toast.loading('removing from favourites...')
        const response = await deleteFromFavourites({
          userId,
          venueId,
        }).unwrap();
        console.log("response:",response)

        toast.dismiss(loadingToast)

        if(response.success) {
          toast.success(<b>Removed from favourites!</b>)
        } else {
          toast.error(<b>failed to remove</b>)
        }

        console.log(response, "res from delte");
      } else {
        const loadingToast = toast.loading('adding to favourites...')
        const response = await addToFavourites({ userId, venueId }).unwrap();
        console.log("response:",response)
        toast.dismiss(loadingToast)

        if (response.success) {
          toast.success(<b>added to favourites!</b>)
        } else {
          toast.error(<b>failed to add</b>)
        }
        console.log(response);

      }
      refetch();
    } catch (error: any) {
      if(error.status === 401) {
        console.warn("Session expired. Logging out...");
        localStorage.removeItem("authUserToken");
        router.push('/login')
      }
      toast.dismiss()
      toast.error(<b>Error occured!</b>)
      console.error("Error toggling favourite", error);
    }
  };

  return (
    <>
      <button
      onClick={handleFavouriteToggle}
      className={`top-2 right-2 p-2 rounded-full transition-all duration-300 ease-in-out ${
        isFavourited
          ? "bg-white text-red-500 hover:bg-red-100"
          : "bg-white text-gray-500 hover:bg-red-100"
      }`}
      aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
    >
      <Heart
        className={`w-5 h-5 transition-transform ${
          isFavourited ? "scale-110" : "scale-100"
        }`}
        fill={isFavourited ? "currentColor" : "none"}
      />
    </button>
    </>
  );
};

export default FavouriteButton;
