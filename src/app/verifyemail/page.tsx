"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";

export default function VerifyEmailPage() {
  const [token, setToken] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      const response = await axios.post("/api/users/verifyemail", { token });
      if (response.data.success) {
        setVerified(true);
      }
    } catch (error) {
      setError(true);
      console.error("Error verifying email: ", error);
    }
  };

  React.useEffect(() => {
    if (token) {
      verifyUserEmail();
    }
  }, [token]);

  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    if (tokenFromUrl) {
      setToken(tokenFromUrl);
    } else {
      setError(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {verified && (
        <>
          <h2>Email verified successfully!</h2>
          <Link href="/login">
            {" "}
            <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Go to Login
            </button>
          </Link>
        </>
      )}
      {error && <h2>Error verifying email. Please try again.</h2>}
    </div>
  );
}
