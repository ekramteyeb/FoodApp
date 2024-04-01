import { StyleSheet, Text, View , TextInput, Image } from 'react-native'
import React, {useState} from 'react'
import Button from '@/src/components/Button'
import { defaultImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker'

export default function createProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null);

  const validateInput = () => {
    setError('')
    if (!name) {
      setError('Name is required')
      return false
    }
    if (!price) {
      setError('Price is required')
      return false
    }
    if (isNaN(parseFloat(price))) {
      setError('Price is not a number ')
      return false
    }

    return true 

  }
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    /* console.log(result); */

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }
  const onCreate = () => {
    if (!validateInput()) {
      return 
    }
    console.warn('Creating product' + price + ' ' + name)
    resetFields()
  }

  const resetFields = () => {
    setName('')
    setPrice('')
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: image || defaultImage }} style={styles.image} />
      <Text style={styles.pickImageText} onPress={pickImage}>Select image</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        placeholder='name'
        value={name}
        style={styles.input}
        onChangeText={setName}
      />
      
      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        placeholder='12.20'
        value={price}
        style={styles.input}
        keyboardType='numeric'
        onChangeText={setPrice}
      />
      
      <Text style={{ color:'red', fontSize: 16 }}>{ error}</Text>
      <Button text="Create" onPress={onCreate}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    padding: 5
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
  image: {
    width: '50%',
    aspectRatio: 1, 
    alignSelf: 'center', 
    borderRadius: 100
  },
  pickImageText: {
    color: Colors.light.tint,
    fontWeight: '500',
    fontSize: 18, 
    alignSelf: 'center',
    margin: 10

  
  }
})