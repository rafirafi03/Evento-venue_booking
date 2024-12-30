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
import { validateDates } from "app/schema/validation";

import { useState } from "react";

type RangeValue<T> = {
  start: T;
  end: T;
};

type AppProps = {
  isOpen: boolean;
  isClose: ()=> void;
  handleBooking: (event: string, guests: number, bookingDuration: RangeValue<DateValue>) => void;
  capacity: number
};

export default function App({ isOpen,isClose, handleBooking, capacity }: AppProps) {
  const [event, setEvent] = useState<string>("");
  const [guests, setGuests] = useState<number>(0);
  const today = new Date().toISOString().split('T')[0];
  const [bookingDuration, setBookingDuration] = useState<RangeValue<DateValue>>({
    start: parseDate(today),
    end: parseDate(today),
  });
  const [eventError, setEventError] = useState<string>('');
  const [guestsError, setGuestsError] = useState<string>('');
  const [dateError, setDateError] = useState<string>('');

  const handleDateChange = (range: RangeValue<DateValue>) => {
    if(validateDates(range.start, range.end)){

      setBookingDuration(range);
    } else {
      setDateError('invalid date format')
    }
    console.log(bookingDuration, "bkngdrtn");
  };

  const handleSubmit = () => {

    let isValid = true;

    if(event.trim()=="") {
      setEventError('event field required')
      isValid= false
    }

    if(guests <= 0) {
      setGuestsError('invalid count')
      isValid= false
    } else if(guests > capacity) {
      setGuestsError(`upto ${capacity} guests only allowed`);
      isValid=false
    }

    if(dateError) {
      isValid = false
    }

    if(!isValid) return 

    handleBooking(event, guests, bookingDuration);
  };

  const handleClose = () => {
    isClose()
  }

  const disablePastDates = (date: DateValue) => {
    const todayDate = new Date();
    return new Date(date.year, date.month - 1, date.day) < todayDate; // Disable dates before today
  };

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
                  onChange={(e) => {
                    setEvent(e.target.value)
                    setEventError("")
                  }
                  }
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="Name of Event"
                />
                { eventError && (
                  <p className="text-sm text-red-500">{eventError}</p>
                )}
                <input
                  type="number"
                  id="helper-text"
                  value={guests}
                  onChange={(e) => {
                    setGuests(Number(e.target.value))
                    setGuestsError('')
                  } }
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                  placeholder="No of Guests"
                />
                { guestsError && (
                  <p className="text-sm text-red-500">{guestsError}</p>
                )}
                <DateRangePicker
                  label="Booking Duration"
                  isRequired
                  defaultValue={bookingDuration}
                  color="default"
                  className="max-w-full flex items-center"
                  onChange={handleDateChange}
                  isDateUnavailable={disablePastDates}
                />
                {/* { dateError && (
                  <p className="text-sm text-red-500">{dateError}</p>
                )} */}

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
                  Pay Advance
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
