import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import { Stack, useRouter } from 'expo-router'
import Button from '@/src/components/Button'
import Colors from '@/src/constants/Colors'

const LoginScreen = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  
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
    setError(errorMessage);
  };

  const onsubmit =  () => {
    const valid = validatePassword(password)
    if (valid) {
      console.log(console.warn('pass me out' + password + email))
    }
    else {
      console.warn('pass me out' + error)
    }
      
  }
  

  return (
    <View style={ styles.container }>
      <Stack.Screen options={{ title: isLogin ? 'Login' : 'Sign up'}} />
      
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

      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      
      <Button text={isLogin ? 'login' : 'Create account'} onPress={onsubmit} />
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