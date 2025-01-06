// src/components/GoogleSignup.tsx
import React from "react";
import { GoogleCredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useGoogleLoginMutation } from "app/store/slices/userApiSlices";
import { useRouter } from "next/navigation";

const GoogleSignup: React.FC = () => {
  const router = useRouter();
  const [googleAuth] = useGoogleLoginMutation();

  const handleSuccess = async (credentialResponse: GoogleCredentialResponse) => {
    try {
      const result = await googleAuth(credentialResponse.credential).unwrap();

      if (result.success) {
        const token = result.token;
        if (typeof window !== "undefined") {
          localStorage.setItem("authUserToken", token);
        }
        router.push("/");
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
