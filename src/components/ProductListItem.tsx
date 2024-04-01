import { StyleSheet, Image, Pressable } from 'react-native';
import { Link, useSegments } from 'expo-router'
import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';


import React from 'react';
import tw from 'twrnc'

type ProductListItemType = {
  id: number,
  name: string,
  price: number, 
  image: string
}
export const defaultImage1 = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/margarita.png'
export const defaultImage = 'https://picsum.photos/1920/1080?random=1'

const ProductListItem = ({ product }: { product: ProductListItemType }) => {
  
  const segments = useSegments()
 
  return (
    <Link href={`/${segments[0]}/menu/${product.id}`} asChild>
      <Pressable style={styles.container}>
        <Image source={{ uri: product.image ||  defaultImage }} style={[tw`bg-red-300`, styles.image]} />
        <Text style={styles.title}>{product.name} </Text>
        <Text style={styles.price}>${product.price }</Text>
      </Pressable>
    </Link>

  )
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
    maxWidth:'50%'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: 'white',
    resizeMode: 'cover',
    /* borderRadius:100 */
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    marginVertical:10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  price: {
    color: Colors.light.tint
  }
});