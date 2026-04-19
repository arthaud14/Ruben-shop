import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import Manifesto from './components/Manifesto'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import ShopPage from './pages/ShopPage'
import { CartProvider } from './context/CartContext'

function Home() {
  return (
    <div className="min-h-screen flex justify-center" style={{ background: '#0E0E0E' }}>
      <div className="w-full max-w-7xl" style={{ borderLeft: '1px solid #1C1C1C', borderRight: '1px solid #1C1C1C' }}>
        <Navbar />
        <Hero />
        <ProductGrid />
        <Manifesto />
        <Newsletter />
        <Footer />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produit/:id" element={<ProductPage />} />
          <Route path="/panier" element={<CartPage />} />
          <Route path="/boutique" element={<ShopPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}
