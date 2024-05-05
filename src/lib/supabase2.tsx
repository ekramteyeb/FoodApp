import "react-native-url-polyfill/auto";

import { createClient } from '@supabase/supabase-js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';

import * as aesjs from 'aes-js'; 

import { EXPO_PUBLIC_SUPABASE_KEY, EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_KEY_LOCAL,EXPO_PUBLIC_SUPABASE_URL_LOCAL  } from '@env'
import { Database } from "@/src/supabase-types";



const isLocal = false

const supabaseUrl = isLocal ? EXPO_PUBLIC_SUPABASE_URL_LOCAL : EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = isLocal ? EXPO_PUBLIC_SUPABASE_KEY_LOCAL : EXPO_PUBLIC_SUPABASE_KEY

const encrypt = async (key: string, value: string) => {
  
    const encryptionKey = Crypto.getRandomValues(new Uint8Array(256 / 8));

    const cipher = new aesjs.ModeOfOperation.ctr(encryptionKey, new aesjs.Counter(1));
    const encryptedBytes = cipher.encrypt(aesjs.utils.utf8.toBytes(value));

    await SecureStore.setItemAsync(key, aesjs.utils.hex.fromBytes(encryptionKey));

    return aesjs.utils.hex.fromBytes(encryptedBytes);
}


const decrypt = async (key: string, value: string) => {
  
  const encryptionKeyHex = await SecureStore.getItemAsync(key);
  if (!encryptionKeyHex) {
    return encryptionKeyHex;
  }

  const cipher = new aesjs.ModeOfOperation.ctr(aesjs.utils.hex.toBytes(encryptionKeyHex), new aesjs.Counter(1));
  const decryptedBytes = cipher.decrypt(aesjs.utils.hex.toBytes(value));

  return aesjs.utils.utf8.fromBytes(decryptedBytes);
}


const ExpoSecureStorageAdabpter = {
  
  getItem: async (key: string,  value: string) => {
     //const encrypted = await AsyncStorage.getItem(key);
     /* const encrypted = SecureStore.getItem(key);
    if (!encrypted) { return encrypted; } */

    return decrypt(key, value)
  }, 
  setItem: async (key: string, value: string) => {
    const encrypted = await encrypt(key, value);

    //await AsyncStorage.setItem(key, encrypted);

    await SecureStore.setItemAsync(key,encrypted)
  }, 
  removeItem: (key: string) => {
    SecureStore.deleteItemAsync(key)
  } 
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    //storage: new LargeSecureStore(),
    storage: ExpoSecureStorageAdabpter as any, // AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});