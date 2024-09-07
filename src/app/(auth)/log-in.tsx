import { StyleSheet, Text, View, TextInput, Pressable, Alert } from 'react-native'
import React, {useState} from 'react'
import { Link, Stack} from 'expo-router'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'
import { FontAwesome5 } from '@expo/vector-icons'
import { supabase } from '@/src/lib/supabase'
import { useAuth} from '@/src/providers/AuthProvider'


/* interface User {
  id: string;
  name: string;
  email: string;
} */

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorAny, setErrorAny] = useState('')
  const [isloading, setIsloading] = useState(false)
  
 

  const { updateIsItAdmin, expo_push_token } = useAuth()
  
  //const [userData, setUserData] = useState<any[]>([]);
  
  const validatePassword = (input: string) => {
    const rules = input.split(';');
    for (let rule of rules) {
      const [type, value] = rule.split(':').map(str => str.trim());
      switch (type) {
        case 'required':
          if (value === 'upper' && !/[A-Z]/.test(password)) {
            return 'Password must contain at least one uppercase letter.';
          }
          if (value === 'lower' && !/[a-z]/.test(password)) {
            return 'Password must contain at least one lowercase letter.';
          }
          if (value === 'digit' && !/\d/.test(password)) {
            return 'Password must contain at least one digit.';
          }
          break;
        case 'max-consecutive':
          if (/\w*([a-zA-Z\d])\1{2,}\w*/.test(password)) {
            return 'Password cannot have more than two consecutive characters.';
          }
          break;
        case 'minlength':
          if (password.length < parseInt(value)) {
            return `Password must be at least ${value} characters long.`;
          }
          break;
        default:
          break;
      }
    }
    return '';
  };
  const handlePasswordChange = (input:string) => {
    setPassword(input);
    const errorMessage = validatePassword(input);
    setErrorAny(errorMessage);
  };

  const signup = async () => {
    setIsLogin(true)
    setIsloading(true)
    try {
    const { data , error }  = await supabase.auth.signUp({ email, password });
    if (error) {
      Alert.alert('Error signing up user:', error.message);
    } else {
      Alert.alert('User signed up successfully:');
      console.log('User signed up successfully:', data);
      setIsLogin(false)
      setIsloading(false)
      // Handle successful sign up
    }
  } catch (error : any ) {
    Alert.alert('Error signing up user:', error.message);
  }
  }
  const signin = async () => {
    
    
    try {
    const { data , error }  = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      Alert.alert('Error signing in user: ', error.message);
    } else {
      Alert.alert('User signed in successfully: ');
      //console.log('User signed in successfully: ', data.user);
      const { error } = await supabase.from('profiles').update({expo_push_token : expo_push_token}).eq('id',data.user.id).single()
      if (error) {
        console.log(error,'error while updating the push_token')
      }
      const newProfile  = await supabase.from('profiles').select('*').eq('id', data.user.id).single()
      
      if (newProfile) {
        console.log(newProfile, 'new Profile')
        updateIsItAdmin(newProfile.data?.group === 'ADMIN')
      }
      
      
      // Handle successful sign in
    }
  } catch (error : any) {
    Alert.alert('Error signing in user: ', error.message);
  }
  }

  const onsubmit =  () => {
    if (isLogin) {
      signin()
    } else {
      signup()
    }
  }
  

  return (
    <View style={ styles.container }>
      <Stack.Screen options={{
        title: isLogin ? 'Login' : 'Sign up', 
        headerRight: () => (
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="home"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>

          ),
      }} />
      
      <Text style={styles.label}>Email : </Text>
      <TextInput
        placeholder='youremail@gmail.com'
        value={email}
        inputMode='email'
        style={styles.input}
        keyboardType='email-address'
        onChangeText={setEmail}
      />
      <Text style={styles.label}>Password : </Text>
      <TextInput
        placeholder='password'
        value={password}
        style={styles.input}
        onChangeText={handlePasswordChange}
        secureTextEntry={true}
        
      />

      {errorAny ? <Text style={{ color: 'red' }}>{errorAny}</Text> : null}
      
      <Button
        text={isLogin ? 'login' : 'Create account'}
        onPress={onsubmit}
        disabled={isloading}
      />
      <Text
        style={styles.signup}
        onPress={() => setIsLogin(!isLogin)}
      >
        {isLogin ? 'Create account' : 'Login'}
      </Text>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center'
  },
  input: {
    padding: 10, 
    backgroundColor: 'white',
    borderRadius: 5, 
    marginTop: 5, 
    marginBottom: 20,
    fontSize: 16
  },
  label: {
    fontSize: 18,
    color:'gray'
  }, 
  signup: {
    color: Colors.light.tint,
    fontWeight: '500',
    fontSize: 20, 
    alignSelf: 'center',
    margin: 10
  }
})