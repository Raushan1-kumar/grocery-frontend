"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
    const navigate = useNavigate();
  const [cartItems, setCartItems] = React.useState([
    {
      id: 1,
      name: "HTC Touch HD",
      price: 122.0,
      originalPrice: 150.0,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      category: "rice-grains",
      discount: 19,
      quantity: 2,
    },
    {
      id: 2,
      name: "Palm Tree Pro",
      price: 237.99,
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
      category: "oil-spices",
      quantity: 1,
    },
    {
      id: 3,
      name: "Canon EOS 5D",
      price: 899.0,
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop",
      category: "fruits",
      quantity: 3,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getTax = () => {
    return getSubtotal() * 0.08;
  };

  const getShipping = () => {
    return getSubtotal() > 50 ? 0 : 5.99;
  };

  const getTotal = () => {
    return getSubtotal() + getTax() + getShipping();
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
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
              <div className="flex items-center space-x-4">
                <a
                  href="/"
                  className="text-green-600 hover:text-green-700 font-medium"
                >
                  <i className="fas fa-arrow-left mr-2"></i>
                  Continue Shopping
                </a>
              </div>
            </div>
          </div>
        </header>

        {/* Empty Cart State */}
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
            <a
              href="/"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors inline-flex items-center"
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
            <div className="flex items-center space-x-4">
              <a
                href="/"
                className="text-green-600 hover:text-green-700 font-medium"
              >
                <i className="fas fa-arrow-left mr-2"></i>
                <span className="hidden sm:inline">Continue Shopping</span>
                <span className="sm:hidden">Shop</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page Title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 font-roboto">
            Shopping Cart
          </h2>
          <p className="text-gray-600 mt-1">
            {getTotalItems()} items in your cart
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Cart Header - Desktop */}
              <div className="hidden md:block border-b border-gray-200 p-6">
                <div className="grid grid-cols-12 gap-4 text-sm font-medium text-gray-500 uppercase tracking-wide">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Total</div>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 md:p-6">
                    {/* Mobile Layout */}
                    <div className="md:hidden">
                      <div className="flex space-x-4">
                        <div className="flex-shrink-0">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 rounded-lg object-cover"
                          />
                          {item.discount && (
                            <span className="inline-block mt-1 bg-green-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                              {item.discount}% OFF
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {item.name}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-lg font-bold text-green-600">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          {/* Quantity Controls - Mobile */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <i className="fas fa-minus text-sm"></i>
                              </button>
                              <span className="px-4 py-2 font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="p-2 hover:bg-gray-100 transition-colors"
                              >
                                <i className="fas fa-plus text-sm"></i>
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="font-bold text-gray-900">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              <button
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 text-sm mt-1"
                              >
                                <i className="fas fa-trash mr-1"></i>
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Desktop Layout */}
                    <div className="hidden md:block">
                      <div className="grid grid-cols-12 gap-4 items-center">
                        {/* Product Info */}
                        <div className="col-span-6 flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-1">
                              {item.name}
                            </h3>
                            <div className="flex items-center space-x-2">
                              <span className="text-lg font-bold text-green-600">
                                ${item.price.toFixed(2)}
                              </span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  ${item.originalPrice.toFixed(2)}
                                </span>
                              )}
                              {item.discount && (
                                <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs font-semibold">
                                  {item.discount}% OFF
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="col-span-2 flex justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <i className="fas fa-minus text-sm"></i>
                            </button>
                            <span className="px-4 py-2 font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-2 hover:bg-gray-100 transition-colors"
                            >
                              <i className="fas fa-plus text-sm"></i>
                            </button>
                          </div>
                        </div>

                        {/* Unit Price */}
                        <div className="col-span-2 text-center">
                          <span className="font-medium text-gray-900">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        {/* Total Price */}
                        <div className="col-span-2 text-center">
                          <div className="font-bold text-gray-900">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 text-sm mt-1"
                          >
                            <i className="fas fa-trash mr-1"></i>
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="border-t border-gray-200 p-4 md:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 font-medium"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    Clear Cart
                  </button>
                  <a
                    href="/"
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Continue Shopping
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-roboto">
                Order Summary
              </h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({getTotalItems()} items)
                  </span>
                  <span className="font-medium">
                    ${getSubtotal().toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${getTax().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {getShipping() === 0
                      ? "FREE"
                      : `$${getShipping().toFixed(2)}`}
                  </span>
                </div>
                {getShipping() === 0 && (
                  <div className="text-sm text-green-600 font-medium">
                    <i className="fas fa-check-circle mr-1"></i>
                    Free shipping on orders over $50
                  </div>
                )}
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">
                      ${getTotal().toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Promo Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Promo Code
                </label>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-r-lg border border-l-0 border-gray-300 hover:bg-gray-200 transition-colors">
                    Apply
                  </button>
                </div>
              </div>

              {/* Checkout Button */}
              <button className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 mb-4" onClick={()=>{navigate("/checkout")}}>
                <i className="fas fa-lock"></i>
                <span>Proceed to Checkout</span>
              </button>

              {/* Security Badge */}
              <div className="text-center text-sm text-gray-500">
                <i className="fas fa-shield-alt mr-1"></i>
                Secure checkout with SSL encryption
              </div>

              {/* Payment Methods */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">We accept:</p>
                <div className="flex space-x-2">
                  <div className="bg-gray-100 p-2 rounded">
                    <i className="fab fa-cc-visa text-blue-600 text-lg"></i>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <i className="fab fa-cc-mastercard text-red-500 text-lg"></i>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <i className="fab fa-cc-amex text-blue-500 text-lg"></i>
                  </div>
                  <div className="bg-gray-100 p-2 rounded">
                    <i className="fab fa-paypal text-blue-600 text-lg"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 font-roboto">
            You might also like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              {
                id: 11,
                name: "Fresh Apples",
                price: 4.99,
                image:
                  "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop",
              },
              {
                id: 12,
                name: "Organic Milk",
                price: 3.49,
                image:
                  "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop",
              },
              {
                id: 13,
                name: "Whole Grain Bread",
                price: 2.99,
                image:
                  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
              },
              {
                id: 14,
                name: "Greek Yogurt",
                price: 5.99,
                image:
                  "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
              },
            ].map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 sm:h-40 object-cover"
                />
                <div className="p-3">
                  <h4 className="font-medium text-gray-900 mb-2 text-sm">
                    {product.name}
                  </h4>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-green-600">
                      ${product.price}
                    </span>
                    <button className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors">
                      <i className="fas fa-plus mr-1"></i>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;