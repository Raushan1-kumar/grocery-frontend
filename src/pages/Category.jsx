"use client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

// --- Category and Config ---
const categoryConfig = {
  'rice-daal':          { unit: 'kg',    fields: ['sizes'] },
  'oil-ghee':           { unit: 'kg',    fields: ['sizes'] },
  'sweets':             { unit: 'kg',    fields: ['sizes'] },
  'spices':             { unit: 'g',     fields: ['sizes'] },
  'cakes':              { unit: 'piece', fields: ['sizes'] },
  'kurkure-chips':      { unit: 'packet',fields: ['sizes'] },
  'biscuits':           { unit: 'packet',fields: ['sizes'] },
  'munch':              { unit: 'packet',fields: ['sizes'] },
  'personal-care':      { unit: 'unit',  fields: ['sizes'] },
  'household-cleaning': { unit: 'unit',  fields: ['sizes'] },
  'beverages':          { unit: 'ml',    fields: ['sizes'] },
  'dry-fruits':         { unit: 'g',     fields: ['sizes'] }
};

const categories = [
  { id: "rice-daal", name: "Grains" },
  { id: "oil-ghee", name: "Oil/Ghee" },
  { id: "sweets", name: "Sweets" },
  { id: "spices", name: "Spices" },
  { id: "cakes", name: "Cakes" },
  { id: "kurkure-chips", name: "Kurkure/Chips" },
  { id: "biscuits", name: "Biscuits" },
  { id: "munch", name: "Munch" },
  { id: "personal-care", name: "Personal Care" },
  { id: "household-cleaning", name: "Household/Cleaning" },
  { id: "beverages", name: "Beverages" },
  { id: "dry-fruits", name: "Dry Fruits" }
];

// --- Backend Add To Cart Function ---
async function addToCartBackend({ productId, quantity, size, price, productName, imageUrl }) {
  try {
    const token = localStorage.getItem("user-token");
    
   if (!token) {
      alert("Please log in to add to cart.");
      return;
    }
    const response = await fetch("https://grocery-backend-3fd4.onrender.com/api/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ productId, quantity, size, price, productName, imageUrl })
    });
    const data = await response.json();
  
    if (!response.ok) {
      alert(data.message || "Could not add to cart.");
    }
  } catch (err) {
    alert("Network error: Could not add to cart.");
  }
}

