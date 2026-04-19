import { createContext, useContext, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])

  function addItem(product, size) {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id && i.size === size)
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...product, size, quantity: 1 }]
    })
  }

  function removeItem(id, size) {
    setItems(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }

  const total = items.reduce((sum, i) => sum + Number(i.prix) * i.quantity, 0)
  const count = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
