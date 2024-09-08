import { StyleSheet, Text, View ,Platform, FlatList} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import Button from '../components/Button'
import { CartContext, useCart} from '@/src/providers/CartProvider'
import React, { useContext } from 'react'
import { CartItem } from '@/assets/types'
import CartListItem from '../components/CartListItem'
import { useRouter } from 'expo-router'


const CartScreen = () => {
  
  const { items, total } = useContext(CartContext)
  const {checkout} = useCart()
  const router = useRouter()
  
  
  
  const gobackhandler = () => {
     router.push('/(user)/menu')
  }
  
  return (
    <View style={{  padding:10 }}>
      <FlatList
        data={items}
        renderItem={(item: { item: CartItem }) => <CartListItem cartItem={item.item} />}
        contentContainerStyle={{ gap: 10}} //horizontal gap
      />
      
      <Text style={styles.total}>{items.length > 0 ? `Total  : $ ${total.toFixed(2)}` : '0 items selected'} </Text>
      
      { items.length > 0 ?
        <Button text='Checkout' onPress={checkout} /> :
        <Button text='Go back to Shopping' onPress={gobackhandler} />
      }
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen

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
    aspectRatio:1
  },
  total: {
    marginTop: 'auto',
    fontSize: 20,
    fontWeight: '500', 
    paddingTop:20
  }
})