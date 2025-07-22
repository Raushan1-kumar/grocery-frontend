import React, { useState, useEffect } from "react";
import { FaShoppingBag, FaShippingFast, FaCheck, FaTimes, FaChevronDown, FaChevronUp, FaSpinner } from "react-icons/fa";
import { HiMoon, HiSun } from "react-icons/hi";

const STATUS = ["Active", "Processing", "Delivered", "Cancelled"];

// This is mock data - replace with your actual fetchOrders logic!
const MOCK_ORDERS = Array.from({ length: 25 }, (_, i) => ({
  _id: `ORD${1100 + i}`,
  date: new Date(Date.now() - i * 86400000).toISOString().split("T")[0],
  status: STATUS[i % 4],
  total: 200 + i * 10,
  items: Array.from({ length: (i % 3) + 1 }, (_, j) => ({
    name: `${["Green Tea", "Coffee", "Juice", "Pastry"][j % 4]} (${["S", "M", "L"][j % 3]})`,
    qty: (i % 2) + 1,
    price: 100 + j * 50,
  })),
  shippingAddress: `${i % 5 + 1} Tea Garden Lane, Block ${i % 10}, City`,
}));

function TeaRating({ brewing }) {
  if (!brewing) return null;
  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center pointer-events-none">
      <div className="animate-bounce transition-transform duration-300">
        <div className="w-64 h-32 bg-gradient-to-r from-amber-300/80 to-amber-400/80 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}

function OrderTeaDelighter({ order }) {
  const [teaBrewing, setTeaBrewing] = useState(false);
  useEffect(() => setTeaBrewing(true), [order]);
  return (
    <div className="h-48 relative">
      <TeaRating brewing={teaBrewing} />
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <div className="text-4xl mb-3">
          {order.status === "Delivered" ? "🥳" : "☕"}
        </div>
        <p className="text-gray-600 font-medium">
          {order.status === "Delivered"
            ? "Your order has arrived!"
            : order.status === "Cancelled"
            ? "We cancelled your order with care"
            : "Brewing your order to perfection"}
        </p>
        <p className="text-xs text-gray-500 mt-2">
          {order.status === "Delivered"
            ? "Enjoy your delicious goodies!"
            : order.status === "Cancelled"
            ? "Feel free to place a fresh order whenever you wish."
            : "Steeping leaves just for you..."}
        </p>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const colors = {
    Active: "bg-blue-100 text-blue-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-gray-100 text-gray-700",
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-bold rounded-full ${colors[status]}`}
    >
      {status}
    </span>
  );
}

export default function OrderHistoryPage() {
  const [selectedTab, setSelectedTab] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  //const [searchTerm, setSearchTerm] = useState("");
  //const [orders, setOrders] = useState([]);
  // For now, using mock data:
  const [orders, setOrders] = useState(MOCK_ORDERS);

  // Uncomment and implement when you connect to backend
  /*
  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("https://your-backend/api/orders", {
          headers: { Authorization: "Bearer " + token },
        });
        const data = await response.json();
        if (response.ok) setOrders(data);
        else throw new Error(data.message || "Failed to fetch orders");
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);
  */

  // Filter orders by status
  const filteredOrders = orders.filter(
    (order) => selectedTab === "All" || order.status === selectedTab
  );

  // Paginate
  const ITEMS_PER_PAGE = 10;
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIdx = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(
    startIdx,
    startIdx + ITEMS_PER_PAGE
  );

  // For fun: theme toggler
  const [darkMode, setDarkMode] = useState(false);
  const themeClasses = darkMode
    ? "bg-gray-900 text-gray-100"
    : "bg-gray-50 text-gray-800";

  return (
    <div
      className={`min-h-screen transition-colors duration-200 ${themeClasses}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 transition-colors duration-200">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <h1 className="text-2xl md:text-3xl font-bold font-roboto mb-4 md:mb-0">
            Order History
          </h1>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-full ${
                darkMode ? "bg-gray-700" : "bg-gray-200"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? <HiSun className="h-5 w-5" /> : <HiMoon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {/* Search by order ID (optional, commented)
        <div className="mb-4">
          <input
            type="text"
            placeholder="🔍 Search by Order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        */}
        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {["All", ...STATUS].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setSelectedTab(tab);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                selectedTab === tab
                  ? "bg-green-500 text-white"
                  : darkMode
                  ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        {/* Loading state */}
        {loading && (
          <div className="h-48 flex items-center justify-center">
            <FaSpinner className="animate-spin text-4xl text-green-500" />
          </div>
        )}
        {/* Empty state */}
        {!loading && filteredOrders.length === 0 && (
          <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4">
            <div
              className={`w-24 h-24 rounded-full flex items-center justify-center mb-4 ${
                darkMode ? "bg-gray-800" : "bg-gray-100"
              }`}
            >
              <FaShoppingBag className="text-4xl text-gray-400" />
            </div>
            <h2 className="text-xl font-bold mb-2">No orders yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Your order history is empty. Start shopping to see your orders
              here!
            </p>
            <a
              href="/"
              className={`px-6 py-2 rounded-lg font-medium flex items-center gap-2 ${
                darkMode
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-500 hover:bg-green-600"
              } text-white`}
            >
              <FaShoppingBag />
              Start Shopping
            </a>
          </div>
        )}
        {/* Order List */}
        {!loading && filteredOrders.length > 0 && (
          <div>
            {paginatedOrders.map((order) => (
              <div
                key={order._id}
                className={`mb-3 rounded-lg overflow-hidden transition-all duration-200 ${
                  darkMode ? "bg-gray-800" : "bg-white"
                } shadow ${
                  expandedOrder === order._id
                    ? "shadow-lg border-l-4 border-green-500"
                    : ""
                }`}
              >
                <button
                  onClick={() =>
                    setExpandedOrder(expandedOrder === order._id ? null : order._id)
                  }
                  className={`w-full p-4 flex items-center justify-between ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <p className="font-medium">#{order._id}</p>
                    <p
                      className={`text-sm ${
                        darkMode ? "text-gray-300" : "text-gray-500"
                      }`}
                    >
                      {order.date}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill status={order.status} />
                    <span
                      className={`font-bold ${
                        darkMode ? "text-gray-100" : "text-gray-900"
                      }`}
                    >
                      ₹{order.total.toLocaleString()}
                    </span>
                    {expandedOrder === order._id ? (
                      <FaChevronUp className="text-gray-400" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </div>
                </button>
                {/* Order Drawer/Details */}
                {expandedOrder === order._id && (
                  <div className="border-t transition-all duration-200">
                    <div className="p-4">
                      <OrderTeaDelighter order={order} />
                    </div>
                    <div
                      className={`p-4 ${
                        darkMode ? "bg-gray-700" : "bg-gray-50"
                      } rounded-b-lg`}
                    >
                      <div className="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h3 className="text-sm font-bold mb-1">SHIPPING</h3>
                          <p>{order.shippingAddress}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-bold mb-1">STATUS</h3>
                          <div className="flex items-center gap-2">
                            {order.status === "Processing" && (
                              <FaShippingFast className="text-yellow-500" />
                            )}
                            {order.status === "Delivered" && (
                              <FaCheck className="text-green-500" />
                            )}
                            {order.status === "Cancelled" && (
                              <FaTimes className="text-red-500" />
                            )}
                            <StatusPill status={order.status} />
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-bold mb-2">ITEMS</h3>
                        <ul>
                          {order.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex justify-between py-1 px-1"
                            >
                              <span>
                                {item.name} ×{item.qty}
                              </span>
                              <span className="font-medium">
                                ₹{item.price * item.qty}
                              </span>
                            </li>
                          ))}
                        </ul>
                        {/* Subtotal, Tax, Shipping, Total (optional)
                        <div className="border-t mt-2 pt-2">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>Subtotal</div>
                            <div className="text-right">₹{order.total}</div>
                            <div>Tax</div>
                            <div className="text-right">₹{order.total * 0.08}</div>
                            <div>Shipping</div>
                            <div className="text-right">FREE</div>
                            <div className="font-bold">Total</div>
                            <div className="text-right font-bold">
                              ₹{order.total * 1.08}
                            </div>
                          </div>
                        </div>
                        */}
                      </div>
                      {/* Cancel/Reorder actions (optional)
                      <div className="mt-4 flex gap-2">
                        {order.status === "Processing" && (
                          <button
                            className="px-3 py-1 bg-red-100 text-red-600 text-xs rounded-lg hover:bg-red-200"
                            onClick={handleCancelOrder}
                          >
                            Cancel Order
                          </button>
                        )}
                        <button
                          className="px-3 py-1 bg-green-100 text-green-600 text-xs rounded-lg hover:bg-green-200"
                          onClick={handleReorder}
                        >
                          Reorder
                        </button>
                      </div>
                      */}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Pagination */}
            <div className="flex justify-center mt-6 mb-8">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`px-3 py-1 rounded-l-lg ${
                    darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                      : "bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  }`}
                >
                  &larr;
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const page = Math.max(
                    1,
                    Math.min(
                      currentPage - 2,
                      totalPages - 4
                    )
                  ) + i;
                  if (page < 1 || page > totalPages) return null;
                  return (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 ${
                        page === currentPage
                          ? "bg-green-500 text-white"
                          : darkMode
                          ? "bg-gray-800 hover:bg-gray-700"
                          : "bg-white hover:bg-gray-100"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`px-3 py-1 rounded-r-lg ${
                    darkMode
                      ? "bg-gray-800 text-gray-300 hover:bg-gray-700 disabled:opacity-50"
                      : "bg-white text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                  }`}
                >
                  &rarr;
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
