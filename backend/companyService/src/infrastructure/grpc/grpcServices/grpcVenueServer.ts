import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { CompanyRepository } from "../../../repositories";

const _companyRepository = new CompanyRepository()

// Path to the .proto file
const PROTO_PATH = path.resolve(__dirname, "../protos/venue.proto");

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});


const venueProto = grpc.loadPackageDefinition(packageDefinition) as any;

console.log('request successfully reached in venueSErvice')
// Implementation of the gRPC methods
const getVenueDetails = async (call: any, callback: any) => {

    console.log(call,'inside getuserdetails userService hureeeyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    try {
      const venueId = call.request.venueId;

      // Fetch user from the database using the user model
      const venue = await _companyRepository.findVenueById(venueId)

      console.log(venue," venue details in i want that t tt atltslrhrrugugw9u4owhf9w")
  
      if (venue) {
        callback(null, {
          venueName: venue.name,
          venueAmount: venue.amount,
          venueCity: venue.city,
          venueState: venue.state,
          venueImage: venue.images[0],
          companyId : venue.companyId
        });
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          message: "Venue not found",
        });
      }
    } catch (error) {
      console.error("Error fetching Venue:", error);
      callback({
        code: grpc.status.INTERNAL,
        message: "Internal server error",
      });
    }
  };
  

// Start gRPC server
export function startGrpcVenueServer() {
  const server = new grpc.Server();
  server.addService(venueProto.venue.CompanyService.service, { GetVenueDetails: getVenueDetails });
  const port = "4001"; // Change this port if necessary
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), (error,port) => {
    if (error) {
      console.error("Error starting gRPC server:", error);
      return;
    }
    console.log(`gRPC server running at http://0.0.0.0:${port}`);
  });
}

