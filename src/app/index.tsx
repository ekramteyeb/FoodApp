import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import React from 'react'
import { Link } from 'expo-router'

const index = () => {
  return (
    <View style={styles.container}>
      <Link href={'/(user)'} asChild>
        <Button text="User"/>
      </Link>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin"/>
      </Link>
      <Link href={'/(auth)/log-in'} asChild>
        <Button text="Auth"/>
      </Link>
    </View>
  )
}

export default index

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 10
  }, 
  
})