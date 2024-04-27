import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/src/components/Button'
import { useAuth } from '@/src/providers/AuthProvider'
import { supabase } from '@/src/lib/supabase'


const ProfileScreen = () => {
  const { session } = useAuth()
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text }>Hello ,  {session?.user.email}</Text>
      
      <Button text='Sign Out' onPress={() => supabase.auth.signOut()}/>
      
      
    </SafeAreaView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
    
    
  },  
  text: {
    marginVertical: 40,
    fontSize: 24,
    
   
  }
})