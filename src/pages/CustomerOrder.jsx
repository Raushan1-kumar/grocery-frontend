import React, { useState } from "react";

const dummyOrders = [
  {
    _id: "ORD124",
    date: "2025-07-19",
    status: "Processing",
    total: "₹380",
    items: [
      { name: "Oil (1L)", qty: 1, price: 380 }
    ]
  },
  {
    _id: "ORD123",
    date: "2025-07-18",
    status: "Delivered",
    total: "₹450",
    items: [
      { name: "Basmati Rice (5kg)", qty: 1, price: 390 },
      { name: "Munch (10g)", qty: 2, price: 30 }
    ]
  },
  {
    _id: "ORD122",
    date: "2025-05-10",
    status: "Cancelled",
    total: "₹160",
    items: [
      { name: "Kurkure (30g)", qty: 4, price: 160 }
    ]
  }
];

export default function ProfileOrdersMinimal() {
  const [openOrder, setOpenOrder] = useState(null);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-gray-50 min-h-screen">
      <h2 className="font-bold text-lg mb-5 text-green-700">My Orders</h2>

      {/* List orders, one line per order, font-size small */}
      <div>
        {dummyOrders.map((order) => (
          <div
            key={order._id}
            className="flex items-center justify-between border-b py-1 cursor-pointer hover:bg-green-50"
            style={{ fontSize: "0.72rem" }}
            onClick={() => setOpenOrder(order)}
          >
            <span>{order.date}</span>
            <span className={`ml-3 mr-3 ${
              order.status === "Delivered" ? "text-green-600" : order.status === "Cancelled" ? "text-red-400" : "text-yellow-600"
            }`}>
              {order.status}
            </span>
            <span className="font-semibold">{order.total}</span>
          </div>
        ))}
      </div>

      {/* Popout modal for order bill */}
      {openOrder && (
        <div
          className="fixed inset-0 z-20 flex items-center justify-center bg-black bg-opacity-30"
          onClick={() => setOpenOrder(null)}
        >
          <div
            className="bg-white p-5 rounded shadow-lg min-w-[300px] max-w-sm"
            style={{ fontSize: "0.78rem" }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold">Order #{openOrder._id}</span>
              <button
                type="button"
                className="text-red-400 hover:text-red-600 text-xs"
                onClick={() => setOpenOrder(null)}
              >
                ×
              </button>
            </div>
            <div className="mb-2">
              <span>Date: {openOrder.date}</span><br />
              <span>Status: <span className={
                  openOrder.status === "Delivered"
                  ? "text-green-600" : openOrder.status === "Cancelled"
                  ? "text-red-400" : "text-yellow-600"
              }>
                {openOrder.status}
              </span>
              </span><br />
              <span>Total: <b>{openOrder.total}</b></span>
            </div>
            <div className="border-t py-2">
              <div className="font-semibold mb-1">Products</div>
              {openOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between py-0.5">
                  <span>{item.name} x{item.qty}</span>
                  <span>₹{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
