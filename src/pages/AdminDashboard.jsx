import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Dummy Data Example (Replace with your backend/API)
const stats = {
  totalOrders: 5,
  revenue: 2460,
  products: 38,
  pendingOrders: 3,
};

const activeOrders = [
  {
    id: "Order #1",
    user: "John Doe",
    address: "123 Main St, Mumbai",
    amount: 350,
    date: "2025-01-18",
    status: "Pending",
    phone: "9876543210",
    items: [
      { name: "Fresh Apples", qty: 2, price: 120, total: 240 },
      { name: "Whole Milk", qty: 1, price: 65, total: 65 },
      { name: "Fresh Bread", qty: 1, price: 45, total: 45 },
    ],
  },
  {
    id: "Order #2",
    user: "Jane Smith",
    address: "456 Oak Ave, Delhi",
    amount: 800,
    date: "2025-01-18",
    status: "Pending",
    phone: "8796542398",
    items: [{ name: "Olive Oil", qty: 2, price: 400, total: 800 }],
  },
  {
    id: "Order #3",
    user: "Amit Kumar",
    address: "789 MG Road, Pune",
    amount: 330,
    date: "2025-01-18",
    status: "Pending",
    phone: "9476541236",
    items: [
      { name: "Chilled Juice", qty: 2, price: 150, total: 300 },
      { name: "Mint Candy", qty: 1, price: 30, total: 30 },
    ],
  },
];

