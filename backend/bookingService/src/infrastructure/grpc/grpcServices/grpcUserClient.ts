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
  "localhost:7000", // Update this to the `userService` host:port in production
  grpc.credentials.createInsecure()
);

export const getUserDetails = (userId: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    client.GetUserDetails({ userId }, (error: any, response: any) => {
      if (error) {
        return reject(error);
      }
        resolve(response);
    });
  });
};
