"use client";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const UserProfile = ({ params }: any) => {
   const router = useRouter();
   const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logged out successfully!");
      router.push("/login");
    } catch (error) {
      console.error("Error logging out:", error);
      toast.error("Failed to log out. Please try again.");
    }
  };
  const getParams = async () => {
    try {
      const { id } = await params;
      return id;
    } catch (error) {
      console.error("Error fetching params:", error);
      return null;
    }
  };
  const id = getParams();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-white text-2xl">Profile</h1>
      <hr />
      <p className="text-center text-white text-xl">
        Welcome to{" "}
        <span className="bg-orange-500 px-2 py-1 rounded-sm">{id}</span> profile
        page!
      </p>
      <button onClick={handleLogout} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;
