import { StyleSheet, Text, View } from 'react-native'
import Button from '../components/Button'
import React from 'react'
import { Link, Redirect } from 'expo-router'
import { useAuth } from '../providers/AuthProvider'
import { ActivityIndicator } from 'react-native'
import { supabase } from '../lib/supabase'

const index = () => {
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

  const signout = () => {
    supabase.auth.signOut()
  }
  
  return ( 
    <View style={styles.container}>
      <Link href={'/(admin)'} asChild>
        <Button text="Admin"/>
      </Link>
      <Link href={'/(user)'} asChild>
        <Button text="User"/>
      </Link>
    
      <Button text="Sign out" onPress={signout} />
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