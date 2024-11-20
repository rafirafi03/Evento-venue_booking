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
  "localhost:7001", 
  grpc.credentials.createInsecure()
);

export const getVenueDetails = (venueId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.GetVenueDetails({ venueId }, (error: any, response: any) => {
      if (error) {
        return reject(error);
      }
        resolve(response);
    });
  });
};
