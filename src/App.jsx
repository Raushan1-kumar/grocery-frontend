import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainComponent from './pages/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoryProduct from './pages/Category'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductForm from './pages/ProductForm'
import ProductList from './pages/ProductList'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<MainComponent />} />
      <Route path="/home" element={<MainComponent />} />
      <Route path="/category/:id" element={<CategoryProduct />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/product-form" element={<ProductForm />} />
      <Route path="/product-list" element={<ProductList />} />

      {/* Add more routes as needed */}
 

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
