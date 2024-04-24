import React from 'react';
import { StyleSheet, Image, Pressable } from 'react-native';
import { Link, useSegments } from 'expo-router'

import { Text, View } from '@/src/components/Themed';
//from dayjs
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime'
import { Tables } from '../supabase-types';



type OrderListItemType = {
  order: Tables<'orders'>
}



const OrderListItem = ({ order }:  OrderListItemType ) => {
  
    const segments = useSegments()
    
    dayjs.extend(relativeTime)
    const timeFromNow = dayjs(order.created_at).fromNow()
    
    const path : any =  `/${segments[0]}/orders/${order.id}`
 
  return (
    <Link href={path} asChild>
        <Pressable style={styles.container}>
        <View  >
            <Text style={styles.title}>Order #{order.id} </Text>
            <Text style={styles.time}>{timeFromNow} </Text>
            
        </View>
        <Text style={styles.status}>{order.status }</Text>
      </Pressable>
    </Link>

  )
}

export default OrderListItem

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: 'white',
   
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  
  title: {
    fontSize: 19,
    fontWeight: 'bold',
    marginVertical: 5
  },
  
  status: {
      
      fontWeight: '500',
      fontSize: 18
},
    time: {
    color: 'gray',
   
    }
});
