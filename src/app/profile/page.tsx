"use client";
import axios from "axios";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/users/logout");
      console.log(response.data);
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-white text-2xl">Profile</h1>
      <hr />
      <p className="text-center text-white">Welcome to your profile page!</p>
      <hr />
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
