import {Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/react";

interface Offer {
    _id: string;
    name: string;
    percentage: number;
    validity: number
}

interface propsData {
    venueOfferId: string
    isOpenModal: boolean;
    onClose: ()=> void;
    offers: Offer[];
    onSubmit: (offerId: string)=> void
    removeOffer: (offerId: string)=> void
}

export default function App({venueOfferId, isOpenModal, onClose, offers, onSubmit, removeOffer}: propsData) {

  return (
    <>
      <Modal isOpen={isOpenModal} onClose={onClose}>
        <ModalContent>
            <>
              <ModalHeader className="flex flex-col">Availabe Offers</ModalHeader>
              <hr />
              <ModalBody>
              <div className="p-2 md:p-3">
                { offers?.length > 0 ? (
                    offers.map((offer, index)=> (
                        <ul key={index} className="my-4 space-y-3">
                    <li>
                        <a className={`flex items-center p-3 font-bold text-gray-900 rounded-lg group hover:shadow
                                ${venueOfferId === offer?._id 
                                ? 'bg-green-500 text-white hover:bg-green-600' 
                                : 'bg-gray-100 text-pretty hover:bg-gray-200 dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white'
                                }`
                            }>
                            <span className="flex-1 ms-3 whitespace-nowrap">{offer?.name}</span>
                            <span className="flex-1 ms-3 whitespace-nowrap">{offer?.percentage}%</span>
                            <span className="flex-1 ms-3 whitespace-nowrap">{offer?.validity} days</span>
                            { venueOfferId === offer._id ? (
                                <span onClick={()=> {
                                    removeOffer(offer._id)
                                    onClose()
                                }} className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-red-500 bg-white rounded cursor-pointer dark:bg-white dark:text-red-500 transition-transform duration-150 ease-in-out hover:scale-110">Remove</span>

                            ) : (
                                <span onClick={()=> {
                                    onSubmit(offer._id)
                                    onClose()
                                }} className="inline-flex items-center justify-center px-2 py-0.5 ms-3 text-xs font-medium text-black bg-gray-400 rounded cursor-pointer dark:bg-gray-700 dark:text-gray-400 transition-transform duration-150 ease-in-out hover:scale-110">Apply</span>
                            )}

                        </a>
                    </li>
                </ul>
                    ))
                
                ) : (
                    <h1 className="text-gray-400 textt-bold">No offers available</h1>
                )}
                
            </div>
              </ModalBody>
              
            </>
        </ModalContent>
      </Modal>
    </>
  );
}