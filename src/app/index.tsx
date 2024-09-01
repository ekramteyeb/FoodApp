
import { Link, Redirect } from 'expo-router';
import { ActivityIndicator, Button, View, StyleSheet } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import React from 'react';

export default function Index() {
    
    const { session, loading, isAdmin } = useAuth()

    console.log(isAdmin, 'in index app layout')
    // Replace this with actual authentication logic
    

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
        <Button title="Admin"/>
      </Link>
      <Link href={'/(user)'} asChild>
        <Button title="User"/>
      </Link>
    
      
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    padding: 10
  }, 
  
})
