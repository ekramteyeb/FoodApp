import { StyleSheet, ScrollView, FlatList } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import ProductListItem from '@/src/components/ProductListItem';

import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';
import React from 'react';
 
export default function MenuScreen() {
  
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
