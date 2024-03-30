import { StyleSheet, Text, View, Image, Pressable } from 'react-native'
import React, {useState} from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import products from '@/assets/data/products'
import { defaultImage } from '@/src/components/ProductListItem'
import Button from '@/src/components/Button'

const ProductDetailScreen = () => {

  const { id } = useLocalSearchParams()
  const product = products.find(p => p.id.toString() === id)
  const [productSize, setProductSize] = useState('M')

  const sizes = ['S', 'M', 'L', 'XL']

  const addtocart = () => {
    console.warn('add to cart warning')
  }

  if (!product) { return <Text>Product not found</Text> }
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Details ' + id }} />
      
      <Image style={styles.image} source={{ uri: product.image || defaultImage }} /> 
      
     
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
      
        <Text style={styles.price}>Price : ${product.price}</Text>

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
    aspectRatio: 1
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