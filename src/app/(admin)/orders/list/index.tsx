import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import React, { useEffect } from 'react';

import OrderListItem from '@/src/components/OrderListItem';
import { useOrdersAdminList } from '@/src/api/orders';
import { supabase } from '@/src/lib/supabase';
import { useQueryClient } from 'react-query';
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
