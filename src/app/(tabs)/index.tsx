import { StyleSheet, ScrollView } from 'react-native';

import { Text, View } from '@/src/components/Themed';
import ProductListItem from '@/src/components/ProductListItem';

import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';
import React from 'react';
 
export default function MenuScreen() {
  
  return (
    <ScrollView>
      
      {
        products && products.map(pro => <ProductListItem key={pro.id} product={pro}/>)
      }
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
    backgroundColor:'white'
  },
  
});
