import { StyleSheet, Text, View, Pressable, ActivityIndicator } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router'
import { defaultImage } from '@/src/components/ProductListItem'
import {  FontAwesome } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'
import { Link } from 'expo-router'
import { useProduct } from '@/src/api/products'
import RemoteImage from '@/src/components/RemoteImage'

const ProductDetailScreen = () => {

  const { id: idString } = useLocalSearchParams()

  const  id  = parseFloat(typeof idString === 'string' ? idString : idString[0])

  const { data: product, error, isLoading } = useProduct(id)
  

  if (isLoading) {
      return <ActivityIndicator />
  }
  if (error) {
    return <Text>Failed to fetch products</Text>
  }
  if (!product) {
    return <Text>Failed to fetch the product</Text>
  }

  
  return (
    <View style={styles.container}>

      <Stack.Screen name="" options={{
        title: product.name, 
        headerRight: () => (
          <Link href={`/(admin)/menu/create?id=${id}`} asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        )
          
        }}
      />
      
      <RemoteImage
        path={product?.image}
        fallback={defaultImage}
        style={ styles.image}
      /> 
      <Text style={styles.title}>{product.name} </Text>
      
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
    aspectRatio: 1,
    borderRadius: 400,
    alignSelf: 'center'
    
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