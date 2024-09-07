import { Pressable, StyleSheet, Text} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '@/src/components/Button'
import { useAuth } from '@/src/providers/AuthProvider'
import { supabase } from '@/src/lib/supabase'
import { Link } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import Colors from '@/src/constants/Colors'


const ProfileScreen = () => {
  const { session  } = useAuth()
  
  
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Hello ,  {session?.user.email}</Text>
      <Text>{session?.user.role }</Text>
      
      <Link href="/(admin)" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="home"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link>
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