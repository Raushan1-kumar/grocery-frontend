"use client";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Modal reusable component
function ProfileEditModal({ open, user, onClose, onSave, loading }) {
  const [form, setForm] = useState(user || {});

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          aria-label="Close"
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-800 text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Edit Profile</h2>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSave(form);
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              name="name"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={form.name || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={form.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              name="address"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={form.address || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Mobile</label>
            <input
              name="number"
              className="w-full border border-gray-300 rounded-lg p-2 mt-1"
              value={form.number || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg py-2 bg-gray-200 text-gray-800 hover:bg-gray-300"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg py-2 bg-blue-600 text-white hover:bg-blue-700 font-semibold"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // Fetch user info on mount
  async function fetchUser() {
    try {
      setErrorMsg("");
      const token = localStorage.getItem("token");
      const res = await fetch("https://grocery-backend-s1kk.onrender.com/api/users/me", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to fetch user");
      const data = await res.json();
      setUser(data);
    } catch (err) {
      setErrorMsg("Could not load profile. Please login again.");
    }
  }

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line
  }, []);

  // Use PUT instead of PATCH for updates
  async function handleSaveEdit(newData) {
    setIsSaving(true);
    setErrorMsg("");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("https://grocery-backend-s1kk.onrender.com/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newData)
      });
      if (!res.ok) throw new Error("Could not update profile");
      // To always have latest info, refetch after update
      await fetchUser();
      setModalOpen(false);
    } catch (err) {
      setErrorMsg("Update failed. Try again!");
    }
    setIsSaving(false);
  }

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("stafftoken");
    navigate("/login");
  }

  return (
    <div className="h-[60%] w-full">
      <div className="min-h-screen bg-gray-300 m-1 rounded-2xl flex flex-col items-center py-8 px-4">
        {/* Avatar / FA Profile Icon */}
        <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-4">
          <i className="fas fa-user text-blue-600 text-4xl"></i>
        </div>

        {/* Error or Loading */}
        {!user && !errorMsg && (
          <div className="text-gray-600 text-lg my-4">Loading profile...</div>
        )}
        {errorMsg && (
          <div className="bg-red-100 text-red-800 p-3 rounded-lg mb-4 w-full max-w-md text-center">
            {errorMsg}
          </div>
        )}

        {/* User Details Card */}
        {user && (
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
        )}

        {/* Buttons below profile card */}
        {user && (
          <>
            <div className="flex gap-4 mb-4 w-full max-w-md">
              <button
                className="bg-gray-200 text-gray-800 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors flex-1"
                onClick={() => setModalOpen(true)}
              >
                Edit Profile <i className="fas fa-pen ml-2"></i>
              </button>
              <button
                className="bg-red-100 text-red-600 py-2 px-6 rounded-lg font-medium hover:bg-red-200 transition-colors flex-1"
                onClick={handleLogout}
              >
                Logout <i className="fas fa-sign-out-alt ml-2"></i>
              </button>
            </div>
            <button
              className="bg-green-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors mb-4 w-full max-w-md"
              onClick={() => navigate("/profile-order")}
            >
              Your Orders <i className="fas fa-shopping-bag ml-2"></i>
            </button>
            <button
              className="bg-blue-600 text-white py-2 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4 w-full max-w-md"
              onClick={() => navigate("/category/rice-daal")}
            >
              Start Shopping <i className="fas fa-shopping-cart ml-2"></i>
            </button>
          </>
        )}

        {/* Modal for editing */}
        <ProfileEditModal
          open={modalOpen}
          user={user}
          loading={isSaving}
          onClose={() => setModalOpen(false)}
          onSave={handleSaveEdit}
        />
      </div>
    </div>
  );
}
