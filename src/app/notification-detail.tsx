import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';

const NofificationDetial = () => {
    const { id } = useLocalSearchParams();  // You can pass notification ID as a parameter
  // Fetch notification details using 'id'
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Notification Details # {id}</Text>
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
    marginVertical: 10,
    fontSize: 24,
    
   
  }
})