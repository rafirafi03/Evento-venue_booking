import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";

const PROTO_PATH = path.resolve(__dirname, "../protos/user.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition) as any;

// Create a client instance
const client = new userProto.user.UserService(
  "user-service:50051",
  grpc.credentials.createInsecure()
);

export const getUserDetails = (userId: string): Promise<any> => {
  console.log('inside getuserdetails grpc')
  return new Promise((resolve, reject) => {
    client.GetUserDetails({ userId }, (error: any, response: any) => {
      if (error) {
        console.log("error:" ,error)
        return reject(error);
      }
        console.log("response:" ,response)
        resolve(response);
    });
  });
};
