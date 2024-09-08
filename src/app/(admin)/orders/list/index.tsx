import { ActivityIndicator, FlatList, Text } from 'react-native';
import React from 'react';

import OrderListItem from '@/src/components/OrderListItem';
import { useOrdersAdminList } from '@/src/api/orders';
import { useInsertOrderSubscription } from '@/src/api/orders/subscriptions';


export default function OrderScreen() {
   
  const { data: orders, isLoading, error } = useOrdersAdminList({archived:false})
  
  //subscription
  useInsertOrderSubscription()

  if (isLoading) {
    return <ActivityIndicator />
  }
  if (error) {
    <Text>Failed to fetch orders</Text>
  }
  
  
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
      
      contentContainerStyle={{ gap: 10, padding:10 }} //horizontal gap
      
    />
   
  );
}

