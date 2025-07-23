"use client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [orderMessage, setOrderMessage] = React.useState("");
  const [orderError, setOrderError] = React.useState("");

  // Fetch cart from API on mount
  React.useEffect(() => {
    async function fetchCart() {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://grocery-backend-s1kk.onrender.com/api/cart",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const cartItems = (data.cart?.items || []).map((item) => ({
          ...item,
          productName: item.productId?.productName,
          imageUrl: item.productId?.imageUrl,
        }));
        setCartItems(cartItems);
      } catch (err) {
        setCartItems([]);
      } finally {
        setLoading(false);
      }
    }
    fetchCart();
  }, []);

  // Update quantity in backend and state
  const updateQuantity = async (id, newQuantity) => {
    const item = cartItems.find(
      (item) => item.id === id || item._id === id
    );
    if (!item) return;
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch("https://grocery-backend-s1kk.onrender.com/api/cart/update", {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: item.productId?._id || item.productId || id,
          size: item.size,
          quantity: newQuantity,
        }),
      });
      // Refetch cart to sync state
      const response = await fetch(
        "https://grocery-backend-s1kk.onrender.com/api/cart",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const cartItems = (data.cart?.items || []).map((item) => ({
        ...item,
        productName: item.productId?.productName,
        imageUrl: item.productId?.imageUrl,
      }));
      setCartItems(cartItems);
    } catch (err) {
      // Optionally show error
    } finally {
      setLoading(false);
    }
  };

  // Remove item from backend and state
  const removeItem = async (id) => {
    const item = cartItems.find(
      (item) => item.id === id || item._id === id
    );
    if (!item) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(
        `https://grocery-backend-s1kk.onrender.com/api/cart/remove/${item.productId?._id || item.productId || id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      // Refetch cart to sync state
      const response = await fetch(
        "https://grocery-backend-s1kk.onrender.com/api/cart",
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      const cartItems = (data.cart?.items || []).map((item) => ({
        ...item,
        productName: item.productId?.productName,
        imageUrl: item.productId?.imageUrl,
      }));
      setCartItems(cartItems);
    } catch (err) {
      // Optionally show error
    } finally {
      setLoading(false);
    }
  };

  // Clear cart in backend and state
  const clearCart = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(
        "https://grocery-backend-s1kk.onrender.com/api/cart/clear",
        {
          method: "DELETE",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      );
      setCartItems([]);
    } catch (err) {
      // Optionally show error
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const getTotalItems = () =>
    cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const getSubtotal = () =>
    cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 1),
      0
    );

  const getTax = () => getSubtotal() * 0.08;
  const getShipping = () => (getSubtotal() > 50 ? 0 : 5.99);
  const getTotal = () => getSubtotal() + getTax() + getShipping();

  // --- PLACE ORDER FUNCTION ---
  const placeOrder = async () => {
    setLoading(true);
    setOrderMessage("");
    setOrderError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setOrderError("Please log in to place an order.");
        navigate("/login");
        return;
      }

      // Prepare order items for backend
      const orderItems = cartItems.map(item => ({
        productId: item.productId?._id || item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        size: item.size || null,
        imageUrl: item.imageUrl || null
      }));

      // Call backend to create order
      const response = await fetch(
        "https://grocery-backend-s1kk.onrender.com/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ items: orderItems }),
        }
      );

      if (response.ok) {
        // Order placed successfully
        setOrderMessage("Order placed successfully!");
        // clearCart(); // Clear the cart
        navigate("/profile-order"); // Redirect to orders page
        // Optionally: Redirect to orders page or show order ID
        // const data = await response.json();
        // navigate(`/orders/${data.order._id}`);
      } else {
        // Show error from server
        const data = await response.json();
        setOrderError(data.message || "Failed to place order");
      }
    } catch (err) {
      setOrderError("Network error: Could not place order");
    } finally {
      setLoading(false);
    }
  };

  // --- RENDER ---

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-green-600 font-bold text-lg">Loading cart...</div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <a href="/" className="flex items-center">
                  <div className="bg-green-500 p-2 rounded-lg mr-3">
                    <i className="fas fa-shopping-cart text-white text-xl"></i>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 font-roboto">
                      Grocery
                    </h1>
                    <p className="text-xs text-gray-500 hidden sm:block">
                      Click Shopping Hub
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </header>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="bg-gray-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-shopping-cart text-4xl text-gray-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-roboto">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/category/rice-daal"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-xs">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/category/rice-daal" className="flex items-center">
                <div className="bg-green-500 p-2 rounded-lg mr-3">
                  <i className="fas fa-shopping-cart text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900 font-roboto">
                    Grocery
                  </h1>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    Click Shopping Hub
                  </p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/category/rice-daal"
                className="text-green-600 hover:text-green-700 font-medium"
                style={{ fontSize: "0.88rem" }}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Shop</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4">
        {orderMessage && (
          <div className="mb-4 p-2 bg-green-100 text-green-800 rounded text-xs">
            {orderMessage}
          </div>
        )}
        {orderError && (
          <div className="mb-4 p-2 bg-red-100 text-red-800 rounded text-xs">
            {orderError}
          </div>
        )}

        <div className="mb-4">
          <h2
            className="text-2xl font-bold text-gray-900 font-roboto"
            style={{ fontSize: "1.05rem" }}
          >
            Shopping Cart
          </h2>
          <p className="text-gray-600 mt-1" style={{ fontSize: "0.85rem" }}>
            {getTotalItems()} items in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm text-xs">
              {/* Table Header */}
              <div className="hidden md:block border-b border-gray-200 p-3">
                <div className="grid grid-cols-12 gap-2 text-xs font-bold text-gray-500 uppercase tracking-wide">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
              </div>
              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id || item._id} className="p-2 md:p-3">
                    {/* Mobile */}
                    <div className="md:hidden">
                      <div className="flex space-x-2">
                        <div className="flex-shrink-0">
                          <img
                            src={
                              item.imageUrl ||
                              "https://via.placeholder.com/80"
                            }
                            alt={item.productName || "Product"}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1 text-xs">
                            {item.productName}
                          </h3>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-bold text-green-600 text-xs">
                              ₹{item.price?.toFixed(2)}
                            </span>
                          </div>
                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id || item._id,
                                    (item.quantity || 1) - 1
                                  )
                                }
                                className="p-1 hover:bg-gray-100"
                              >
                                <i className="fas fa-minus text-xs"></i>
                              </button>
                              <span className="px-2 py-1 font-medium text-xs">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id || item._id,
                                    (item.quantity || 1) + 1
                                  )
                                }
                                className="p-1 hover:bg-gray-100"
                              >
                                <i className="fas fa-plus text-xs"></i>
                              </button>
                            </div>
                            <div className="text-right text-xs">
                              <div className="font-bold text-gray-900">
                                ₹
                                {(
                                  (item.price || 0) * (item.quantity || 1)
                                ).toFixed(2)}
                              </div>
                              <button
                                onClick={() => removeItem(item.id || item._id)}
                                className="text-red-500 hover:text-red-700 text-xs mt-1"
                              >
                                <i className="fas fa-trash mr-1"></i>Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Desktop */}
                    <div className="hidden md:block">
                      <div className="grid grid-cols-12 gap-2 items-center">
                        <div className="col-span-6 flex items-center space-x-2">
                          <div className="flex-shrink-0">
                            <img
                              src={
                                item.imageUrl ||
                                "https://via.placeholder.com/80"
                              }
                              alt={item.productName || "Product"}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1 text-xs">
                              {item.productName}
                            </h3>
                          </div>
                        </div>
                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id || item._id,
                                  (item.quantity || 1) - 1
                                )
                              }
                              className="p-1 hover:bg-gray-100"
                            >
                              <i className="fas fa-minus text-xs"></i>
                            </button>
                            <span className="px-2 py-1 text-xs font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.id || item._id,
                                  (item.quantity || 1) + 1
                                )
                              }
                              className="p-1 hover:bg-gray-100"
                            >
                              <i className="fas fa-plus text-xs"></i>
                            </button>
                          </div>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="font-medium text-gray-900 text-xs">
                            ₹{item.price?.toFixed(2)}
                          </span>
                        </div>
                        <div className="col-span-2 text-center">
                          <div className="font-bold text-gray-900 text-xs">
                            ₹
                            {((item.price || 0) * (item.quantity || 1)).toFixed(
                              2
                            )}
                          </div>
                          <button
                            onClick={() => removeItem(item.id || item._id)}
                            className="text-red-500 hover:text-red-700 text-xs mt-1"
                          >
                            <i className="fas fa-trash mr-1"></i>Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Cart Actions */}
              <div className="border-t border-gray-200 p-2 md:p-3">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium text-xs"
                  >
                    <i className="fas fa-trash mr-1"></i>Clear Cart
                  </button>
                  <Link
                    to="/category/rice-daal"
                    className="text-green-600 hover:text-green-700 font-medium text-xs"
                  >
                    <i className="fas fa-arrow-left mr-1"></i>
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-4 sticky top-6 text-xs">
              <h3
                className="text-lg font-semibold text-gray-900 mb-2 font-roboto"
                style={{ fontSize: "1rem" }}
              >
                Order Summary
              </h3>
              <div className="space-y-2 mb-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({getTotalItems()} items)
                  </span>
                  <span className="font-medium">
                    ₹{getSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {getShipping() === 0
                      ? "FREE"
                      : `₹${getShipping().toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span>Total</span>
                    <span className="text-green-600">
                      ₹{getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              {/* Checkout Button */}
              <button
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 mb-3 text-xs"
                onClick={placeOrder}
                disabled={loading || cartItems.length === 0}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <i className="fas fa-lock"></i>
                    <span>Place your Order</span>
                  </>
                )}
              </button>
              {/* Security Badge */}
            </div>
          </div>
        </div>
      </div>
      {/* Remove "You might also like" section */}
    </div>
  );
}

export default Cart;
