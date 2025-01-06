// src/components/GoogleSignup.tsx
import React from "react";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "app/store/slices/userApiSlices";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const GoogleSignup: React.FC = () => {
  const router = useRouter();
  const [googleAuth] = useGoogleLoginMutation();

  const handleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    try {
      const loadingToast = toast.loading("logging in...");
      const result = await googleAuth(credentialResponse.credential).unwrap();
      toast.dismiss(loadingToast);

      if (result.success) {
        toast.success(<b>Login successfull!</b>);
        const token = result.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("authUserToken", token);
        }
        router.push("/");
      } else {
        toast.error(<b>Login failed!</b>);
      }
      console.log("Google login successful:", result);
    } catch (error) {
      console.error("Error during Google authentication:", error);
    }
  };

  const handleError = () => {
    console.error("Google sign-in failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleSignup;
