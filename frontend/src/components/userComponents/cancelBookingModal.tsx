import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
  } from "@nextui-org/react";
  import { Accordion, AccordionItem } from "@nextui-org/react";
  
  import { useState } from "react";

  type AppProps = {
    isOpen: boolean;
    isClose: ()=> void;
    handleCancelConfirm: () => void;
  };
  
  export default function App({ isOpen,isClose, handleCancelConfirm }: AppProps) {
    const [event, setEvent] = useState<string>("");

  
    const handleSubmit = () => {
      isClose()
      handleCancelConfirm();
    };
  
    const handleClose = () => {
      isClose()
    }
  
    return (
      <>
        <Modal isOpen={isOpen} onClose={isClose} placement="top-center">
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1 text-[rgb(255,0,0)] text-center ">
                  Cancel Booking
                </ModalHeader>
                <ModalBody>
                      <div
                        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                        role="alert"
                      >
                        <span className="font-medium">Notice!</span>
                        <br />
                        <p className="mt-3">
                          <span className="font-medium">Advance Payment:</span> An
                          advance payment of 10% of the total booking amount is
                          required.
                        </p>
                        <br />
                        <p>
                          <span className="font-medium">
                            Cancellation Policy:
                          </span>
                          If canceled more than 2 days before the booking date: A
                          2% deduction will apply to the advance payment. If
                          canceled within 2 days of the booking date: A 15%
                          deduction will apply to the advance payment.
                        </p>
                      </div>

                </ModalBody>
                <ModalFooter className="flex justify-center">
                  <Button onClick={handleClose} color="danger" variant="flat">
                    Cancel
                  </Button>
                  <Button onClick={handleSubmit} className="bg-[rgb(255,0,0)] text-white">
                    Confirm
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
  }
  