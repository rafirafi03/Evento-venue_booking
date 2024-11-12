import { Loader2 } from "lucide-react"

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="relative">
        <Loader2 className="w-16 h-16 text-red-500 animate-spin" />
      </div>
      <h1 className="mt-8 text-3xl font-bold text-gray-800">Evento</h1>
      <p className="mt-4 text-xl text-gray-600">Loading Evento pages...</p>
      {/* <div className="mt-8 w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-red-500 rounded-full animate-pulse" style={{ width: '90%' }}></div>
      </div> */}
    </div>
  )
}