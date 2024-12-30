import React, { useState } from "react";
import LineChart from "../charts/lineChart";
import { IDashboardData } from "types/types";

export default function CardWithTab(data : IDashboardData) {
  const [activeTab, setActiveTab] = useState<string>("weekly");

  return (
    <div className="flex-1 max-w-6xl mx-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select tab
        </label>
        <select
          value={activeTab}
          onChange={(e)=> setActiveTab(e.target.value)}
          id="tabs"
          className="bg-gray-50 border-0 border-b border-gray-200 text-gray-900 text-sm rounded-t-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
          <option value='yearly'>Yearly</option>
        </select>
      </div>
      <ul
        className="hidden text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg sm:flex dark:divide-gray-600 dark:text-gray-400 rtl:divide-x-reverse"
      >
        <li className="w-full">
          <button
            onClick={() => setActiveTab("weekly")}
            className="inline-block w-full p-4 rounded-ss-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Weekly
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => setActiveTab("monthly")}
            className="inline-block w-full p-4 bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Monthly
          </button>
        </li>
        <li className="w-full">
          <button
            onClick={() => setActiveTab("yearly")}
            className="inline-block w-full p-4 rounded-se-lg bg-gray-50 hover:bg-gray-100 focus:outline-none dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            Yearly
          </button>
        </li>
      </ul>
      <div
        id="fullWidthTabContent"
        className="border-t border-gray-200 dark:border-gray-600"
      >
        {activeTab == "weekly" && (
          <div
            className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <LineChart dataKey={'date'} data={data?.last7DaysSales} title={"Weekly"} />
          </div>
        )}
        {activeTab == "monthly" && (
          <div
            className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <LineChart  dataKey={'month'} data={data?.monthlySalesData} title={"Monthly"} />
          </div>
        )}
        {activeTab == "yearly" && (
          <div
            className="p-4 bg-white rounded-lg md:p-8 dark:bg-gray-800"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <LineChart dataKey={'year'} data={data?.lastFiveYearRevenue} title={"Yearly"} />
          </div>
        )}
      </div>
    </div>
  );
}
