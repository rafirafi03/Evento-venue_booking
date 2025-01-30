import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "../protos/venue.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const venueProto = grpc.loadPackageDefinition(packageDefinition) as any;

// Create a client instance
const client = new venueProto.venue.CompanyService(
  "company-service:80", 
  grpc.credentials.createInsecure()
);

export const getVenueDetails = (venueId: string): Promise<any> => {
  console.log('inside getvenuedetails grpc')
  return new Promise((resolve, reject) => {
    client.GetVenueDetails({ venueId }, (error: any, response: any) => {
      if (error) {
        console.log("error:" ,error)
        return reject(error);
      }
      console.log("response:" ,response)
        resolve(response);
    });
  });
};
