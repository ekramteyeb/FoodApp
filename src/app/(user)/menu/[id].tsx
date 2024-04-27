import { StyleSheet, Text, View, Image, Pressable, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'

import { defaultImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'
import { useCart } from '@/src/providers/CartProvider'
import { PizzaSize } from '@/assets/types'
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/src/components/RemoteImage'

const ProductDetailScreen = () => {

  const [productSize, setProductSize] = useState<PizzaSize>('M')
  const { id: idString } = useLocalSearchParams()

  const  id  = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id)

  
  
  const router = useRouter()

  //consume a context 
  const { addItem} = useCart()

  const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']

  const addtocart = () => {
    if (!product) return null
    
    addItem(product, productSize)
    router.push('/cart')
  }

  if (isLoading) {
      return <ActivityIndicator />
  }
  if (error) {
      <Text>Failed to fetch products</Text>
  }

  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product?.name}} />
      
      <RemoteImage
        path={product?.image}
        fallback={defaultImage}
        style={styles.image}
      />
      
     
        <Text style={styles.selectSize}>Select Size </Text>
        <View style={styles.productSizes}>
          {
            sizes.map(size =>
              <Pressable
                key={size}
                onPress={() => setProductSize(size)}
                style={[styles.productSizeBtn, {backgroundColor: productSize === size ? 'gainsboro' : 'white'}]}
                
              >
                
                  <Text style={[styles.productSizeText, {color: productSize === size ? 'black' : 'gray'}]}>
                     {size}
                  </Text>
                  
              </Pressable>)}
        </View>
      
        <Text style={styles.price}>Price : ${product?.price}</Text>

        <Button onPress={addtocart} text='Add to cart' />
        
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
    aspectRatio: 1,
    borderRadius: 400
  },
  productSizes: {
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center', 
    
  },
  selectSize: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom:20
  }, 
  productSizeBtn: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio:1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems:'center'
  }, 
  productSizeText: {
    fontSize: 18,
  }, 
  price: {
    fontSize: 18,
    fontWeight: '600', 
    marginTop:'auto'
  },
  addToCart: {
    fontSize: 20,
    fontWeight: '600', 
    backgroundColor: 'blue', 
    padding: 16,
    borderRadius: 30, 
    width: '80%', 
    textAlign: 'center', 
    color:'white'
    
  },
  addToCartBtn: {
    justifyContent: 'center', 
    alignItems: 'center', 
    
  }
})