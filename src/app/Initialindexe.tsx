import { StyleSheet, View } from 'react-native'
import Button from '../components/Button'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import { ActivityIndicator } from 'react-native'


const Index = () => {
  const { session, loading, isAdmin } = useAuth()
  
  if (loading) {
    return <ActivityIndicator />
  }
  
  if(!session) {
    return <Redirect href={'/(auth)/log-in'} />
  }

  if(!isAdmin) {
    return <Redirect href={'/(user)/'} />
  }
  if(session && isAdmin) {
    return <Redirect href={'/(admin)/'} />
  }


  
  
  return ( 
    <View style={styles.container}>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin"/>
      </Link>
      <Link href={'/(user)'} asChild>
        <Button text="User"/>
      </Link>
    
      
    </View>
  )
}

export default Index

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 10
  }, 
  
})