import { StyleSheet, Text, View, Pressable, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'

import { Stack, useLocalSearchParams, } from 'expo-router'
import OrderListItem from '@/src/components/OrderListItem'
import OrderItemListItem from '@/src/components/OrderItemListItem'
import { OrderStatusList } from '@/assets/types'
import Colors from '@/src/constants/Colors'
import { useOrderDetails, useUpdateOrder } from '@/src/api/orders'

const OrderDetailScreen = () => {

  const { id: idString } = useLocalSearchParams()
  const  id  = parseFloat(typeof idString === 'string' ? idString : idString[0])
  
  const { data: order, isLoading, error } = useOrderDetails(id)

  const { mutate: updateOrder } = useUpdateOrder()
  
  const updateStatus = (status : string) => {
      updateOrder({id: id, updatedFields: { status }}  )
  }
  
  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error || !order) {
    return  <Text>Failed to fetch orders</Text>
  }

  
  
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Order #' + order.id.toString() }} />
       
      <OrderListItem order={order} />
      
      <FlatList
        data={order.order_items}
        renderItem={(item) => <OrderItemListItem item={item.item} />}
        contentContainerStyle={{ gap: 10 }}
        /* ListHeaderComponent={() =>  <OrderListItem order={order} /> } */
        //if u wanna move the header with flatlist toger while scrolling 
        ListFooterComponent={() => <>
          <Text style={{ fontWeight: 'bold' }}>Status</Text>
          <View style={{ flexDirection: 'row', gap: 5 }}>
            {
              OrderStatusList.map((status) => (
                <Pressable
                  key={status}
                  onPress={ () => updateStatus(status)}
                  style={{ 
                    borderColor: Colors.light.tint,
                    borderWidth: 1, 
                    padding: 10,
                    borderRadius: 5, 
                    marginVertical: 10,
                    backgroundColor: order.status === status ? Colors.light.tint : 'transparent'
                   }}
                >
                  <Text
                    style={{
                      color: order.status === status ? 'white' : Colors.light.tint, 
                      fontSize: 18, 
                      fontWeight: order.status === status ? '800' : '300'
                    }}
                  >
                    {status}
                  </Text>
                </Pressable>
              ))
            }
          </View>
        </>}
      />
    </View>

    
  )
}

export default OrderDetailScreen

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 10, 
    gap: 20
    
  },
  
  orderSizes: {
    flexDirection:'row',
    justifyContent: 'space-around',
    alignItems: 'center', 
    
  },

  orderSizeBtn: {
    backgroundColor: 'gainsboro',
    width: 50,
    aspectRatio:1,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems:'center'
  }, 
  
  price: {
    fontSize: 18,
    fontWeight: '600', 
    marginTop:'auto'
  }
})