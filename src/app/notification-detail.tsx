import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import CountdownTimer from '../components/CountDownCircle';

const NofificationDetial = () => {
  const { id, order } = useLocalSearchParams();  // You can pass notification ID as a parameter
   const parsedOrder = order ? JSON.parse(decodeURIComponent(order)) : null;
  // Fetch notification details using 'id'
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Notification Details # {id}</Text>
      {parsedOrder && <Text style={styles.text}> Status :  <Text style={{ fontWeight:'700' }}> { parsedOrder.status }</Text></Text>}
      <CountdownTimer totalMinutes={3} />
    </View>
  )
}

export default NofificationDetial

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
    
    
  },  
  text: {
    marginVertical: 0,
    fontSize: 24,
    
   
  }, 
  status: {
    marginVertical: 10,
    fontSize: 24,
    justifyContent:'center'
  }
})