
import { Heart } from "lucide-react"
import { useAddToFavouritesMutation, useCheckIfFavouritedQuery, useDeleteFromFavouritesMutation } from 'app/store/slices/userApiSlices';

interface propsData {
    userId: string | null;
    venueId: string
}

const FavouriteButton = ({ userId, venueId } : propsData) => {

    const { data: isFavourited, error, isLoading, refetch } = useCheckIfFavouritedQuery({ userId, venueId });
    const [addToFavourites] = useAddToFavouritesMutation()
    const [deleteFromFavourites] = useDeleteFromFavouritesMutation()

    console.log(isFavourited,"isfavourited in frontedn")


  const handleFavouriteToggle = async () => {
    try {
        if(isFavourited) {
          console.log('hiiiiiiiiiiiiii')
          const response = await deleteFromFavourites({userId, venueId}).unwrap()
          console.log(response,"res from delte")
        } else {
          const response = await addToFavourites({userId, venueId}).unwrap()
          console.log(response)
        }
        refetch()
      } catch (error) {
        console.error("Error toggling favourite", error);
      }
  };

  return (
    <button 
      onClick={handleFavouriteToggle}
      className={`top-2 right-2 p-2 rounded-full transition-all duration-300 ease-in-out ${
        isFavourited ? 'bg-white text-red-500 hover:bg-red-100' : 'bg-white text-gray-500 hover:bg-red-100'
      }`}
      aria-label={isFavourited ? "Remove from favourites" : "Add to favourites"}
    >
      <Heart 
        className={`w-5 h-5 transition-transform ${isFavourited ? 'scale-110' : 'scale-100'}`} 
        fill={isFavourited ? 'currentColor' : 'none'} 
      />
    </button>
  );
};

export default FavouriteButton;
