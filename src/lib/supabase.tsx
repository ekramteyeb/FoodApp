import { createClient } from '@supabase/supabase-js';
import * as SecureStore from 'expo-secure-store';
import * as Crypto from 'expo-crypto';
import * as aesjs from 'aes-js';
import { EXPO_PUBLIC_SUPABASE_KEY, EXPO_PUBLIC_SUPABASE_URL, EXPO_PUBLIC_SUPABASE_KEY_LOCAL, EXPO_PUBLIC_SUPABASE_URL_LOCAL } from '@env';
import { Database } from '@/src/supabase-types';

const isLocal = false;

const supabaseUrl = isLocal ? EXPO_PUBLIC_SUPABASE_URL_LOCAL : EXPO_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = isLocal ? EXPO_PUBLIC_SUPABASE_KEY_LOCAL : EXPO_PUBLIC_SUPABASE_KEY;



const ExpoSecureStorageAdapter = {

  getItem:  (key: string) => {
    return SecureStore.getItemAsync(key)
  },
  setItem: (key: string, value: string) => {
    SecureStore.setItemAsync(key,value)
  },
  removeItem: async (key: string) => {
    try {
      await SecureStore.deleteItemAsync(key);
    } catch (error) {
      console.error('Error removing item from secure storage:', error);
      throw error;
    }
  }
};

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: ExpoSecureStorageAdapter,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
