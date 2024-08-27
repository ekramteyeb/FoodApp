import { View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Colors from '../constants/Colors';
import { CartItem } from '@/assets/types';
import { defaultImage } from '../components/ProductListItem'
import Entypo from '@expo/vector-icons/Entypo'
import { useCart } from '../providers/CartProvider';
import RemoteImage from './RemoteImage';

type CartListItemProps = {
  cartItem: CartItem;
};

const CartListItem = ({ cartItem }: CartListItemProps) => {
  const { updateQuantity  } = useCart();
  return (
    <View style={styles.container}>
      <RemoteImage
        path={cartItem.product.image}
        fallback={defaultImage}
        style={styles.image}
        
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{cartItem.product.name}</Text>
        <View style={styles.subtitleContainer}>
          <Text style={styles.price}>${cartItem.product.price.toFixed(2)}</Text>
          <Text>Size: {cartItem.size}</Text>
        </View>
      </View>
      <View style={styles.quantitySelector}>
        <Entypo
          onPress={() => updateQuantity(cartItem.id, -1)}
          name="minus"
          color="gray"
          style={{ padding: 10, fontSize:20, backgroundColor:'lightgray', borderRadius:100, aspectRatio:1 }}
        />

        <Text style={styles.quantity}>{cartItem.quantity}</Text>
        <Entypo
          onPress={() => updateQuantity(cartItem.id, 1)}
          name="plus"
          color="gray"
          style={{ padding: 10 ,fontSize:20, backgroundColor:'lightblue', borderRadius:100, aspectRatio:1 }}
        />
      
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 5,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 100,
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 100, 
    resizeMode: 'cover',
    
  },
  title: {
    fontWeight: '500',
    fontSize: 16,
    marginBottom: 5,
  },
  subtitleContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  quantitySelector: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  quantity: {
    fontWeight: '500',
    fontSize: 18,
  },
  price: {
    color: Colors.light.tint,
    fontWeight: 'bold',
  },
});

export default CartListItem;