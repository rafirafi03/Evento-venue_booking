"use client"

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Sample data for the top 3 venues
const venueData = [
  { name: "Venue A", capacity: 5000, events: 120, revenue: 1500000 },
  { name: "Venue B", capacity: 3500, events: 90, revenue: 1200000 },
  { name: "Venue C", capacity: 2800, events: 75, revenue: 900000 },
]

export default function TopVenuesBarChart() {
  return (
    <div className="w-full bg-white rounded-lg max-w-lg mx-auto p-4 my-5">
      <h2 className="text-2xl font-bold mb-4 text-center">Top 3 Venues Performance</h2>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={venueData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
            <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="capacity" fill="#8884d8" name="Capacity" />
            <Bar yAxisId="left" dataKey="events" fill="#82ca9d" name="Events" />
            <Bar yAxisId="right" dataKey="revenue" fill="#ffc658" name="Revenue ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

