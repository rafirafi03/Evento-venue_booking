import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  ChevronDown,
  ChevronUp,
  X,
  DollarSign,
} from "lucide-react";
import debounce from "lodash/debounce";
import React from "react";

export default function RefinedVenueFilter() {
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const router = useRouter();

  const clearFilter = () => {
    setSearchValue("");
    setSelectedTypes([]);
    setPriceRange([0, 10000]);

    const params = new URLSearchParams();
    router.push(`/venues?${params.toString()}`);
  };

  const debouncedHandleFilter = useRef(
    debounce(() => {
      const params = new URLSearchParams();
  
      if (searchValue) params.set("search", searchValue);
      if (selectedTypes.length > 0) params.set("types", selectedTypes.join(","));
      if (priceRange.length > 0) params.set("priceRange", encodeURIComponent(priceRange.join(",")));
  
      router.push(`/venues?${params.toString()}`);
    }, 500)
  ).current;

  const checkboxOptions = useMemo(
    () => ["Conference", "Banquet", "Auditorium", "Outdoor", "Restaurant"],
    []
  );
  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleCheckboxChange = (isChecked: boolean, type: string) => {
    setSelectedTypes((prev) => {
      const newSelectedTypes = isChecked
        ? [...prev, type]
        : prev.filter((item) => item !== type);

      return newSelectedTypes;
    });
  };

  const handlePriceRangeChange = (index: number, value: number) => {
    setPriceRange((prevRange) => {
      const newRange: [number, number] = [...prevRange] as [number, number];
      newRange[index] = value;
      return newRange;
    });
  };
  
  

  // Trigger the debounced function when any of the values change
  React.useEffect(() => {
    debouncedHandleFilter();
  }, [searchValue, selectedTypes, priceRange, debouncedHandleFilter]); // This will trigger the debounced function when these values change

  const toggleFilters = () => setIsOpen(!isOpen);

  return (
    <div className="bg-white shadow-lg rounded-md p-6 w-full md:w-80 max-h-fit mt-16 sticky top-0">
      <div className="md:hidden mb-4">
        <button
          onClick={toggleFilters}
          className="flex items-center justify-between w-full bg-gray-100 p-3 rounded-md transition duration-300 hover:bg-gray-200"
        >
          <span className="font-bold text-gray-800">Venue Filters</span>
          {isOpen ? (
            <ChevronUp size={24} className="text-gray-600" />
          ) : (
            <ChevronDown size={24} className="text-gray-600" />
          )}
        </button>
      </div>

      <div className={`${isOpen ? "block" : "hidden"} md:block space-y-4`}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search dream venues..."
            value={searchValue}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border placeholder:text-xs border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition duration-300"
            aria-label='Search dream venues'
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
        </div>

        <hr />

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Venue Type</h2>
          <div className="space-y-1">
            {checkboxOptions.map(
              (type) => (
                <label
                  key={type}
                  className="flex items-center space-x-2 p-2 rounded-md hover:bg-gray-100 transition duration-300"
                >
                  <input
                    value={type}
                    onChange={(e) => handleCheckboxChange(e.target.checked, type)}
                    checked={selectedTypes.includes(type)}
                    type="checkbox"
                    className="form-checkbox text-red-500 rounded focus:ring-red-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    {type}
                  </span>
                </label>
              )
            )}
          </div>
        </div>

        <hr />

        <div>
          <h2 className="text-lg font-bold text-gray-800 mb-1">Price Range</h2>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <DollarSign
                className="absolute left-3 top-2 text-gray-400"
                size={16}
              />
              <input
                type="number"
                value={priceRange[0]}
                onChange={(e) => handlePriceRangeChange(0, parseInt(e.target.value))}
                className="w-full pl-8 pr-2 py-1 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition duration-300"
              />
            </div>
            <span className="text-gray-500 font-medium">to</span>
            <div className="relative flex-1">
              <DollarSign
                className="absolute left-3 top-2 text-gray-400"
                size={16}
              />
              <input
                type="number"
                value={priceRange[1]}
                onChange={(e) => handlePriceRangeChange(1, parseInt(e.target.value))}
                className="w-full pl-8 pr-2 py-1 border border-red-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-transparent transition duration-300"
              />
            </div>
          </div>
        </div>

        <hr />

        <button
          onClick={clearFilter}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-800 transition duration-300 font-semibold text-md flex items-center justify-center"
        >
          <X size={20} className="mr-2" />
          Clear All Filters
        </button>
      </div>
    </div>
  );
}
