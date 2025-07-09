"use client";
import React from "react";
import { useNavigate } from "react-router-dom";

function CategoryProduct() {
    const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("fruits");
  const [cartItems, setCartItems] = React.useState([]);
  const [quantities, setQuantities] = React.useState({});

  const categories = [
    { id: "all", name: "All Categories" },
    { id: "cadboury", name: "Cadeboury" },
    { id: "cleaning", name: "Bathroom Cleaning" },
    { id: "detergents", name: "Surf" },
    { id: "biscuits", name: "Biscuits & Snacks" },
    { id: "cake", name: "Cakes" },
    { id: "personal-care", name: "Personal Care" },
    { id: "rice-grains", name: "Rice & Grains" },
    { id: "snacks", name: "Snacks & Food" },
    { id: "staple-food", name: "Staple Food" },
    { id: "fruit-juice", name: "Fruit Juice" },
  ];

  const products = [
    {
      id: 1,
      name: "Fresh Red Apples",
      price: 4.99,
      originalPrice: 6.99,
      image:
        "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop",
      category: "detergents",
      discount: 29,
      inStock: true,
    },
    {
      id: 2,
      name: "Organic Bananas",
      price: 2.49,
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop",
      category: "detergents",
      inStock: true,
    },
    {
      id: 3,
      name: "Fresh Orange Juice",
      price: 3.99,
      originalPrice: 4.99,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&h=300&fit=crop",
      category: "fruit-juice",
      discount: 20,
      inStock: true,
    },
    {
      id: 4,
      name: "Coconut Water",
      price: 2.99,
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?w=300&h=300&fit=crop",
      category: "biscuits",
      inStock: true,
    },
    {
      id: 5,
      name: "Baby Diapers Pack",
      price: 24.99,
      originalPrice: 29.99,
      image:
        "https://i5.walmartimages.com/asr/f290d65c-2f3e-41e4-98ce-ea79f7510b6f_1.720928529c4dd3d0b5d058ec2fa08605.jpeg",
      category: "cadboury",
      discount: 17,
      inStock: true,
    },
    {
      id: 6,
      name: "All-Purpose Cleaner",
      price: 5.99,
      image:
        "https://images.unsplash.com/photo-1563453392212-326f5e854473?w=300&h=300&fit=crop",
      category: "cleaning",
      inStock: true,
    },
    {
      id: 7,
      name: "Olive Oil Premium",
      price: 12.99,
      originalPrice: 15.99,
      image:
        "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=300&h=300&fit=crop",
      category: "cake",
      discount: 19,
      inStock: true,
    },
    {
      id: 8,
      name: "Basmati Rice 5kg",
      price: 18.99,
      image:
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
      category: "rice-grains",
      inStock: true,
    },
    {
      id: 9,
      name: "Mixed Nuts Snack",
      price: 8.99,
      originalPrice: 10.99,
      image:
        "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=300&h=300&fit=crop",
      category: "snacks",
      discount: 18,
      inStock: true,
    },
    {
      id: 10,
      name: "Whole Wheat Flour",
      price: 6.99,
      image:
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=300&h=300&fit=crop",
      category: "staple-food",
      inStock: true,
    },
    {
      id: 11,
      name: "Fresh Strawberries",
      price: 5.99,
      image:
        "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?w=300&h=300&fit=crop",
      category: "detergents",
      inStock: true,
    },
    {
      id: 12,
      name: "Green Grapes",
      price: 4.49,
      originalPrice: 5.99,
      image:
        "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=300&h=300&fit=crop",
      category: "fruits",
      discount: 25,
      inStock: true,
    },
    {
      id: 13,
      name: "Shampoo & Conditioner",
      price: 15.99,
      image:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=300&h=300&fit=crop",
      category: "personal-care",
      inStock: true,
    },
    {
      id: 14,
      name: "Apple Juice 1L",
      price: 3.49,
      image:
        "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=300&h=300&fit=crop",
      category: "fruit-juice",
      inStock: true,
    },
    {
      id: 15,
      name: "Energy Drink Pack",
      price: 12.99,
      originalPrice: 16.99,
      image:
        "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?w=300&h=300&fit=crop",
      category: "biscuits",
      discount: 24,
      inStock: true,
    },
    {
      id: 16,
      name: "Baby Formula",
      price: 32.99,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop",
      category: "cadboury",
      inStock: true,
    },
  ];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getQuantity = (productId) => {
    return quantities[productId] || 1;
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      setQuantities((prev) => ({
        ...prev,
        [productId]: newQuantity,
      }));
    }
  };

  const addToCart = (product) => {
    const quantity = getQuantity(product.id);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
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

  const getCurrentCategoryName = () => {
    const category = categories.find((cat) => cat.id === selectedCategory);
    return category ? category.name : "All Categories";
  };

  const AdBanner = ({ type, className = "" }) => {
    if (type === "horizontal") {
      return (
        <div
          className={`bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-6 text-white ${className}`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Special Offer!</h3>
              <p className="text-sm opacity-90">
                Get up to 40% OFF on selected items
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <img
                src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=100&h=100&fit=crop"
                alt="Special offer product"
                className="w-16 h-16 rounded-lg"
              />
              <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div
        className={`bg-gradient-to-b from-red-400 to-red-500 rounded-lg p-6 text-white text-center ${className}`}
      >
        <div className="mb-4">
          <img
            src="https://images.unsplash.com/photo-1613478223719-2ab802602423?w=120&h=120&fit=crop"
            alt="Featured product"
            className="w-20 h-20 rounded-lg mx-auto mb-3"
          />
          <h4 className="font-bold text-lg mb-2">Fresh Daily</h4>
          <p className="text-sm opacity-90 mb-4">Best prices guaranteed</p>
          <button className="bg-white text-red-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-sm">
            Explore
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-green-500 p-2 rounded-lg mr-3" onClick={()=>{navigate("/cart")}}>
                <i className="fas fa-shopping-cart text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-roboto">
                  Grocery
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Category Products
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors" onClick={()=>{navigate("/cart")}}>
                  <i className="fas fa-shopping-cart"></i>
                  <span className="hidden sm:inline">Cart</span>
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
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 font-roboto">
                {getCurrentCategoryName()}
              </h2>
              <p className="text-gray-600 mt-1">
                {filteredProducts.length} products available
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <i className="fas fa-search absolute right-3 top-3 text-gray-400"></i>
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <AdBanner type="horizontal" className="mb-8" />

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product.id}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 sm:h-48 lg:h-52 object-cover"
                  />
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                      Save {product.discount}%
                    </span>
                  )}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-3 lg:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="text-lg lg:text-xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              getQuantity(product.id) - 1
                            )
                          }
                          className="px-2 lg:px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          disabled={!product.inStock}
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="px-3 lg:px-4 py-2 font-semibold min-w-[2.5rem] text-center text-sm">
                          {getQuantity(product.id)}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              product.id,
                              getQuantity(product.id) + 1
                            )
                          }
                          className="px-2 lg:px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                          disabled={!product.inStock}
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => addToCart(product)}
                      disabled={!product.inStock}
                      className="w-full bg-green-500 text-white py-2 lg:py-2.5 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
                    >
                      <i className="fas fa-cart-plus text-sm"></i>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>

              {(index + 1) % 8 === 0 && index < filteredProducts.length - 1 && (
                <div className="col-span-2 lg:col-span-4">
                  <AdBanner type="horizontal" />
                </div>
              )}

              {(index + 1) % 12 === 0 &&
                index < filteredProducts.length - 1 && (
                  <div className="col-span-1 lg:col-span-2">
                    <AdBanner type="vertical" />
                  </div>
                )}
            </React.Fragment>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No products found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? `No products match "${searchTerm}" in ${getCurrentCategoryName()}`
                : `No products available in ${getCurrentCategoryName()}`}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("all");
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop"
                alt="Free delivery"
                className="w-16 h-16 rounded-lg mr-4"
              />
              <div>
                <h4 className="font-semibold text-lg">Free Delivery</h4>
                <p className="text-sm opacity-90">On orders over $50</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>

          <div className="bg-gradient-to-r from-purple-400 to-purple-500 rounded-lg p-6 text-white">
            <div className="flex items-center mb-4">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=80&h=80&fit=crop"
                alt="Quality guarantee"
                className="w-16 h-16 rounded-lg mr-4"
              />
              <div>
                <h4 className="font-semibold text-lg">Quality Guarantee</h4>
                <p className="text-sm opacity-90">100% fresh products</p>
              </div>
            </div>
            <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Our Promise
            </button>
          </div>
        </div>
      </div>

      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-green-500 p-2 rounded-lg mr-3">
                <i className="fas fa-shopping-cart text-white text-xl"></i>
              </div>
              <h3 className="text-xl font-bold font-roboto">Grocery Store</h3>
            </div>
            <p className="text-gray-400 text-sm">
              &copy; 2025 Grocery Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CategoryProduct;