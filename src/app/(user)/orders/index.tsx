import { ActivityIndicator, FlatList } from 'react-native';
import { Text } from '@/src/components/Themed';
import React from 'react';
import OrderListItem from '@/src/components/OrderListItem';
import { useMyOrderList } from '@/src/api/orders';

export default function OrderScreen() {

  const { data: orders, isLoading, error } = useMyOrderList()
  
    if (isLoading) {
      return <ActivityIndicator />
    }
    if (error) {
      <Text>Failed to fetch products</Text>
    }
  
  return (
    <FlatList
      data={orders}
      renderItem={({item}) => <OrderListItem order={item} />}
      contentContainerStyle={{ gap: 10, padding:10 }} //horizontal gap
      
    />
   
  );
}

/* const styles = StyleSheet.create({
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
 */