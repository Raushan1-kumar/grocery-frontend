"use client";
import React from "react";

function Checkout() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    // Shipping Information
    shipping: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
    // Billing Information
    billing: {
      sameAsShipping: true,
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
    },
    // Payment Information
    payment: {
      method: "credit-card",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      cardName: "",
      paypalEmail: "",
    },
    // Delivery Options
    delivery: {
      method: "standard",
      instructions: "",
    },
  });

  const [errors, setErrors] = React.useState({});
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [orderComplete, setOrderComplete] = React.useState(false);

  // Sample cart items (would come from cart context in real app)
  const cartItems = [
    {
      id: 1,
      name: "Fresh Organic Apples",
      price: 4.99,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Whole Grain Bread",
      price: 3.49,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Organic Milk",
      price: 5.99,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=100&h=100&fit=crop",
    },
  ];

  const deliveryOptions = [
    {
      id: "standard",
      name: "Standard Delivery",
      time: "3-5 business days",
      price: 0,
    },
    {
      id: "express",
      name: "Express Delivery",
      time: "1-2 business days",
      price: 9.99,
    },
    {
      id: "overnight",
      name: "Overnight Delivery",
      time: "Next business day",
      price: 19.99,
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const selectedDelivery = deliveryOptions.find(
    (option) => option.id === formData.delivery.method
  );
  const deliveryFee = selectedDelivery ? selectedDelivery.price : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + deliveryFee + tax;

  const updateFormData = (section, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
    // Clear error when user starts typing
    if (errors[`${section}.${field}`]) {
      setErrors((prev) => ({
        ...prev,
        [`${section}.${field}`]: "",
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      // Validate shipping information
      const required = [
        "firstName",
        "lastName",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "zipCode",
      ];
      required.forEach((field) => {
        if (!formData.shipping[field]) {
          newErrors[`shipping.${field}`] = "This field is required";
        }
      });

      // Email validation
      if (
        formData.shipping.email &&
        !/\S+@\S+\.\S+/.test(formData.shipping.email)
      ) {
        newErrors["shipping.email"] = "Please enter a valid email address";
      }

      // Phone validation
      if (
        formData.shipping.phone &&
        !/^\d{10}$/.test(formData.shipping.phone.replace(/\D/g, ""))
      ) {
        newErrors["shipping.phone"] =
          "Please enter a valid 10-digit phone number";
      }
    }

    if (step === 2) {
      // Validate billing information if different from shipping
      if (!formData.billing.sameAsShipping) {
        const required = [
          "firstName",
          "lastName",
          "address",
          "city",
          "state",
          "zipCode",
        ];
        required.forEach((field) => {
          if (!formData.billing[field]) {
            newErrors[`billing.${field}`] = "This field is required";
          }
        });
      }
    }

    if (step === 3) {
      // Validate payment information
      if (formData.payment.method === "credit-card") {
        if (!formData.payment.cardNumber) {
          newErrors["payment.cardNumber"] = "Card number is required";
        } else if (
          !/^\d{16}$/.test(formData.payment.cardNumber.replace(/\s/g, ""))
        ) {
          newErrors["payment.cardNumber"] =
            "Please enter a valid 16-digit card number";
        }

        if (!formData.payment.expiryDate) {
          newErrors["payment.expiryDate"] = "Expiry date is required";
        } else if (!/^\d{2}\/\d{2}$/.test(formData.payment.expiryDate)) {
          newErrors["payment.expiryDate"] = "Please enter date in MM/YY format";
        }

        if (!formData.payment.cvv) {
          newErrors["payment.cvv"] = "CVV is required";
        } else if (!/^\d{3,4}$/.test(formData.payment.cvv)) {
          newErrors["payment.cvv"] = "Please enter a valid CVV";
        }

        if (!formData.payment.cardName) {
          newErrors["payment.cardName"] = "Cardholder name is required";
        }
      } else if (formData.payment.method === "paypal") {
        if (!formData.payment.paypalEmail) {
          newErrors["payment.paypalEmail"] = "PayPal email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.payment.paypalEmail)) {
          newErrors["payment.paypalEmail"] =
            "Please enter a valid email address";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handlePlaceOrder = async () => {
    if (!validateStep(3)) return;

    setIsProcessing(true);

    // Simulate payment processing
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setOrderComplete(true);
      setCurrentStep(5);
    } catch (error) {
      console.error("Payment processing failed:", error);
      setErrors({ general: "Payment processing failed. Please try again." });
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
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
              </div>
            </div>
          </div>
        </header>

        {/* Order Success */}
        <div className="max-w-2xl mx-auto px-4 py-16">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-check text-3xl text-green-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4 font-roboto">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Thank you for your order. We'll send you a confirmation email
              shortly.
            </p>

            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Order Number:</span>
                <span className="text-green-600 font-mono">
                  #ORD-{Date.now().toString().slice(-6)}
                </span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total Amount:</span>
                <span className="text-xl font-bold text-green-600">
                  ${total.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold">Estimated Delivery:</span>
                <span>{selectedDelivery.time}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => (window.location.href = "/")}
                className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors font-semibold"
              >
                Continue Shopping
              </button>
              <button className="border border-green-500 text-green-500 px-8 py-3 rounded-lg hover:bg-green-50 transition-colors font-semibold">
                Track Order
              </button>
            </div>
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
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Secure Checkout</p>
              <div className="flex items-center text-green-600">
                <i className="fas fa-lock mr-1"></i>
                <span className="text-xs">SSL Encrypted</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[
              { step: 1, title: "Shipping", icon: "fas fa-truck" },
              { step: 2, title: "Billing", icon: "fas fa-credit-card" },
              { step: 3, title: "Payment", icon: "fas fa-lock" },
              { step: 4, title: "Review", icon: "fas fa-check-circle" },
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep >= item.step
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  <i className={`${item.icon} text-sm`}></i>
                </div>
                <div className="ml-2 hidden sm:block">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= item.step
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {item.title}
                  </p>
                </div>
                {index < 3 && (
                  <div
                    className={`w-8 sm:w-16 h-0.5 mx-2 ${
                      currentStep > item.step ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-roboto">
                    <i className="fas fa-truck mr-2 text-green-500"></i>
                    Shipping Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.shipping.firstName}
                        onChange={(e) =>
                          updateFormData(
                            "shipping",
                            "firstName",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["shipping.firstName"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter first name"
                      />
                      {errors["shipping.firstName"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["shipping.firstName"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.shipping.lastName}
                        onChange={(e) =>
                          updateFormData("shipping", "lastName", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["shipping.lastName"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter last name"
                      />
                      {errors["shipping.lastName"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["shipping.lastName"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.shipping.email}
                        onChange={(e) =>
                          updateFormData("shipping", "email", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["shipping.email"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter email address"
                      />
                      {errors["shipping.email"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["shipping.email"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.shipping.phone}
                        onChange={(e) =>
                          updateFormData("shipping", "phone", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["shipping.phone"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter phone number"
                      />
                      {errors["shipping.phone"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["shipping.phone"]}
                        </p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        name="address"
                        value={formData.shipping.address}
                        onChange={(e) =>
                          updateFormData("shipping", "address", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["shipping.address"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter street address"
                      />
                      {errors["shipping.address"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["shipping.address"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.shipping.city}
                        onChange={(e) =>
                          updateFormData("shipping", "city", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["shipping.city"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter city"
                      />
                      {errors["shipping.city"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["shipping.city"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State *
                      </label>
                      <select
                        name="state"
                        value={formData.shipping.state}
                        onChange={(e) =>
                          updateFormData("shipping", "state", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["shipping.state"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                        <option value="IL">Illinois</option>
                      </select>
                      {errors["shipping.state"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["shipping.state"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        value={formData.shipping.zipCode}
                        onChange={(e) =>
                          updateFormData("shipping", "zipCode", e.target.value)
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["shipping.zipCode"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter ZIP code"
                      />
                      {errors["shipping.zipCode"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["shipping.zipCode"]}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country *
                      </label>
                      <select
                        name="country"
                        value={formData.shipping.country}
                        onChange={(e) =>
                          updateFormData("shipping", "country", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      >
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="Mexico">Mexico</option>
                      </select>
                    </div>
                  </div>

                  {/* Delivery Options */}
                  <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Delivery Options
                    </h3>
                    <div className="space-y-3">
                      {deliveryOptions.map((option) => (
                        <label
                          key={option.id}
                          className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                        >
                          <input
                            type="radio"
                            name="deliveryMethod"
                            value={option.id}
                            checked={formData.delivery.method === option.id}
                            onChange={(e) =>
                              updateFormData(
                                "delivery",
                                "method",
                                e.target.value
                              )
                            }
                            className="text-green-500 focus:ring-green-500"
                          />
                          <div className="ml-3 flex-1">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-medium text-gray-900">
                                  {option.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {option.time}
                                </p>
                              </div>
                              <p className="font-semibold text-gray-900">
                                {option.price === 0
                                  ? "Free"
                                  : `$${option.price.toFixed(2)}`}
                              </p>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Delivery Instructions (Optional)
                    </label>
                    <textarea
                      name="instructions"
                      value={formData.delivery.instructions}
                      onChange={(e) =>
                        updateFormData(
                          "delivery",
                          "instructions",
                          e.target.value
                        )
                      }
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      placeholder="Any special delivery instructions..."
                    ></textarea>
                  </div>
                </div>
              )}

              {/* Step 2: Billing Information */}
              {currentStep === 2 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-roboto">
                    <i className="fas fa-credit-card mr-2 text-green-500"></i>
                    Billing Information
                  </h2>

                  <div className="mb-6">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={formData.billing.sameAsShipping}
                        onChange={(e) =>
                          updateFormData(
                            "billing",
                            "sameAsShipping",
                            e.target.checked
                          )
                        }
                        className="text-green-500 focus:ring-green-500 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        Billing address is the same as shipping address
                      </span>
                    </label>
                  </div>

                  {!formData.billing.sameAsShipping && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          First Name *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.billing.firstName}
                          onChange={(e) =>
                            updateFormData(
                              "billing",
                              "firstName",
                              e.target.value
                            )
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors["billing.firstName"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter first name"
                        />
                        {errors["billing.firstName"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["billing.firstName"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.billing.lastName}
                          onChange={(e) =>
                            updateFormData(
                              "billing",
                              "lastName",
                              e.target.value
                            )
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors["billing.lastName"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter last name"
                        />
                        {errors["billing.lastName"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["billing.lastName"]}
                          </p>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          name="address"
                          value={formData.billing.address}
                          onChange={(e) =>
                            updateFormData("billing", "address", e.target.value)
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors["billing.address"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter street address"
                        />
                        {errors["billing.address"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["billing.address"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          value={formData.billing.city}
                          onChange={(e) =>
                            updateFormData("billing", "city", e.target.value)
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors["billing.city"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter city"
                        />
                        {errors["billing.city"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["billing.city"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State *
                        </label>
                        <select
                          name="state"
                          value={formData.billing.state}
                          onChange={(e) =>
                            updateFormData("billing", "state", e.target.value)
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors["billing.state"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                        >
                          <option value="">Select State</option>
                          <option value="CA">California</option>
                          <option value="NY">New York</option>
                          <option value="TX">Texas</option>
                          <option value="FL">Florida</option>
                          <option value="IL">Illinois</option>
                        </select>
                        {errors["billing.state"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["billing.state"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          ZIP Code *
                        </label>
                        <input
                          type="text"
                          name="zipCode"
                          value={formData.billing.zipCode}
                          onChange={(e) =>
                            updateFormData("billing", "zipCode", e.target.value)
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors["billing.zipCode"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter ZIP code"
                        />
                        {errors["billing.zipCode"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["billing.zipCode"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country *
                        </label>
                        <select
                          name="country"
                          value={formData.billing.country}
                          onChange={(e) =>
                            updateFormData("billing", "country", e.target.value)
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        >
                          <option value="United States">United States</option>
                          <option value="Canada">Canada</option>
                          <option value="Mexico">Mexico</option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Payment Information */}
              {currentStep === 3 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-roboto">
                    <i className="fas fa-lock mr-2 text-green-500"></i>
                    Payment Information
                  </h2>

                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Payment Method
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.payment.method === "credit-card"}
                          onChange={(e) =>
                            updateFormData("payment", "method", e.target.value)
                          }
                          className="text-green-500 focus:ring-green-500"
                        />
                        <div className="ml-3 flex items-center">
                          <i className="fas fa-credit-card text-xl text-gray-600 mr-3"></i>
                          <span className="font-medium">Credit/Debit Card</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.payment.method === "paypal"}
                          onChange={(e) =>
                            updateFormData("payment", "method", e.target.value)
                          }
                          className="text-green-500 focus:ring-green-500"
                        />
                        <div className="ml-3 flex items-center">
                          <i className="fab fa-paypal text-xl text-blue-600 mr-3"></i>
                          <span className="font-medium">PayPal</span>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="apple-pay"
                          checked={formData.payment.method === "apple-pay"}
                          onChange={(e) =>
                            updateFormData("payment", "method", e.target.value)
                          }
                          className="text-green-500 focus:ring-green-500"
                        />
                        <div className="ml-3 flex items-center">
                          <i className="fab fa-apple text-xl text-gray-800 mr-3"></i>
                          <span className="font-medium">Apple Pay</span>
                        </div>
                      </label>
                    </div>
                  </div>

                  {/* Credit Card Form */}
                  {formData.payment.method === "credit-card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Cardholder Name *
                        </label>
                        <input
                          type="text"
                          name="cardName"
                          value={formData.payment.cardName}
                          onChange={(e) =>
                            updateFormData(
                              "payment",
                              "cardName",
                              e.target.value
                            )
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors["payment.cardName"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter cardholder name"
                        />
                        {errors["payment.cardName"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["payment.cardName"]}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Card Number *
                        </label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.payment.cardNumber}
                          onChange={(e) =>
                            updateFormData(
                              "payment",
                              "cardNumber",
                              formatCardNumber(e.target.value)
                            )
                          }
                          className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                            errors["payment.cardNumber"]
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                        />
                        {errors["payment.cardNumber"] && (
                          <p className="text-red-500 text-xs mt-1">
                            {errors["payment.cardNumber"]}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Expiry Date *
                          </label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={formData.payment.expiryDate}
                            onChange={(e) =>
                              updateFormData(
                                "payment",
                                "expiryDate",
                                formatExpiryDate(e.target.value)
                              )
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                              errors["payment.expiryDate"]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="MM/YY"
                            maxLength="5"
                          />
                          {errors["payment.expiryDate"] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors["payment.expiryDate"]}
                            </p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            CVV *
                          </label>
                          <input
                            type="text"
                            name="cvv"
                            value={formData.payment.cvv}
                            onChange={(e) =>
                              updateFormData(
                                "payment",
                                "cvv",
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                              errors["payment.cvv"]
                                ? "border-red-500"
                                : "border-gray-300"
                            }`}
                            placeholder="123"
                            maxLength="4"
                          />
                          {errors["payment.cvv"] && (
                            <p className="text-red-500 text-xs mt-1">
                              {errors["payment.cvv"]}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PayPal Form */}
                  {formData.payment.method === "paypal" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PayPal Email *
                      </label>
                      <input
                        type="email"
                        name="paypalEmail"
                        value={formData.payment.paypalEmail}
                        onChange={(e) =>
                          updateFormData(
                            "payment",
                            "paypalEmail",
                            e.target.value
                          )
                        }
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
                          errors["payment.paypalEmail"]
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Enter PayPal email"
                      />
                      {errors["payment.paypalEmail"] && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors["payment.paypalEmail"]}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Apple Pay */}
                  {formData.payment.method === "apple-pay" && (
                    <div className="text-center py-8">
                      <i className="fab fa-apple text-6xl text-gray-800 mb-4"></i>
                      <p className="text-gray-600 mb-4">
                        Touch ID or Face ID will be used to complete your
                        purchase
                      </p>
                      <button className="bg-black text-white px-8 py-3 rounded-lg font-semibold">
                        Pay with Apple Pay
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Review Order */}
              {currentStep === 4 && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6 font-roboto">
                    <i className="fas fa-check-circle mr-2 text-green-500"></i>
                    Review Your Order
                  </h2>

                  {/* Order Items */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Order Items
                    </h3>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center p-4 bg-gray-50 rounded-lg"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg mr-4"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-600">
                              Quantity: {item.quantity}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-gray-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </p>
                            <p className="text-sm text-gray-600">
                              ${item.price.toFixed(2)} each
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shipping Information Summary */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Shipping Information
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium">
                        {formData.shipping.firstName}{" "}
                        {formData.shipping.lastName}
                      </p>
                      <p className="text-gray-600">
                        {formData.shipping.address}
                      </p>
                      <p className="text-gray-600">
                        {formData.shipping.city}, {formData.shipping.state}{" "}
                        {formData.shipping.zipCode}
                      </p>
                      <p className="text-gray-600">
                        {formData.shipping.country}
                      </p>
                      <p className="text-gray-600 mt-2">
                        <i className="fas fa-phone mr-1"></i>
                        {formData.shipping.phone}
                      </p>
                      <p className="text-gray-600">
                        <i className="fas fa-envelope mr-1"></i>
                        {formData.shipping.email}
                      </p>
                    </div>
                  </div>

                  {/* Payment Method Summary */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Payment Method
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      {formData.payment.method === "credit-card" && (
                        <div className="flex items-center">
                          <i className="fas fa-credit-card text-xl text-gray-600 mr-3"></i>
                          <div>
                            <p className="font-medium">Credit Card</p>
                            <p className="text-gray-600">
                              **** **** ****{" "}
                              {formData.payment.cardNumber.slice(-4)}
                            </p>
                          </div>
                        </div>
                      )}
                      {formData.payment.method === "paypal" && (
                        <div className="flex items-center">
                          <i className="fab fa-paypal text-xl text-blue-600 mr-3"></i>
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-gray-600">
                              {formData.payment.paypalEmail}
                            </p>
                          </div>
                        </div>
                      )}
                      {formData.payment.method === "apple-pay" && (
                        <div className="flex items-center">
                          <i className="fab fa-apple text-xl text-gray-800 mr-3"></i>
                          <div>
                            <p className="font-medium">Apple Pay</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Delivery Summary */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Delivery
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{selectedDelivery.name}</p>
                          <p className="text-gray-600">
                            {selectedDelivery.time}
                          </p>
                        </div>
                        <p className="font-semibold">
                          {selectedDelivery.price === 0
                            ? "Free"
                            : `$${selectedDelivery.price.toFixed(2)}`}
                        </p>
                      </div>
                      {formData.delivery.instructions && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-sm text-gray-600">
                            <strong>Instructions:</strong>{" "}
                            {formData.delivery.instructions}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {errors.general && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600">{errors.general}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t">
                {currentStep > 1 && (
                  <button
                    onClick={prevStep}
                    className="flex items-center px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <i className="fas fa-arrow-left mr-2"></i>
                    Back
                  </button>
                )}

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors ml-auto"
                  >
                    Continue
                    <i className="fas fa-arrow-right ml-2"></i>
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isProcessing}
                    className="flex items-center px-8 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ml-auto"
                  >
                    {isProcessing ? (
                      <>
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-lock mr-2"></i>
                        Place Order
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>

              {/* Cart Items */}
              <div className="space-y-3 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg mr-3"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {item.name}
                      </p>
                      <p className="text-xs text-gray-600">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Order Totals */}
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium">
                    {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-2">
                  <span>Total</span>
                  <span className="text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center text-green-700">
                  <i className="fas fa-shield-alt mr-2"></i>
                  <span className="text-sm font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-600 mt-1">
                  Your payment information is encrypted and secure
                </p>
              </div>

              {/* Accepted Payment Methods */}
              <div className="mt-4">
                <p className="text-xs text-gray-600 mb-2">We accept:</p>
                <div className="flex space-x-2">
                  <i className="fab fa-cc-visa text-2xl text-blue-600"></i>
                  <i className="fab fa-cc-mastercard text-2xl text-red-500"></i>
                  <i className="fab fa-cc-amex text-2xl text-blue-500"></i>
                  <i className="fab fa-paypal text-2xl text-blue-600"></i>
                  <i className="fab fa-apple-pay text-2xl text-gray-800"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;