"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

function MainComponent() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [cartItems, setCartItems] = React.useState([]);
  const [showMobileMenu, setShowMobileMenu] = React.useState(false);

  const categories = [
    { id: "all", name: "All Categories", count: 0 },
    {
      id: "baby-care",
      name: "Baby Care",
      count: 17,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
    },
    {
      id: "cleaning",
      name: "Cleaning & Household",
      count: 25,
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=200&fit=crop",
    },
    {
      id: "fruits",
      name: "Fruits",
      count: 16,
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=200&fit=crop",
    },
    {
      id: "beverages",
      name: "Beverages",
      count: 17,
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=200&fit=crop",
    },
    {
      id: "oil-spices",
      name: "Oil & Spices",
      count: 19,
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=200&fit=crop",
    },
    {
      id: "personal-care",
      name: "Personal Care",
      count: 15,
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=200&fit=crop",
    },
    {
      id: "rice-grains",
      name: "Rice & Grains",
      count: 18,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=200&fit=crop",
    },
    {
      id: "snacks",
      name: "Snacks & Food",
      count: 12,
      image:
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=200&fit=crop",
    },
    {
      id: "staple-food",
      name: "Staple Food",
      count: 10,
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=200&fit=crop",
    },
    {
      id: "fruit-juice",
      name: "Fruit Juice",
      count: 8,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&h=200&fit=crop",
    },
  ];

  const products = [
    {
      id: 1,
      name: "HTC Touch HD",
      price: 122.0,
      originalPrice: 150.0,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      category: "rice-grains",
      discount: 19,
    },
    {
      id: 2,
      name: "Palm Tree Pro",
      price: 237.99,
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
      category: "oil-spices",
    },
    {
      id: 3,
      name: "Canon EOS 5D",
      price: 899.0,
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=300&h=300&fit=crop",
      category: "fruits",
    },
    {
      id: 4,
      name: "Nikon D300",
      price: 1299.0,
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop",
      category: "beverages",
    },
    {
      id: 5,
      name: "iPod Touch",
      price: 122.0,
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop",
      category: "cleaning",
    },
    {
      id: 6,
      name: "Samsung SyncMaster",
      price: 242.0,
      image:
        "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop",
      category: "baby-care",
    },
    {
      id: 7,
      name: "iPod Shuffle",
      price: 122.0,
      image:
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=300&fit=crop",
      category: "snacks",
    },
    {
      id: 8,
      name: "iPhone",
      price: 104.0,
      originalPrice: 123.2,
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
      category: "personal-care",
      discount: 15,
    },
    {
      id: 9,
      name: "iPod Classic",
      price: 720.8,
      originalPrice: 1082.0,
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
      category: "staple-food",
      discount: 33,
    },
    {
      id: 10,
      name: "Fresh Orange Juice",
      price: 45.5,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&h=300&fit=crop",
      category: "fruit-juice",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const getQuantity = (productId) => {
    const item = cartItems.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
    } else {
      setCartItems((prev) => {
        const existing = prev.find((item) => item.id === productId);
        if (existing) {
          return prev.map((item) =>
            item.id === productId ? { ...item, quantity: newQuantity } : item
          );
        } else {
          const product = products.find((p) => p.id === productId);
          return [...prev, { ...product, quantity: newQuantity }];
        }
      });
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <i className="fas fa-bars text-xl"></i>
            </button>

            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-lg mr-3">
                <i className="fas fa-shopping-cart text-white text-xl" ></i>
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

            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <button className="bg-green-500 text-white px-6 py-2 rounded-r-lg hover:bg-green-600 transition-colors">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors" onClick={()=>{navigate("/cart")}}>
                  <i className="fas fa-shopping-cart"></i>
                  <span className="hidden sm:inline">My cart</span>
                  <span className="font-semibold">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </button>
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                    {getTotalItems()}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button className="absolute right-0 top-0 bg-green-500 text-white px-4 py-2 rounded-r-lg">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600 font-roboto">
              <i className="fas fa-list mr-2"></i>
              TOP CATEGORIES
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedCategory === category.id
                      ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                    {category.count > 0 && (
                      <span className="text-sm text-gray-500">
                        ({category.count})
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {searchTerm && (
        <div className="md:hidden bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-green-600 font-roboto">
                Search Results
              </h3>
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </span>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.slice(0, 6).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 object-cover"
                      />
                      {product.discount && (
                        <span className="absolute top-1 left-1 bg-green-500 text-white px-1 py-0.5 rounded text-xs font-semibold">
                          {product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-3">
                      <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-sm font-bold text-green-600">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-gray-500 line-through ml-1">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-green-500 text-white py-1.5 rounded text-sm hover:bg-green-600 transition-colors"
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <i className="fas fa-search text-2xl text-gray-400 mb-2"></i>
                <p className="text-gray-500 text-sm">
                  No products found for "{searchTerm}"
                </p>
              </div>
            )}

            {filteredProducts.length > 6 && (
              <div className="mt-4 text-center">
                <button
                  onClick={() => setSearchTerm("")}
                  className="text-green-600 text-sm font-medium"
                >
                  View all {filteredProducts.length} results below
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-green-100 to-green-200 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop"
                alt="Healthy Choice Product"
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-green-600 mb-2 font-roboto">
                Grocery just $5
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                One Day Delivery
              </h3>
              <p className="text-gray-600 mb-6">Get Up to 30% OFF</p>
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors">
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="hidden lg:block lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600 font-roboto">
                <i className="fas fa-list mr-2"></i>
                TOP CATEGORIES
              </h3>
              <div className="space-y-3">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryClick(category.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      selectedCategory === category.id
                        ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
                      {category.count > 0 && (
                        <span className="text-sm text-gray-500">
                          ({category.count})
                        </span>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            {!searchTerm && (
              <div className="lg:hidden mb-8">
                <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600 font-roboto">
                  <i className="fas fa-th-large mr-2"></i>
                  TOP CATEGORIES
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {categories.slice(1, 9).map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryClick(category.id)}
                      className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                    >
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-24 object-cover"
                      />
                      <div className="p-3">
                        <h4 className="font-medium text-sm text-gray-800">
                          {category.name}
                        </h4>
                        <p className="text-xs text-gray-500">
                          ({category.count})
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center text-green-600 font-roboto">
                  <i className="fas fa-plus mr-2"></i>
                  ALL PRODUCTS
                </h3>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    Showing {filteredProducts.length} products
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 sm:h-48 object-cover"
                      />
                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Save {product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-green-600">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-center justify-center">
                          <div className="flex items-center border border-gray-300 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  getQuantity(product.id) - 1
                                )
                              }
                              className="px-2 sm:px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <i className="fas fa-minus text-xs"></i>
                            </button>
                            <span className="px-3 sm:px-4 py-2 font-semibold min-w-[2.5rem] text-center text-sm">
                              {getQuantity(product.id)}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  product.id,
                                  getQuantity(product.id) + 1
                                )
                              }
                              className="px-2 sm:px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                            >
                              <i className="fas fa-plus text-xs"></i>
                            </button>
                          </div>
                        </div>

                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 text-sm sm:text-base"
                        >
                          <i className="fas fa-cart-plus"></i>
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-12">
                  <i className="fas fa-search text-4xl text-gray-400 mb-4"></i>
                  <h3 className="text-lg font-semibold text-gray-600 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or category filter
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-6 text-white">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop"
                    alt="Promotion"
                    className="w-16 h-16 rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Get Up to 30% OFF</h4>
                    <p className="text-sm opacity-90">On selected items</p>
                  </div>
                </div>
                <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  SHOP NOW
                </button>
              </div>

              <div className="bg-gradient-to-r from-red-400 to-red-500 rounded-lg p-6 text-white">
                <div className="flex items-center mb-4">
                  <img
                    src="https://images.unsplash.com/photo-1613478223719-2ab802602423?w=100&h=100&fit=crop"
                    alt="Promotion"
                    className="w-16 h-16 rounded-lg mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">Fresh Deals Daily</h4>
                    <p className="text-sm opacity-90">Best prices guaranteed</p>
                  </div>
                </div>
                <button className="bg-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  SHOP NOW
                </button>
              </div>
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold flex items-center text-green-600 font-roboto">
                  <i className="fas fa-star mr-2"></i>
                  FEATURED PRODUCTS
                </h3>
                <span className="text-sm text-gray-600">10 products</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {products.slice(0, 10).map((product) => (
                  <div
                    key={product.id}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-32 sm:h-40 object-cover"
                      />
                      {product.discount && (
                        <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                          Save {product.discount}%
                        </span>
                      )}
                    </div>
                    <div className="p-3 sm:p-4">
                      <h4 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                        {product.name}
                      </h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-base sm:text-lg font-bold text-green-600">
                            ${product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs sm:text-sm text-gray-500 line-through ml-2">
                              ${product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500">
                          <i className="fas fa-eye mr-1"></i>
                          View
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>
                  <i className="fas fa-phone mr-2"></i> +1 234 567 8900
                </p>
                <p>
                  <i className="fas fa-envelope mr-2"></i> info@grocery.com
                </p>
                <p>
                  <i className="fas fa-map-marker-alt mr-2"></i> 123 Main St,
                  City
                </p>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Information</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Delivery Information
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">My Account</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>
                  <a href="#" className="hover:text-white">
                    My Account
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Order History
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Wish List
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Newsletter
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Newsletter</h3>
              <p className="text-sm text-gray-300 mb-4">
                Sign up for our newsletter
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-3 py-2 bg-gray-700 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <button className="bg-green-500 px-4 py-2 rounded-r-lg hover:bg-green-600 transition-colors">
                  <i className="fas fa-paper-plane"></i>
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 Grocery Store. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainComponent;
