import { StyleSheet, Image } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import products from '@/assets/data/products';

type ProductListItemType = {
  name: string,
  price: number, 
  image: string
}

const ProductListItem = ({product} : {product:ProductListItemType}) => {
  return (
    <View style={styles.container}>
      <Image src={`${product.image}`} style={styles.image } />
      <Text style={styles.title}>{product.name} </Text>
      <Text style={styles.price}>${product.price }</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
    </View>

  )
}

export default ProductListItem

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 10,
    backgroundColor:'white'
  },
  image: {
    width: '100%',
    aspectRatio:1
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
