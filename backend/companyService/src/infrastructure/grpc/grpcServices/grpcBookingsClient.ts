// import * as grpc from "@grpc/grpc-js";
// import * as protoLoader from "@grpc/proto-loader";
// import path from "path";

// const PROTO_PATH = path.resolve(__dirname, "../protos/bookings.proto");

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });

// const bookingsProto = grpc.loadPackageDefinition(packageDefinition) as any;

// // Create a client instance
// const client = new bookingsProto.bookings.BookingService(
//   "localhost:7000", // Update this to the `userService` host:port in production
//   grpc.credentials.createInsecure()
// );

// export const getBookings = (companyId: string): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     client.GetUserDetails({ companyId }, (error: any, response: any) => {
//       if (error) {
//         return reject(error);
//       }
//         resolve(response);
//     });
//   });
// };