const completedOrders = [
  {
    id: "Order #4",
    user: "Ravi Sharma",
    address: "14 Sector, Jaipur",
    amount: 400,
    date: "2025-01-15",
    status: "Completed",
    phone: "9865234657",
    items: [
      { name: "Tea Pack", qty: 1, price: 200, total: 200 },
      { name: "Sugar 5kg", qty: 1, price: 200, total: 200 },
    ],
  },
  {
    id: "Order #5",
    user: "Priya Mehta",
    address: "92 Lake View, Indore",
    amount: 150,
    date: "2025-01-13",
    status: "Completed",
    phone: "9845632198",
    items: [
      { name: "Biscuits", qty: 3, price: 50, total: 150 },
    ],
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("active");
  const [billOrder, setBillOrder] = useState(null);


   useEffect(() => {
    const admintoken= localStorage.getItem("admintoken");
    if (!admintoken) {
      navigate("/home");
    }
    
   },[])

  // Card Color Styles
  const cardColors = [
    "bg-green-100 text-green-700 border-green-400",
    "bg-blue-100 text-blue-700 border-blue-400",
    "bg-yellow-100 text-yellow-700 border-yellow-400",
    "bg-pink-100 text-pink-700 border-pink-400"
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-5 pb-10 px-2 sm:px-0 relative">
      {/* Header */}
      <div className="flex items-center mb-6 px-2 md:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-8 mb-5 px-2 md:px-8">
        <div className={`${cardColors[0]} rounded-xl px-3 py-4 border flex flex-col items-center shadow-sm`}>
          <div className="text-lg font-bold">{stats.totalOrders}</div>
          <div className="text-xs opacity-80">Total Orders</div>
        </div>
        <div className={`${cardColors[1]} rounded-xl px-3 py-4 border flex flex-col items-center shadow-sm`}>
          <div className="text-lg font-bold">₹{stats.revenue}</div>
          <div className="text-xs opacity-80">Revenue</div>
        </div>
        <div className={`${cardColors[2]} rounded-xl px-3 py-4 border flex flex-col items-center shadow-sm`}>
          <div className="text-lg font-bold">{stats.products}</div>
          <div className="text-xs opacity-80">Products</div>
        </div>
        <div className={`${cardColors[3]} rounded-xl px-3 py-4 border flex flex-col items-center shadow-sm`}>
          <div className="text-lg font-bold">{stats.pendingOrders}</div>
          <div className="text-xs opacity-80">Pending Orders</div>
        </div>
      </div>

      {/* Tab Switch */}
      <div className="flex gap-2 md:gap-3 mb-4 mt-6 px-2 md:px-8">
        <button
          onClick={() => setTab("active")}
          className={`rounded-full px-4 py-1 text-base font-semibold border-none shadow ${tab === "active"
            ? "bg-yellow-400 text-yellow-900"
            : "bg-gray-200 text-gray-800 hover:bg-yellow-200"
            }`}
        >
          Active Orders ({activeOrders.length})
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`rounded-full px-4 py-1 text-base font-semibold border-none shadow ${tab === "completed"
            ? "bg-green-300 text-green-900"
            : "bg-gray-200 text-gray-800 hover:bg-green-100"
            }`}
        >
          Completed Orders ({completedOrders.length})
        </button>
      </div>

      {/* Order List (active / completed) */}
      <div className="max-w-lg mx-auto">
        <div className="bg-white rounded-xl px-2 py-2 sm:px-4 sm:py-4 shadow">
          <p className="font-semibold text-md mb-2 text-gray-600 border-b pb-2">{tab === "active" ? "Active Orders" : "Completed Orders"}</p>
          {(tab === "active" ? activeOrders : completedOrders).map((order, idx) => (
            <div
              key={order.id}
              className={`flex items-center py-2 px-1 rounded hover:bg-yellow-50 cursor-pointer justify-between border-b last:border-none`}
              onClick={() => setBillOrder(order)}
              style={{ fontSize: "0.98rem" }}
            >
              <div className="flex items-center gap-2">
                <span className="bg-yellow-200 text-yellow-700 p-2 rounded-full">
                  <i className="fas fa-receipt"></i>
                </span>
                <div>
                  <div className="font-bold text-gray-800">{order.id}</div>
                  <div className="text-xs text-gray-600">{order.user}</div>
                  <div className="text-xs text-gray-400">{order.address}</div>
                </div>
              </div>
              <div className="text-right min-w-[80px]">
                <div className={`font-bold text-lg ${order.status === "Pending" ? "text-yellow-600" : "text-green-600"}`}>₹{order.amount}</div>
                <div className="flex items-center gap-1 justify-end mt-1">
                  <span className="text-xs font-medium">{order.date}</span>
                  <span className={`${order.status === "Pending"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-green-200 text-green-800"
                    } px-2 py-0.5 rounded-full text-[11px] font-semibold ml-2`}>
                    {order.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {tab === "active" && !activeOrders.length && (
            <div className="text-gray-400 text-sm mt-5 text-center">No active orders.</div>
          )}
          {tab === "completed" && !completedOrders.length && (
            <div className="text-gray-400 text-sm mt-5 text-center">No completed orders.</div>
          )}
        </div>
        {/* Login as Customer Button */}
        <button
          className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition"
          onClick={() => {
            localStorage.removeItem("admintoken");
            navigate("/login")
        }}
        >
          Login as Customer
        </button>
      </div>
      

      {/* Modal for Order Bill */}
      {billOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50" onClick={() => setBillOrder(null)}>
          <div className="bg-white w-[90vw] sm:w-[350px] rounded-lg shadow-lg p-5 relative animate-fade-in" onClick={e => e.stopPropagation()}>
            <button className="absolute right-2 top-2 text-2xl text-gray-400 hover:text-red-400"
              onClick={() => setBillOrder(null)}>&times;</button>
            <h3 className="text-lg font-bold mb-4 text-gray-800 text-center">Order Bill</h3>
            <div className="bg-gray-50 rounded p-3 mb-4">
              <div className="font-semibold mb-1">{billOrder.id}</div>
              <div className="text-xs text-gray-600 mb-0.5">Date: {billOrder.date}</div>
              <div className="text-xs text-gray-600">Customer: {billOrder.user}</div>
              <div className="text-xs text-gray-600">Address: {billOrder.address}</div>
              <div className="text-xs text-gray-600 mb-1">Phone: {billOrder.phone}</div>
            </div>
            <div>
              <div className="font-medium mb-1">Items:</div>
              {billOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center mb-1">
                  <div>
                    <div className="font-semibold">{item.name}</div>
                    <span className="text-xs text-gray-500">₹{item.price} x {item.qty}</span>
                  </div>
                  <span className="font-semibold">₹{item.total}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center mt-3 pt-2 border-t">
              <span className="font-bold">Total:</span>
              <span className="font-bold text-green-600">₹{billOrder.amount}</span>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                className="bg-green-600 hover:bg-green-700 text-white flex-1 py-2 rounded-lg font-semibold"
                onClick={() => { setBillOrder(null); /* mark as completed in real app */ }}
              >
                Mark Completed
              </button>
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-yellow-900 flex-1 py-2 rounded-lg font-semibold"
                onClick={() => { setBillOrder(null); /* mark as pending in real app */ }}
              >
                Mark Pending
              </button>
            </div>
            {/* Refresh Orders Button inside Modal */}
          </div>
        </div>
      )}

      {/* Top-right Buttons */}
      <div>
        <button 
          className="absolute top-4 right-4 bg-red-600 text-white px-3 py-2 rounded-full shadow hover:bg-yellow-500 transition-colors"
          onClick={() => navigate("/admin/add-product")}
          title="Add Product" 
        >
          <i className="fas fa-plus"></i> Add Product
        </button>
      </div>
    </div>
  )
}