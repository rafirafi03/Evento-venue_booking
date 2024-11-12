import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { DateRangePicker, Accordion, AccordionItem } from "@nextui-org/react";
import { parseDate, DateValue } from "@internationalized/date";

import { useState } from "react";

type RangeValue<T> = {
  start: T;
  end: T;
};

type AppProps = {
  isOpen: boolean;
  isClose: ()=> void;
  handleBooking: (event: string, guests: number, bookingDuration: RangeValue<DateValue>) => void;
};

export default function App({ isOpen,isClose, handleBooking }: AppProps) {
  const [event, setEvent] = useState<string>("");
  const [guests, setGuests] = useState<number>(0);
  const [bookingDuration, setBookingDuration] = useState<RangeValue<DateValue>>({
    start: parseDate("2024-04-08"),
    end: parseDate("2024-04-08"),
  });

  const handleDateChange = (range: RangeValue<DateValue>) => {
    setBookingDuration(range);
    console.log(bookingDuration, "bkngdrtn");
  };

  const handleSubmit = () => {
    handleBooking(event, guests, bookingDuration);
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
                Schedule Booking
              </ModalHeader>
              <ModalBody>
                <input
                  type="text"
                  id="helper-text"
                  value={event}
                  onChange={(e) => setEvent(e.target.value)}
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="Name of Event"
                />
                <input
                  type="number"
                  id="helper-text"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="No of Guests"
                />
                <DateRangePicker
                  label="Booking Duration"
                  isRequired
                  defaultValue={bookingDuration}
                  color="default"
                  className="max-w-full flex items-center"
                  onChange={handleDateChange}
                />

                <Accordion>
                  <AccordionItem
                    key="1"
                    aria-label="notice"
                    title={
                      <span className="text-xs text-red-600">
                        check payment and cancellation policies before booking.
                      </span>
                    }
                  >
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
                  </AccordionItem>
                </Accordion>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button onClick={handleClose} color="danger" variant="flat">
                  Cancel
                </Button>
                <Button onClick={handleSubmit} className="bg-[rgb(255,0,0)] text-white">
                  Book
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
