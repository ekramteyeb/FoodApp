import { StyleSheet, Text, View , TextInput, Image, Alert, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import Button from '@/src/components/Button'
import { defaultImage } from '@/src/components/ProductListItem'
import Colors from '@/src/constants/Colors'
import * as ImagePicker from 'expo-image-picker'
import * as ImageManipulator from 'expo-image-manipulator'
import { useDeleteProduct, useInsertProduct, useProduct, useUpdateProduct } from '@/src/api/products'
import * as  FileSystem from 'expo-file-system'
import { randomUUID } from 'expo-crypto'
import { supabase } from '@/src/lib/supabase'
import { decode } from 'base64-arraybuffer'
import RemoteImage from '@/src/components/RemoteImage'


export default function createProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [image, setImage] = useState<string | null>(null);
  const [updatingImage, setUpdatingImage] = useState<boolean>(false)

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
  //to 


  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const updatingImage = isUpdating ? true : false
    setUpdatingImage(updatingImage)

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
      console.log(result?.assets, 'result');
      const resizedUri = await resizeImage(result?.assets[0]?.uri);
      setImage(resizedUri);
      //setImage(result?.assets[0]?.uri);
    } 

  }


  const onCreate = async () => {
    if (!validateInput()) {
      return 
    }
    const imagePath = await uploadImage()
    
    insertProduct(
      { name, price: parseFloat(price), image: imagePath },
      {
        onSuccess: () => {
          console.log(imagePath,  'image path from create.tsx')
          resetFields()
          router.back()
        },
        onError: (error) => {
          console.log(error, 'product creating error')
        }
      })
    
    
  }

  const onUpdate = async () => {
     
    if (!validateInput()) {
      return 
    }
     const imagePath = await uploadImage()
     
     updateProduct(
      { id, name, price: parseFloat(price), image: imagePath },
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

  //upload image to cloud
  const uploadImage = async () => {
    if (!image?.startsWith('file://')) {
      return;
    }

    const base64 = await FileSystem.readAsStringAsync(image, {
      encoding: 'base64',
    });
    const filePath = `${randomUUID()}.png`;
    const contentType = 'image/png';
    const { data ,  error } = await supabase.storage
      .from('product-images')
      .upload(filePath, decode(base64), { contentType });
    
    if (data) {
      return data.path;
    }
    if (error) {
      console.log(error, 'uploading image')
    }
    
  };

  const resizeImage = async (uri : string) => {
    try {
      const resizedImage = await ImageManipulator.manipulateAsync(uri, [{ resize: { width: 800 } }], { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG });
      return resizedImage.uri;
    } catch (error) {
      console.error('Error resizing image:', error);
      throw new Error('Failed to resize image');
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: isUpdating ? 'Update product' :  'Create product' }}/>
     
      {
        isUpdating ? updatingImage ? 
           <Image
            source={{ uri: image || defaultImage }}
            style={styles.image}
          /> 
          : 
          <RemoteImage
            path={image}
            fallback={defaultImage}
            style={styles.image}
          />
          : 
          <Image
            source={{ uri: image || defaultImage }}
            style={styles.image}
          /> 
      }
       
    
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