import { Alert } from "react-native";
import { supabase } from "./supabase";
import { initPaymentSheet, presentPaymentSheet } from "@stripe/stripe-react-native";


// Payments

const fetchPaymentSheetParams = async (amount: number) => {
  // Create payment session for our customer
  
  const { data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount }
  });
 
  if (data) {
     console.log(data, 'data returned ')
    return data;
  }
  
  Alert.alert(`Error a: ${error?.message ?? 'no data'}`);
  return {}; 
};

export const initialisePaymentSheet = async (amount: number) => {
  // setLoading(true);
  //const { paymentIntent, publishableKey } = await fetchPaymentSheetParams(amount);
  const {paymentIntent, publishableKey, customer, ephemeralKey }  = await fetchPaymentSheetParams(amount);
  
  console.log(paymentIntent, ' payment intent')
  console.log(publishableKey, ' publishable key')

  if (!publishableKey || !paymentIntent) return;
 
  const { error } = await initPaymentSheet({
    merchantDisplayName: 'Example, Inc.',
    paymentIntentClientSecret: paymentIntent,
    customerId: customer,
    customerEphemeralKeySecret: ephemeralKey,
    defaultBillingDetails: {
      name: 'Jane Doe',
    },
  }); 
  if (error) {
    Alert.alert(`Error a: ${error?.message ?? 'payment sheet not initialized'}`);
  }
};

export const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
		return false;
  } else {
    Alert.alert('Success', 'Your order is confirmed!');
		return true;
  }
};