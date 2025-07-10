"use client";
import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VerifyEmailPage() {
  const [token, setToken] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const router = useRouter();

  const resetUserPassword = async () => {
    try {
      const response = await axios.post("/api/users/forgotpassword", {
        token,
        password,
      });
      if (response.data.success) {
        router.push("/login");
      }
    } catch (error) {
      setError(true);
      console.error("Error resetting password: ", error);
    }
  };

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
    <>
      {error ? (
        <div className="text-red-500">
          Error occurred while resetting password
        </div>
      ) : (
        <form className="flex flex-col items-center justify-center min-h-screen">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-4 p-2 border border-gray-300 rounded"
          />
          <button
            type="button"
            onClick={resetUserPassword}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Reset Password
          </button>
        </form>
      )}
    </>
  );
}
