import React, { useState, useEffect } from 'react';

const categories = {
  'rice-daal': { unit: 'kg', fields: ['weight', 'pricePerKg'] },
  'oil-ghee': { unit: 'kg', fields: ['weight', 'pricePerKg'] },
  'sweets': { unit: 'kg', fields: ['weight', 'pricePerKg'] },
  'spices': { unit: 'g', fields: ['weight', 'pricePer100g'] },
  'cakes': { unit: 'piece', fields: ['quantity', 'pricePerPiece'] },
  'kurkure-chips': { unit: 'packet', fields: ['sizes'] },
  'biscuits': { unit: 'packet', fields: ['sizes'] },
  'munch': { unit: 'packet', fields: ['sizes'] },
  'personal-care': { unit: 'unit', fields: ['sizes'] },
  'household-cleaning': { unit: 'unit', fields: ['sizes'] },
  'beverages': { unit: 'ml', fields: ['volume', 'price'] },
  'dry-fruits': { unit: 'g', fields: ['weight', 'pricePer100g'] }
};

const ProductList = () => {
  const [category, setCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchProducts = async (selectedCategory) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`https://grocery-backend-2-vza1.onrender.com/api/products/${encodeURIComponent(selectedCategory)}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await response.json();
      if (response.ok) {
        setProducts(data.products);
      } else {
        setError(data.message || 'Failed to fetch products.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Error connecting to the server. Please check if the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    if (selectedCategory) {
      fetchProducts(selectedCategory);
    } else {
      setProducts([]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">View Products by Category</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <p className="text-blue-500 mb-4">Loading...</p>}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Select Category</label>
        <select
          value={category}
          onChange={handleCategoryChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">Select Category</option>
          {Object.keys(categories).map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>
      {products.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold mb-2">Products in {category}</h2>
          <ul className="space-y-4">
            {products.map((product) => (
              <li key={product._id} className="border p-4 rounded-md">
                <h3 className="text-lg font-medium">{product.productName}</h3>
                {product.imageUrl && (
                  <img src={product.imageUrl} alt={product.productName} className="w-32 h-32 object-cover mt-2" />
                )}
                {product.attributes && Object.keys(product.attributes).length > 0 && (
                  <p>
                    {Object.entries(product.attributes).map(([key, value]) => (
                      <span key={key}>
                        {key === 'weight' ? `Weight: ${value} ${categories[category].unit}` :
                         key === 'volume' ? `Volume: ${value} ${categories[category].unit}` :
                         key === 'quantity' ? `Quantity: ${value} ${categories[category].unit}` :
                         key === 'pricePerKg' ? `Price: ₹${value}/kg` :
                         key === 'pricePer100g' ? `Price: ₹${value}/100g` :
                         `Price: ₹${value}/piece`}
                      </span>
                    )).reduce((prev, curr) => [prev, ', ', curr])}
                  </p>
                )}
                {product.sizes && product.sizes.length > 0 && (
                  <p>
                    Sizes: {product.sizes.map((s) => `${s.size} (₹${s.price})`).join(', ')}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductList;