import React, { createContext, PropsWithChildren, useContext, useState } from "react";
import { CartItem } from "@/assets/types";
import { Product } from "@/assets/types";
import {randomUUID } from 'expo-crypto'
import { useInsertOrder } from "../api/orders";
import { useRouter } from 'expo-router'
import { Tables } from "../supabase-types";
import { useInsertOrderItems } from "../api/order-items";



export type CartType = {
  items: CartItem[],
  addItem: (product: Product, size: CartItem['size']) => void, 
  total: number,
  updateQuantity: (itemId: string, amount: 1 | -1) => void,
  checkout : () => void
  
}
//used to access the data in the contex 
export const CartContext = createContext<CartType>({
  items: [],
  addItem: () => {}, 
  total: 0,
  updateQuantity: () => { },
  checkout: () => {}
})

//wrapper which transport data to children 
const CartProvider = ({ children } : PropsWithChildren ) => {
  const [items, setItems] = useState<CartItem[]>([])

  const { mutate: insertOrder } = useInsertOrder()
  const { mutate: insertOrderItem } = useInsertOrderItems()

  const router = useRouter()
  
  
  const total = items.reduce((sum, item) => (sum += item.product.price * item.quantity), 0)


  const addItem = (product: Product, size: CartItem['size']) => {
    const existingItem = items.find(item => item.product.id === product.id && item.size === size)

    if (existingItem) {
      updateQuantity(existingItem.id , 1)
      return 
    }
    const newCartItem: CartItem = {
      id: randomUUID(),
      product,
      product_id: product.id,
      size,
      quantity: 1
      
    }
    
    setItems([newCartItem, ...items])
  }
  //update cart 
  const updateQuantity = (itemId: string, amount: -1 | 1) => {
    const updatedItems = items
      .map(item => item.id !== itemId ? item : { ...item, quantity: item.quantity + amount })
      .filter(item => item.quantity > 0)
    setItems(updatedItems)
    //This can be further shortened 
    /* 
      setItems(
        items.map(item => item.id !== itemId ? item : { ...item, quantity: item.quantity + amount })
      )
    */
  }
  // clear cart
  const clearCart = () => {
    setItems([])
  }
  //checkout
  const checkout = () => {
    
    insertOrder(
      { total },
      {
        onSuccess: saveOrderItems
      }
    )
  }

  //insert orderItems to order 
  const saveOrderItems = (order: Tables<'orders'>) => {

    const orderItems = items.map((cartItem) => ({
        order_id: order.id,
        product_id: cartItem.product_id,
        quantity: cartItem.quantity,
        size: cartItem.size
    }))

    insertOrderItem(
      orderItems,
      {
        onSuccess: () => {
          
          clearCart()
          router.push(`/(user)/orders/${order.id}`)
      }
    })
    
  }

  
  
  return (
    <CartContext.Provider value={{ items ,addItem, total, updateQuantity, checkout }}>
      {children}
    </CartContext.Provider>
  )
}
export default CartProvider

// a shorthand hood to Cart context 
export const useCart = () => useContext(CartContext)