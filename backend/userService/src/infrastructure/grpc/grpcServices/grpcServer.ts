import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { UserRepository } from "../../../repositories";

const _userRepository = new UserRepository()

// Path to the .proto file
const PROTO_PATH = path.resolve(__dirname, "../protos/user.proto");

// Load the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

interface GetUserDetailsRequest {
  userId: string;
}

interface GetUserDetailsResponse {
  id: string;
  name: string;
  email: string;
  phone: number | undefined;
}

interface UserServiceHandlers extends grpc.UntypedServiceImplementation {
  GetUserDetails: grpc.handleUnaryCall<GetUserDetailsRequest, GetUserDetailsResponse>;
}

interface UserProtoType {
  user: {
    UserService: grpc.ServiceDefinition<UserServiceHandlers>;
  };
}

const userProto = grpc.loadPackageDefinition(packageDefinition) as unknown as UserProtoType;

console.log('request successfully reached in userSErvice')
// Implementation of the gRPC methods
const getUserDetails: grpc.handleUnaryCall<GetUserDetailsRequest, GetUserDetailsResponse> = async (call, callback) => {
    console.log(call,'inside getuserdetails userService hureeeyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
    try {
      const userId = call.request.userId;

      // Fetch user from the database using the user model
      const user = await _userRepository.findById(userId);

      console.log(user," user in grcccccccc")
  
      if (user) {
        console.log('inside user found in grpcccc')
        callback(null, {
          id: user._id.toString(),
          name: user.userName,
          email: user.email,
          phone: user.phone
        });
      } else {
        callback({
          code: grpc.status.NOT_FOUND,
          message: "User not found",
        });
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      callback({
        code: grpc.status.INTERNAL,
        message: "Internal server error",
      });
    }
  };
  

// Start gRPC server
export function startGrpcUserServer() {
  const server = new grpc.Server();
  server.addService(userProto.user.UserService, { GetUserDetails: getUserDetails });
  const port = "7000"; // Change this port if necessary
  server.bindAsync(`0.0.0.0:${port}`, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`gRPC server running at http://0.0.0.0:${port}`);
    server.start();
  });
}

