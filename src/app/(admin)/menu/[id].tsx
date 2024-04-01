import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, {useState} from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import products from '@/assets/data/products'
import { defaultImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCallback } from 'react'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/assets/types'

const ProductDetailScreen = () => {

  const [productSize, setProductSize] = useState<PizzaSize>('M')
  const { id } = useLocalSearchParams()
  const product = products.find(p => p.id.toString() === id)
  const router = useRouter()

  //consume a context 
  const { addItem} = useCart()

  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

  const addtocart = () => {
    if(!product) return
    addItem(product, productSize)
    router.push('/cart')
  }

  if (!product) { return <Text>Product not found</Text> }
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name}} />
      
      <Image style={styles.image} source={{ uri: product.image || defaultImage }} /> 
      
     
      
        <Text style={styles.title}>{product.name}</Text>
        <Text style={styles.price}>Price : ${product.price}</Text>

        
        
      </View>

    
  )
}

export default ProductDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10, 
    backgroundColor: 'white'
  },
  image: {
    width: '100%',
    aspectRatio: 1
  },
 
  price: {
    fontSize: 18,
    fontWeight: '600', 
    
  }
  ,
 
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom:10
   
  }
  
})