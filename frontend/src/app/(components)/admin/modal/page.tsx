import React from "react";
import Image from "next/image";

interface pageProps {
  license: string;
  closeModal: () => void;
  handleApproval: (arg: string)=> void;
  refetch : ()=> void
}
export default function page({ license, closeModal, handleApproval, refetch }: pageProps) {

  const handleOnclick = (args:string) => {
    closeModal()
    handleApproval(args)
    refetch()
  }
  return (
    <div>
      <div
        id="default-modal"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                License
              </h3>
              <button
              onClick={closeModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">
                  Close modal
                </span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <Image alt="img" src={license} width={500} height={500} />
            </div>
            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={()=>handleOnclick('accept')}
                data-modal-hide="default-modal"
                type="button"
                className="text-white bg-green-500 hover:bg-black focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium text-sm px-3 py-1 rounded-2xl text-center dark:bg-green-500 dark:hover:bg-black dark:focus:ring-green-800"
              >
                accept
              </button>
              <button
              onClick={()=>handleOnclick('reject')}
                data-modal-hide="default-modal"
                type="button"
                className="py-1 px-3 ms-3 text-sm font-medium text-white focus:outline-none bg-[rgb(255,0,0)] rounded-2xl border border-gray-200 hover:bg-black focus:z-10 focus:ring-2 focus:ring-blue-300 dark:focus:ring-gray-700 dark:bg-[rgb(255,0,0)] dark:text-white dark:border-gray-600 dark:hover:text-white dark:hover:bg-black"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
