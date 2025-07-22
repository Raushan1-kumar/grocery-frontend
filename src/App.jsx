import { useState } from 'react'
import './App.css'
import MainComponent from './pages/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoryProduct from './pages/Category'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import ProductForm from './pages/ProductForm'
import ProductList from './pages/ProductList'
import LoginRegister from './pages/LoginRegister'
import ProfilePage from './pages/ProfilePage'
// import ProfileOrdersMinimal from './pages/CustomerOrder'
import AdminDashboard from './pages/AdminDashboard'
import OrderBill from './pages/CustomerOrder'

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
      <Route path="/login" element={<LoginRegister/>} />
      <Route path="/profile" element={<ProfilePage/>} />
      <Route path="/profile-order" element={<OrderBill/>} />
      <Route path="/admin-dashboard" element={<AdminDashboard/>} />
      <Route path="/admin/add-product" element={<ProductForm />} />
      {/* <Route path="/admin/orders" element={<ProfileOrdersMinimal />} /> */}
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
