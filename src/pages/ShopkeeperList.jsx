import React, { useState, useEffect } from "react";

function EditModal({ shop, onClose, onSave, loading }) {
  const [form, setForm] = useState({
    name: shop.name,
    address: shop.address,
    number: shop.number,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(shop._id, form);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-xl font-semibold mb-4">Edit Shop</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Shop Name*</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-400 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address*</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-400 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Number*</label>
            <input
              type="tel"
              name="number"
              value={form.number}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-emerald-400 focus:ring focus:ring-emerald-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-md transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className={`px-3 py-1 ${
                loading ? "bg-emerald-300" : "bg-emerald-500 hover:bg-emerald-600"
              } text-white rounded-md transition duration-200 flex items-center gap-1`}
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ShopListPage() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedShop, setExpandedShop] = useState(null);
  const [editingShop, setEditingShop] = useState(null);
  const [message, setMessage] = useState("");
  const [editLoading, setEditLoading] = useState(false);

  // Fetch all shops
  useEffect(() => {
    const fetchShops = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://grocery-backend-s1kk.onrender.com/api/shops");
        if (res.ok) {
          const data = await res.json();
          setShops(data);
        } else {
          setMessage("Failed to load shops.");
        }
      } catch (error) {
        setMessage("Network error.");
      } finally {
        setLoading(false);
      }
    };
    fetchShops();
  }, []);

  // Handle shop deletion
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const res = await fetch(`https://grocery-backend-s1kk.onrender.com/api/shops/${id}`, { method: "DELETE" });
      if (res.ok) {
        setShops(shops.filter((shop) => shop._id !== id));
        setMessage("Shop deleted.");
        setExpandedShop(null);
      } else {
        setMessage("Delete failed.");
      }
    } catch (error) {
      setMessage("Network error.");
    } finally {
      setLoading(false);
    }
  };

  // Handle shop edit save
  const handleEditSave = async (id, updatedData) => {
    setEditLoading(true);
    try {
      const res = await fetch(`https://grocery-backend-s1kk.onrender.com/api/shops/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      if (res.ok) {
        const updatedShop = await res.json();
        setShops(shops.map((shop) => (shop._id === id ? updatedShop : shop)));
        setMessage("Shop updated.");
        setEditingShop(null);
      } else {
        setMessage("Update failed.");
      }
    } catch (error) {
      setMessage("Network error.");
    } finally {
      setEditLoading(false);
    }
  };

  // Toggle shop details
  const toggleExpand = (id) => {
    setExpandedShop(expandedShop === id ? null : id);
  };

  // Start editing a shop (open modal pre-filled)
  const startEdit = (shop) => {
    setEditingShop(shop);
  };

  return (
    <div className="min-h-screen bg-emerald-50 p-6">
      <div className="w-full max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Shop List</h1>
        {message && (
          <p
            className={`text-center mb-4 p-2 ${
              message.includes("updated") || message.includes("deleted")
                ? "text-emerald-600"
                : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
        {loading ? (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-500"></div>
          </div>
        ) : (
          <ul className="space-y-2">
            {shops.map((shop) => (
              <li
                key={shop._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <button
                  className="w-full flex justify-between items-center p-3 text-left hover:bg-gray-50"
                  onClick={() => toggleExpand(shop._id)}
                >
                  <span className="font-medium">{shop.name}</span>
                  <span className="text-gray-400">{expandedShop === shop._id ? "▲" : "▼"}</span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-200 ${
                    expandedShop === shop._id ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-4 pb-4 bg-white">
                    <div className="text-sm text-gray-700 mb-2">
                      <strong>Address:</strong> {shop.address}
                    </div>
                    <div className="text-sm text-gray-700 mb-3">
                      <strong>Number:</strong> {shop.number}
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(shop)}
                        className="px-3 py-1 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded-md transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(shop._id)}
                        className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-md transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
        {shops.length === 0 && !loading && (
          <p className="text-center text-gray-500 mt-6">No shops found.</p>
        )}
      </div>
      {editingShop && (
        <EditModal
          shop={editingShop}
          onClose={() => setEditingShop(null)}
          onSave={handleEditSave}
          loading={editLoading}
        />
      )}
    </div>
  );
}
