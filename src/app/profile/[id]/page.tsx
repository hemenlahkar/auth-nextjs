import React from "react";

const UserProfile = async ({ params }: any) => {
  const {id} = await params;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-center text-white text-2xl">Profile</h1>
      <hr />
      <p className="text-center text-white text-xl">
        Welcome to{" "}
        <span className="bg-orange-500 px-2 py-1 rounded-sm">{id}</span> profile
        page!
      </p>
    </div>
  );
};

export default UserProfile;
