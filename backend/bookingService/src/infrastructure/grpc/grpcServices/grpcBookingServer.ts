// import * as grpc from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import path from "path";
// import { BookingRepository } from "../../../repositories";

// const _bookingRepository = new BookingRepository()

// // Path to the .proto file
// const PROTO_PATH = path.resolve(__dirname, "../protos/booking.proto");

// // Load the .proto file
// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });

// const bookingProto = grpc.loadPackageDefinition(packageDefinition) as any;

// console.log('request successfully reached in bookingSErvice')
// // Implementation of the gRPC methods
// const getBookings = async (call: any, callback: any) => {

//     console.log(call,'inside getuserdetails userService hureeeyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
//     try {
//       const companyId = call.request.companyId;

//       // Fetch user from the database using the user model
//       const bookings = await _bookingRepository.getBookingsByCompanyId(companyId)

//       console.log(bookings," venue details in i want that t tt atltslrhrrugugw9u4owhf9w")
  
//       if (bookings && bookings.length > 0) {
//         const bookingResponse = bookings.map((booking) => ({
//             venueId: booking._id,
//             venueName: booking.event,
//             date: booking.date.toISOString(),
//             time: booking.time,
//             customerName: booking.customerName,
//             status: booking.status,
//           }));
    
//           callback(null, { bookings: bookingResponse });
//       } else {
//         callback({
//           code: grpc.status.NOT_FOUND,
//           message: "bookings not found",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching Venue:", error);
//       callback({
//         code: grpc.status.INTERNAL,
//         message: "Internal server error",
//       });
//     }
//   };
  

// // Start gRPC server
// export function startGrpcBookingServer() {
//   const server = new grpc.Server();
//   server.addService(bookingProto.booking.BookingService.service, { getBookings: getBookings });
//   const port = "7001"; // Change this port if necessary
//   server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
//     console.log(`gRPC server running at http://0.0.0.0:${port}`);
//     server.start();
//   });
// }

