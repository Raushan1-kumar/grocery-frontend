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
    {
      id: "rice-daal",
      name: "Grains",
      image:
        "https://plus.unsplash.com/premium_photo-1726750862897-4b75116bca34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmljZSUyQ3B1bHNlcyUyQ3doZWF0fGVufDB8fDB8fHww",
    },
    {
      id: "oil-ghee",
      name: "Oil/Ghee",
      image:
        "https://media.istockphoto.com/id/1283712032/photo/cardboard-box-filled-with-non-perishable-foods-on-wooden-table-high-angle-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=OHIR-Nh42EGgXtvCk_tybX-2gM87icPgkuRkQJgNN1g=",
    },
    {
      id: "sweets",
      name: "Sweets",
      image:
        "https://th.bing.com/th?q=Indian+Food+Gulab+Jamun&w=120&h=120&c=1&rs=1&qlt=70&o=7&cb=1&dpr=1.3&pid=InlineBlock&rm=3&mkt=en-IN&cc=IN&setlang=en&adlt=moderate&t=1&mw=247",
    },
    {
      id: "spices",
      name: "Spices",
      image:
        "https://images.unsplash.com/photo-1716816211590-c15a328a5ff0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNwaWNlc3xlbnwwfHwwfHx8MA%3D%3D",
    },
    {
      id: "cakes",
      name: "Cakes",
      image:
        "https://th.bing.com/th/id/OIP.FA95UC2C9kBg6edUVLID4wHaFQ?w=182&h=129&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      id: "kurkure-chips",
      name: "Kurkure/Chips",
      image:
        "https://th.bing.com/th/id/OIP.KtaRjHnlMY9I77zpiS170wHaHa?w=191&h=191&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      id: "biscuits",
      name: "Biscuits",
      image:
        "https://5.imimg.com/data5/PI/KI/GLADMIN-68287049/new-good-day-cashew-biscuits-500x500.png",
    },
    {
      id: "munch",
      name: "Munch",
      image:
        "https://th.bing.com/th/id/OIP.ZGaMWgy3nleEg5CxhKkpAwHaEK?w=276&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
    },
    {
      id: "personal-care",
      name: "Personal Care",
      image:
        "https://images.unsplash.com/photo-1666028095907-15814bd435cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGZhY2V3YXNoZXN8ZW58MHx8MHx8fDA%3D",
    },
    {
      id: "household-cleaning",
      name: "Household/Cleaning",
      image:
        "https://media.istockphoto.com/id/510693044/photo/house-cleaning-product-on-wood-table.webp?a=1&b=1&s=612x612&w=0&k=20&c=Dgz3K3T6OSNxS2ciy7Voo8ASkkHyEzWYKQy1qUfu14w=",
    },
    {
      id: "beverages",
      name: "Beverages",
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=300&h=200&fit=crop",
    },
    {
      id: "dry-fruits",
      name: "Dry Fruits",
      image:
        "https://plus.unsplash.com/premium_photo-1668677227454-213252229b73?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRyeSUyMGZydWl0c3xlbnwwfHwwfHx8MA%3D%3D",
    },
  ];

  const handleCategoryClick = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl gap-2 justify-center flex flex-row bg-green-300  p-1 sm:p-6 lg :p-8" >
        <div className="h-full w-[47%] text-white bg-red-500  flex justify-center font-bold rounded-lg shadow-md p-2"
          onClick={() => navigate("/category/rice-daal")}>
          GROCERY
        </div>
        <div className="h-full w-[47%] flex font-bold justify-center text-red-600 bg-white rounded-lg shadow-md p-2 items-center"
          onClick={() => navigate("/category/sweets")}>
          SWEETS
        </div>
      </div>
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="bg-green-500 text-white font-bold p-2 rounded-lg mr-1">
                <h1>
                  Aman
                </h1>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900 font-roboto">
                  Enterprises
                </h1>
                <p className="text-xs text-gray-500 hidden sm:block">
                  Click Shopping Hub
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative flex flex-row">
                <button
                  className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                  onClick={() => {
                    navigate("/cart");
                  }}
                >
                  <i className="fas fa-shopping-cart"></i>
                </button>
              </div>
              <div className="w-10 h-10  rounded-full bg-gray-500 flex items-center justify-center cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                <i className="fas fa-user text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="md:hidden bg-white border-b shadow-sm">
          <div className="max-w-10xl mx-auto px-4 py-4">
            <h3 className="text-lg font-semibold mb-4 flex items-center text-green-600 font-roboto">
              <i className="fas fa-list mr-2"></i>
              TOP CATEGORIES
            </h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleCategoryClick(category.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${selectedCategory === category.id
                    ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                    : "hover:bg-gray-50"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-green-100 to-green-200 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-6 md:mb-0">
              <img
                src="https://plus.unsplash.com/premium_photo-1726750862897-4b75116bca34?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cmljZSUyQ3B1bHNlcyUyQ3doZWF0fGVufDB8fDB8fHww"
                alt="Healthy Choice Product"
                className="w-full max-w-sm mx-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-2xl md:text-4xl font-bold text-green-600 mb-2 font-roboto">
                All Kirana Products
              </h2>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                One Day Delivery
              </h3>
              <p className="text-gray-600 mb-6">Get Up to 30% OFF</p>
              <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
                onClick={() => navigate("/category/rice-daal")}>
                <i className="fas fa-shopping-cart mr-2"></i>
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
                    className={`w-full text-left p-3 rounded-lg transition-colors ${selectedCategory === category.id
                      ? "bg-green-100 text-green-700 border-l-4 border-green-500"
                      : "hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{category.name}</span>
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
                  {categories.map((category) => (
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
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
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
            
              {/* <ul className="space-y-2 text-sm text-gray-300">
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
              </ul> */}
            </div>
            <div>
           
              {/* <ul className="space-y-2 text-sm text-gray-300">
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
              </ul> */}
            </div>
            {/* <div>
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
            </div> */}
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
