import {
  Modal,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet, faMoneyCheck } from "@fortawesome/free-solid-svg-icons";

interface pageProps {
  isOpen: boolean;
  closeModal: () => void;
  handlePaymentMethod: (arg: string) => void;
  balance: number;
  bookingAmount: number;
}

export default function App({
  isOpen,
  closeModal,
  handlePaymentMethod,
  balance,
  bookingAmount
}: pageProps) {
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalBody>
                <div className="w-full max-w-sm p-4 m-auto">
                  <h5 className="mb-3 text-base font-semibold text-gray-900 md:text-xl dark:text-white">
                    Choose Payment Method
                  </h5>
                  <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    Connect with one of our available payment method to create
                    booking.
                  </p>
                  <ul className="my-4 space-y-3">
                    <li
                      onClick={() => {
                        if (balance >= bookingAmount) {
                          handlePaymentMethod("wallet");
                        } 
                      }}
                    >
                      <div
                        className={`flex items-center p-3 text-base font-bold cursor-pointer ${
                          balance < bookingAmount ? "text-gray-500" : "text-gray-900"
                        } rounded-lg ${
                          balance < bookingAmount
                            ? "bg-gray-100"
                            : "bg-gray-50 hover:bg-gray-100 group hover:shadow"
                        } dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white`}
                      >
                        <FontAwesomeIcon
                          icon={faWallet}
                          className={`flex-shrink-0 w-5 h-5 ${
                            balance < bookingAmount ? "text-gray-400" : "text-orange-400"
                          } transition duration-75 dark:text-${
                            balance < bookingAmount ? "gray-400" : "orange-400"
                          } group-hover:text-${
                            balance < bookingAmount ? "gray-400" : "orange-400"
                          }`}
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Wallet
                        </span>
                        {balance < 500 && (
                          <span className="ml-2 text-sm text-[rgb(255,0,0)]">
                            Insufficient balance
                          </span>
                        )}
                      </div>
                    </li>

                    <li onClick={() => handlePaymentMethod("online")}>
                      <div className="flex items-center p-3 text-base font-bold cursor-pointer text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white">
                        <FontAwesomeIcon
                          icon={faMoneyCheck}
                          className="flex-shrink-0 w-5 h-5 text-blue-800 transition duration-75 dark:text-blue-800 group-hover:text-gray-900"
                        />
                        <span className="flex-1 ms-3 whitespace-nowrap">
                          Online Payment
                        </span>
                      </div>
                    </li>
                  </ul>
                  <div>
                    <div className="inline-flex items-center text-xs font-normal text-gray-500 hover:underline dark:text-gray-400">
                      choosing one of payment method to book your dream venue
                      for your functions
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button onClick={closeModal} color="danger" variant="flat">
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
