"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const navigate = useNavigate();
  // Dummy user data (replace with your actual user state/API)
  const user = {
    name: "Raushan Kumar",
    email: "raushan@example.com",
    address: "123 Main Street, City, State, 141001",
    number: "+91 9876543210"
  };

  return (
    <div className="h-[60%] w-full">

    <div className="min-h-screen bg-gray-300 m-1 rounded-2xl flex flex-col items-center py-8 px-4">
      {/* Avatar / FA Profile Icon */}
      <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
        <i className="fas fa-user text-blue-600 text-4xl"></i>
      </div>

      {/* User Details Card */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Your Profile
        </h2>
        <div className="space-y-3 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Name:</span>
            <span>{user.name}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Email:</span>
            <span>{user.email}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Address:</span>
            <span>{user.address}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-medium">Mobile:</span>
            <span>{user.number}</span>
          </div>
        </div>
      </div>

 <div className="flex gap-4 mb-4 w-full max-w-md">
        <button
          className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors flex-1"
          onClick={() => {}}
        >
          Edit Profile <i className="fas fa-pen ml-2"></i>
        </button>
        <button
          className="bg-red-100 text-red-600 py-2 px-6 rounded-lg font-medium hover:bg-red-200 transition-colors flex-1"
          onClick={() => {
            // Clear token/session, then redirect
            localStorage.removeItem("token");
            navigate("/login");
          }}
        >
          Logout <i className="fas fa-sign-out-alt ml-2"></i>
        </button>
      </div>
      {/* Orders Button */}
      <button
        className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4 w-full max-w-md"
        onClick={() => navigate("/profile-order")}
      >
        Your Orders <i className="fas fa-shopping-bag ml-2"></i>
      </button>

      {/* Action Buttons */}
     

      {/* Cart Button */}
      <button
        className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 w-full max-w-md"
        onClick={() => navigate("/category/rice-daal")}
      >
        Start Shopping <i className="fas fa-shopping-cart ml-2"></i>
      </button>
    </div>
    </div>
  );
}
