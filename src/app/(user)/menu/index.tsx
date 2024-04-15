import { StyleSheet, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import ProductListItem from '@/src/components/ProductListItem';

import React from 'react';

import { useProductsList } from '@/src/api/products';
 
export default function MenuScreen() {

 /*  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase.from('products').select('*')
      if (error) {
         console.log(error, 'product fetch eror ')
      }
      console.log(data, 'product data')
    }
    fetchProduct()
  }, [])
   */
  
    //using react  query 
    const { data : products , error,  isLoading } = useProductsList()

    if (isLoading) {
      return <ActivityIndicator />
    }
    if (error) {
      <Text>Failed to fetch products</Text>
    }


  return (
    <FlatList
      data={products}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding:10 }} //horizontal gap
      columnWrapperStyle={{ gap:10 }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
    backgroundColor:'white'
  },
  
});
