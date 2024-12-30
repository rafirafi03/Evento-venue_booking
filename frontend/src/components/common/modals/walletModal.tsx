'use client'

interface pageProps {
    balance: number;
    bookingAmount: number;
    isOpen: boolean;
    isClose: ()=> void;
    handlePayment : (paymentMethod: string)=> void
}

export default function WalletModal({balance, bookingAmount, isOpen, isClose, handlePayment} : pageProps) {

  if(!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all duration-300 ease-in-out">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-center text-gray-800">Your Wallet</h2>
          <div className="bg-white rounded-xl p-6 shadow-inner">
            <p className="text-sm font-medium text-gray-500 mb-2">Current Balance</p>
            <p className="text-4xl font-bold text-gray-800">₹{balance.toFixed(2)}</p>
          </div>
          <div className="flex space-x-4">
            <button
            onClick={()=> handlePayment('wallet')}
              className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Pay {bookingAmount}
            </button>
            <button
              onClick={() => isClose()}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

