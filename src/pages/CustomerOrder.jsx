"use client";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("https://grocery-backend-s1kk.onrender.com");


function OrderDetail() {
  const { orderId } = useParams(); // Get orderId from URL
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  // --- Fetch order data ---
useEffect(() => {
  socket.onAny((event, ...args) => {
    console.log("Socket event received:", event, args);
  });
}, []);


  async function fetchOrder() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Please log in.");
      const res = await fetch(`https://grocery-backend-s1kk.onrender.com/api/orders/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && data.success && data.orders?.length) {
        const sorted = data.orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrder(sorted[0]);
      } else {
        setError("Order not found");
      }
    } catch (err) {
      setError(err.message || "Failed to fetch order");
    } finally {
      setLoading(false);
    }
  }


  useEffect(() => {
    socket.on("orderPlaced", fetchOrder);
    socket.on("orderUpdated", fetchOrder);

    return () => {
      socket.off("orderPlaced", fetchOrder); // CORRECT CLEANUP
      socket.off("orderUpdated", fetchOrder);
    };
  }, [orderId]);

  useEffect(() => {
    fetchOrder();
  }, [orderId]); // <-- This ensures re-fetch when orderId changes!

  // --- Helpers ---
  const cancelOrder = async () => {
    if (!confirm("Are you sure you want to cancel this order?")) return;
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `https://grocery-backend-s1kk.onrender.com/api/orders/${order._id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.ok) {
        alert("Order cancelled");
        navigate("/cart");
      } else {
        const data = await res.json();
        setError(data.message || "Failed to cancel order");
      }
    } catch (err) {
      setError("Network error");
    }
  };

  // --- UI ---
  if (loading) return <div className="p-4 text-center">Loading...</div>;
  if (error) return <div className="p-4 text-red-500 text-center">{error}</div>;
  if (!order) {
    return (
      <div className="p-4 text-center">
        Order not found.{" "}
        <button
          onClick={() => navigate("/category/rice-daal")}
          className="text-blue-500 underline"
        >
          Shop More Product
        </button>
      </div>
    );
  }

  const totalPrice = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md my-6">
      <h2 className="text-lg font-bold mb-2">Order #{order._id}</h2>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(order.createdAt).toLocaleString()}
      </p>
      <p className="mb-4">
        <span className="font-semibold">Status:</span> {order.status}
      </p>
      <div className="border-t border-gray-200 mb-4"></div>
      <table className="w-full mb-4">
        <thead>
          <tr>
            <th className="text-left">Product</th>
            <th className="text-center">Qty</th>
            <th className="text-center">Price</th>
            <th className="text-center">Total</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((item) => (
            <tr key={item._id} className="border-b border-gray-100">
              <td className="py-2 flex items-center">
                {/* <img
                  src={item.imageUrl}
                  alt={item.productName}
                  className="w-10 h-10 rounded-lg object-cover mr-2"
                /> */}
                <span className="font-medium">{item.productName}</span>
              </td>
              <td className="text-center py-2">{item.quantity}</td>
              <td className="text-center py-2">₹{item.price}</td>
              <td className="text-center py-2">
                ₹{(item.price * item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="3" className="text-right font-semibold py-2">
              Grand Total:
            </td>
            <td className="text-center font-semibold py-2">₹{totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
      
      {order.status === "Processing" && (
        <button
          onClick={cancelOrder}
          className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
        >
          Cancel Order
        </button>
      )}
      <button
        onClick={() => navigate("/category/rice-daal")}
        className="mt-4 w-full bg-gray-300 text-gray-800 py-2 rounded-lg hover:bg-gray-400"
      >
        Shop more Product
      </button>
    </div>
  );
}

export default OrderDetail;
