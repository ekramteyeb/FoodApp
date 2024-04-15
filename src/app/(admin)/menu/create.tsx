import { StyleSheet, Text, View , TextInput, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Button from '@/src/components/Button'
import { defaultImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products'


export default function createProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null);

  const router = useRouter()
  
  // const { id } = useLocalSearchParams() 
  const { id: idString } = useLocalSearchParams()

  const  id  = parseFloat(typeof idString === 'string' ? idString : idString?.[0])
  

  const isUpdating = !!id;
  
  //using useInsertProduct hook
  const { mutate: insertProduct, isLoading } = useInsertProduct()
  const { mutate: updateProduct } = useUpdateProduct()
  const {mutate: deleteProduct} = useDeleteProduct()

  let updatingProduct = null
  //fetch the product  first
  if (isUpdating) {
    const { data } = useProduct(id)
     updatingProduct = data
  }
  
  
  useEffect(() => {
    if (updatingProduct) {
      setName(updatingProduct.name)
      setPrice(updatingProduct.price.toString())
      setImage(updatingProduct.image)
    }
  }, [updatingProduct])

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
    
    insertProduct(
      { name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        },
        onError: (error) => {

        }
      })
    
    
  }

   const onUpdate = () => {
    if (!validateInput()) {
      return 
    }
     
     updateProduct(
      { id, name, price: parseFloat(price), image },
      {
        onSuccess: () => {
          resetFields()
          router.back()
        },
        onError: (error) => {
          console.log('error',  error)
        }
      })
   }
  
  const onDelete = () => {
    
    deleteProduct(id,
      {
        onSuccess: () => {
          router.replace('/(admin)/')
        },
        onError: (error) => {
          console.log('error',  error)
        }
      })
    /* router.push('/(admin)/menu/') */
  }
  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you wanna delete this product', [
      {
        text:'Cancel'
      }, 
      {
        text: 'Delete', 
        style: 'destructive',
        onPress: onDelete
      }
    ])
  }
  
  const onSubmit = () => {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const resetFields = () => {
    setName('')
    setPrice('')
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'Update product' :  'Create product' }}/>
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
      <Button text={isUpdating ? "Update " : "Create"} disabled={isLoading} onPress={onSubmit} />
      {isUpdating && <Text style={styles.deleteBtn} onPress={confirmDelete}>Delete</Text>}
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
    borderRadius: 100,
    margin:10
  },
  pickImageText: {
    color: Colors.light.tint,
    fontWeight: '500',
    fontSize: 20, 
    alignSelf: 'center',
    margin: 10
  },
  deleteBtn: {
    fontSize: 18, 
    marginVertical: 5, 
    alignSelf: 'center',
    color: 'red',
    fontWeight:'500'
  }
})