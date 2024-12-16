import { AlertCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface PageProps {
    page: string
}

export default function Error({page} : PageProps) {

    const router = useRouter()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg text-center">
        <div className="flex justify-center">
          <AlertCircle className="h-20 w-20 text-red-500" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Oops! Something went wrong</h1>
        <p className="text-gray-600">
          We apologize for the inconvenience. Please try again later or contact support if the problem persists.
        </p>
        <div className="space-y-4">
          <button 
            onClick={() => window.location.reload() }
            className="w-full px-4 py-2 text-white bg-red-600 rounded-md font-medium transition-colors duration-200 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Try Again
          </button>
          <button 
            onClick={() => router.push(page)}
            className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md font-medium transition-colors duration-200 ease-in-out hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Go to Homepage
          </button>
        </div>
      </div>
    </div>
  )
}

