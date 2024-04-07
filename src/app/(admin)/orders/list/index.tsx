import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/src/components/Themed';
import React from 'react';
import orders from '@/assets/data/orders';
import OrderListItem from '@/src/components/OrderListItem';

export default function OrderScreen() {
  return (
    <FlatList
      data={orders.filter(order => order.status !== 'Delivered')}
      renderItem={({ item }) => <OrderListItem order={item} />}
      
      contentContainerStyle={{ gap: 10, padding:10 }} //horizontal gap
      
    />
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
