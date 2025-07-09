import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import MainComponent from './pages/MainPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CategoryProduct from './pages/Category'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'

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
 

     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
