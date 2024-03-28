import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import ProductListItem from '@/src/components/ProductListItem';

import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';
 
export default function MenuScreen() {
  
  return (
    <View>
      <ProductListItem product={products[1]}/>
      <ProductListItem product={products[2]}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
    backgroundColor:'white'
  },
  
});