function CategoryProduct() {
  const navigate = useNavigate();
  const { id: currentCategoryId } = useParams(); // Category from URL

  const [searchTerm, setSearchTerm] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [cartItems, setCartItems] = React.useState([]);
  const [quantities, setQuantities] = React.useState({});
  const [selectedSizes, setSelectedSizes] = React.useState({});

  const selectedCategory = currentCategoryId || "all";

  const fetchProducts = async (categoryId) => {
    if (categoryId === "all") {
      setProducts([]);
      return;
    }
    setLoading(true);
    setError("");
    setProducts([]);
    try {
      const res = await fetch(`https://grocery-backend-3fd4.onrender.com/api/products/${encodeURIComponent(categoryId)}`);
      const data = await res.json();
      if (res.ok && data.products && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        setError(data.message || "No products found for this category.");
      }
    } catch (err) {
      setError("Error connecting to the server. Please check if the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  // Filter products for valid name and search
  const filteredProducts = products
    .filter((p) => !!p.productName)
    .filter(p => p.productName.toLowerCase().includes(searchTerm.toLowerCase()));

  // Category selection: JUST update the URL
  const handleCategoryChange = (e) => {
    navigate(`/category/${e.target.value}`);
  };

  // Quantity, size and cart handlers
  const getQuantity = (pid) => quantities[pid] || 1;
  const updateQuantity = (pid, newQ) => {
    if (newQ >= 1) setQuantities((prev) => ({ ...prev, [pid]: newQ }));
  };
  const handleSizeChange = (pid, size) => {
    setSelectedSizes((prev) => ({ ...prev, [pid]: size }));
  };

  const handleProfileClick = () => {
    if(!localStorage.getItem("user-token")) {
      navigate("/login");
      return;
    }
    navigate("/profile");
  };

  // Updated addToCart
  const addToCart = (product) => {
    const token = localStorage.getItem("user-token");

    if (!token) {
      alert("Please log in to add items to your cart.");
      navigate("/login");
      return;
    }
    const quantity = getQuantity(product._id);
    const selectedSize = selectedSizes[product._id];
    const isSizeBased = categoryConfig[product.category]?.fields.includes("sizes");
    let price;

    if (isSizeBased) {
      price = product.sizes?.find(s => s.size === selectedSize)?.price;
    } else {
      if (product.category === "cakes") price = product.attributes?.pricePerPiece;
      else if (product.category === "beverages") price = product.attributes?.price;
      else if (["spices", "dry-fruits"].includes(product.category)) price = product.attributes?.pricePer100g;
      else price = product.attributes?.pricePerKg;
    }

    let cartItem;
    if (isSizeBased) {
      const sizeData = product.sizes?.find((s) => s.size === selectedSize);
      if (!sizeData) {
        setError("Selected size is invalid.");
        return;
      }
      cartItem = {
        id: `${product._id}-${selectedSize}`,
        productName: product.productName,
        category: product.category,
        price: sizeData.price,
        size: selectedSize,
        imageUrl: product.imageUrl,
        quantity
      };
    } else {
      cartItem = {
        id: product._id,
        productName: product.productName,
        category: product.category,
        price,
        unit: product.attributes?.weight ?? product.attributes?.volume ?? product.attributes?.quantity,
        unitType: categoryConfig[product.category]?.unit || 'unit',
        imageUrl: product.imageUrl,
        quantity
      };
    }

    setCartItems((prev) => {
      const existing = prev.find((it) => it.id === cartItem.id);
      if (existing)
        return prev.map((it) =>
          it.id === cartItem.id ? { ...it, quantity: it.quantity + quantity } : it
        );
      else
        return [...prev, cartItem];
    });

    // Persist to backend
    addToCartBackend({
      productId: product._id,
      quantity,
      size: isSizeBased ? selectedSize : undefined,
      price,
      productName: product.productName,
      imageUrl: product.imageUrl
    });
  };

  const getTotalItems = () => cartItems.reduce((sum, it) => sum + it.quantity, 0);
  const getTotalPrice = () => cartItems.reduce((sum, it) => sum + it.price * it.quantity, 0);

  const getCurrentCategoryName = () =>
    categories.find((cat) => cat.id === selectedCategory)?.name || "All Categories";

  const AdBanner = ({ type, className = "" }) => {
    if (type === "horizontal") {
      return (
        <div className={`bg-gradient-to-r from-green-400 to-green-500 rounded-lg p-6 text-white ${className}`}>
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Special Offer!</h3>
              <p className="text-sm opacity-90">Get up to 40% OFF on selected items</p>
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
      <div className={`bg-gradient-to-b from-red-400 to-red-500 rounded-lg p-6 text-white text-center ${className}`}>
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
      {/* Header / Cart / Profile Icon */}
      <div className=" sticky top-0 z-200">
        <div className="max-w-7xl  justify-center gap-2  flex flex-row bg-green-300  p-1 sm:p-6 lg:p-8" >
          <div className="h-full w-[47%] text-white bg-red-500  flex justify-center font-bold rounded-lg shadow-md p-2"
            onClick={() => navigate("/")}>
            GROCERY
          </div>
          <div className="h-full w-[47%] flex font-bold justify-center text-red-600 bg-white rounded-lg shadow-md p-2 items-center"
            onClick={() => navigate("/category/sweets")}>
            SWEETS
          </div>
        </div>
        <header className="bg-white shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                {
                  currentCategoryId ==="sweets" ? (
                    <div
                  className="bg-green-500 text-white font-bold p-2 rounded-lg mr-1 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <h1>Aman</h1>
                </div>):
                (
                <div
                  className="bg-green-500 text-white font-bold p-2 rounded-lg mr-1 cursor-pointer"
                  onClick={() => navigate("/")}
                >
                  <h1>Rambabu
                  </h1>
                </div>
                  )
                }
                
                <div>
                  {
                    currentCategoryId  === "sweets" ? (
                    
                      <h1 className="text-xl font-bold text-gray-900">Misthan</h1>
                    ) : (
                      <h1 className="text-xl font-bold text-gray-900">Enterprises</h1>
                    )
                  }
                  <p className="text-xs text-gray-500 hidden sm:block">Category Products</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative flex flex-row">
                  <button
                    className="flex items-center space-x-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                    onClick={() => navigate("/cart")}
                  >
                    <i className="fas fa-shopping-cart"></i>
                    {/* <span className="hidden sm:inline">Cart</span>
                    <span className="font-semibold">₹{getTotalPrice().toFixed(2)}</span> */}
                  </button>
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-6 w-6 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </div>
                <div className="w-10 h-10  rounded-full bg-gray-500 flex items-center justify-center cursor-pointer"
                  onClick={handleProfileClick}
                >
                  <i className="fas fa-user text-white"></i>
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{getCurrentCategoryName()}</h2>
              <p className="text-gray-600 mt-1">{filteredProducts.length} products available</p>
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
                onChange={handleCategoryChange}
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

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {loading && <p className="text-blue-500 mb-4">Loading...</p>}

        <AdBanner type="horizontal" className="mb-8" />

        {/* Product grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredProducts.map((product, index) => (
            <React.Fragment key={product._id}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={product.imageUrl || 'https://via.placeholder.com/150'}
                    alt={product.productName}
                    className="w-full h-40 sm:h-48 lg:h-52 object-cover"
                  />
                </div>
                <div className="p-3 lg:p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base line-clamp-2">
                    {product.productName}
                  </h3>
                  <div className="mb-3">
                    {categoryConfig[product.category]?.fields.includes('sizes') ? (
                      <div>
                      <select
  value={selectedSizes[product._id] || ''}
  onChange={(e) => handleSizeChange(product._id, e.target.value)}
  className="w-full sm:w-40 px-2 py-1 border border-gray-300 rounded-md text-sm"
>
  <option value="" className="w-10">Select Size</option>
  {product.sizes && product.sizes.length > 0 ? (
    product.sizes.map((size) => (
      <option key={size.size} value={size.size}>
        {size.size} (₹{size.price})
      </option>
    ))
  ) : (
    <option value="" disabled>No sizes available</option>
  )}
</select>
                      </div>
                    ) : (
                      <div>
                        {product.attributes ? (
                          Object.entries(product.attributes).map(([key, value]) => (
                            <span
                              key={key}
                              className="text-sm text-gray-600"
                            >
                              {key === "weight"
                                ? `${value} ${categoryConfig[product.category]?.unit || 'unit'}`
                                : key === "volume"
                                ? `${value} ${categoryConfig[product.category]?.unit || 'unit'}`
                                : key === "quantity"
                                ? `${value} ${categoryConfig[product.category]?.unit || 'unit'}`
                                : key === "pricePerKg"
                                ? `₹${value}/kg`
                                : key === "pricePer100g"
                                ? `₹${value}/100g`
                                : key === "pricePerPiece"
                                ? `₹${value}/piece`
                                : `₹${value}`}
                              {["weight","volume","quantity"].includes(key) ? ', ' : ''}
                            </span>
                          ))
                        ) : (
                          <span className="text-sm text-gray-600">No attributes available</span>
                        )}
                      </div>
                    )}
                  </div>
                  {/* Quantity and Add to cart */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(product._id, getQuantity(product._id) - 1)}
                          className="px-2 lg:px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <i className="fas fa-minus text-xs"></i>
                        </button>
                        <span className="px-3 lg:px-4 py-2 font-semibold min-w-[2.5rem] text-center text-sm">
                          {getQuantity(product._id)}
                        </span>
                        <button
                          onClick={() => updateQuantity(product._id, getQuantity(product._id) + 1)}
                          className="px-2 lg:px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                        >
                          <i className="fas fa-plus text-xs"></i>
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      disabled={
                        categoryConfig[product.category]?.fields.includes('sizes') &&
                        !selectedSizes[product._id]
                      }
                      className="w-full bg-green-500 text-white py-2 lg:py-2.5 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed text-sm lg:text-base"
                    >
                      <i className="fas fa-cart-plus text-sm"></i>
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Ads for spacing at intervals */}
              {(index + 1) % 8 === 0 && index < filteredProducts.length - 1 && (
                <div className="col-span-2 lg:col-span-4">
                  <AdBanner type="horizontal" />
                </div>
              )}
              {(index + 1) % 12 === 0 && index < filteredProducts.length - 1 && (
                <div className="col-span-1 lg:col-span-2">
                  <AdBanner type="vertical" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <i className="fas fa-search text-6xl text-gray-300 mb-4"></i>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? `No products match "${searchTerm}" in ${getCurrentCategoryName()}`
                : `No products available in ${getCurrentCategoryName()}`}
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                navigate("/category/all");
              }}
              className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              View All Products
            </button>
          </div>
        )}
        {/* Feature banner section */}
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
                <p className="text-sm opacity-90">On orders over ₹500</p>
              </div>
            </div>
            <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
         
        </div>
      </div>
      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
             
              <h3 className="text-xl font-bold">Rambabu Enterprises & Aman Misthan</h3>
            </div>
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Grocery Store. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default CategoryProduct;
