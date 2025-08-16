import React, { useState } from "react";

export default function ShopForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    number: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Show loader
    try {
      const res = await fetch("https://grocery-backend-3fd4.onrender.com/api/shops", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setMessage("Shop saved successfully!");
        setForm({ name: "", address: "", number: "" });
      } else {
        setMessage("Error saving shop. Please try again.");
      }
    } catch (err) {
      setMessage("Network error. Please try again.");
    }
    setLoading(false); // Hide loader
  };

  return (
    <div className="min-h-screen bg-emerald-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Add Shop Details
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Shop Name*
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-400 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Address*
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-400 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="number"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Number*
            </label>
            <input
              id="number"
              name="number"
              type="tel"
              value={form.number}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-400 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 ${loading ? "bg-emerald-400" : "bg-emerald-500 hover:bg-emerald-600"} text-white font-medium rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-opacity-50 flex items-center justify-center`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </>
            ) : (
              "Add Shop"
            )}
          </button>
          {message && (
            <p
              className={`mt-4 text-center ${
                message.includes("successfully") ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
