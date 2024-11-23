'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ChevronDown, ChevronUp, X, DollarSign, Star, Wifi, Car, Coffee, Tv, ShipWheelIcon as Wheelchair } from 'lucide-react'

export default function RefinedVenueFilter() {
  const [isOpen, setIsOpen] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 10000])
  // const [rating, setRating] = useState(0);
  const [searchValue, setSearchValue] = useState('')
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  console.log(selectedTypes," selected typessssssssss")

  const router = useRouter()

  const clearFilter = ()=> {
    setSearchValue('')
    setSelectedTypes([])
    setPriceRange([0, 10000]);


    const params = new URLSearchParams();
  router.push(`/venues?${params.toString()}`);
  }


  const handleFilter = () => {
    // Create new URLSearchParams instance
    const params = new URLSearchParams()
    
    // Add search if it exists
    if (searchValue) {
      params.set('search', searchValue)
    }
    
    // Add types if any are selected
    if (selectedTypes.length > 0) {
      // Join array with commas to make it URL-friendly
      params.set('types', selectedTypes.join(','))
    }

    if (priceRange) {
      params.set('priceRange', encodeURIComponent(priceRange.join(',')));
    }

    // Push to router with all params
    router.push(`/venues?${params.toString()}`)
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, type: string) => {
    if (event.target.checked) {
      // Add the type to the selected types
      setSelectedTypes((prev) => [...prev, type]);
    } else {
      // Remove the type from the selected types
      setSelectedTypes((prev) => prev.filter((item) => item !== type));
    }
  };

  const toggleFilters = () => setIsOpen(!isOpen)

  return (
    <div className="bg-white shadow-lg rounded-md p-6 w-full md:w-80 max-h-fit mt-16 sticky top-0">
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center justify-between w-full bg-gray-100 p-3 rounded-md transition duration-300 hover:bg-gray-200"
        >
          <span className="font-bold text-gray-800">Venue Filters</span>
          {isOpen ? <ChevronUp size={24} className="text-gray-600" /> : <ChevronDown size={24} className="text-gray-600" />}
        </button>
      </div>

      <div className={`${isOpen ? 'block' : 'hidden'} md:block space-y-4`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search dream venues..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border placeholder:text-xs border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition duration-300"
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <hr />

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Venue Type</h2>
          <div className="space-y-1">
            {['Conference', 'Banquet', 'Auditorium', 'Outdoor', 'Restaurant'].map((type) => (
              <label key={type} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition duration-300">
                <input onChange={(e) => handleCheckboxChange(e, type)} checked={selectedTypes.includes(type)} type="checkbox" className="form-checkbox text-red-500 rounded focus:ring-red-500" />
                <span className="text-sm font-medium text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <hr />

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Price Range</h2>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-2 text-gray-400" size={16} />
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="w-full pl-8 pr-2 py-1 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition duration-300"
              />
            </div>
            <span className="text-gray-500 font-medium">to</span>
            <div className="relative flex-1">
              <DollarSign className="absolute left-3 top-2 text-gray-400" size={16} />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full pl-8 pr-2 py-1 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition duration-300"
              />
            </div>
          </div>
        </div>

        <hr />

        {/* <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Rating</h2>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-1 rounded-full transition duration-300 ${
                  rating >= star ? 'text-red-500' : 'text-gray-300'
                }`}
              >
                <Star size={24} fill={rating >= star ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600 mt-1">{rating > 0 ? `${rating} stars and up` : 'Select rating'}</p>
        </div>

        <hr />

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Amenities</h2>
          <div className="space-y-1">
            {[
              { name: 'Wi-Fi', icon: Wifi },
              { name: 'Parking', icon: Car },
              { name: 'Catering', icon: Coffee },
              { name: 'AV Equipment', icon: Tv },
              { name: 'Accessible', icon: Wheelchair },
            ].map((amenity) => (
              <label key={amenity.name} className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition duration-300">
                <input type="checkbox" className="form-checkbox text-[rgb(255,0,0)] rounded focus:ring-0 focus:ring-[rgb(255,0,0)]" />
                <span className="text-sm font-medium text-gray-700 flex items-center">
                  <amenity.icon size={16} className="mr-1 text-gray-400" />
                  {amenity.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <hr /> */}

        <button onClick={handleFilter} className="w-full bg-[rgb(255,0,0)] text-white py-2 rounded-md hover:bg-red-700 transition duration-300 font-semibold text-md">
          Find Perfect Venues
        </button>

        <button onClick={clearFilter} className="w-full bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition duration-300 font-semibold text-md flex items-center justify-center">
          <X size={20} className="mr-2" />
          Clear All Filters
        </button>
      </div>
    </div>
  )
}