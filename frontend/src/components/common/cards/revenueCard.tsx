import React from "react";

interface pageProps {
    title: string
    data: string | number;
}

export default function revenueCard({title, data}: pageProps) {
  return (
    <div className="block text-center max-w-sm p-4 sm:p-6 lg:p-8 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 sm:max-w-md lg:max-w-lg">
      <h5 className="mb-2 text-sm sm:text-xs md:text-md lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-bold text-sm sm:text-base md:text-md lg:text-2xl text-gray-700 dark:text-gray-400 my-3">
    {data}
      </p>
      <p className="font-bold text-xs sm:text-xs md:text-xs lg:text-xs text-success-600 dark:text-gray-400">
        + 8% comparing to last month
      </p>
    </div>
  );
}
