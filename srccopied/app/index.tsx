
import { Redirect } from 'expo-router';
import { ActivityIndicator } from 'react-native';
import { useAuth } from '../providers/AuthProvider';
import React from 'react';

export default function Index() {
    
    const { session, loading, isAdmin } = useAuth()

  
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
 

  return null; // Render nothing, just handle navigation
}
