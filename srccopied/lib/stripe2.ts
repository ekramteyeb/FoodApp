import { Alert } from "react-native";
import { supabase } from "./supabase";
import { FunctionsFetchError, FunctionsHttpError, FunctionsRelayError } from "@supabase/supabase-js";

const getAccessToken = async () => {
  const { data, error } = await supabase.auth.getSession()
  if (data) {
    return data.session?.access_token
  }
  if (error) {
    return null
  }
}
// Payments
export const fetchPaymentSheetParams = async (amount: number) => {
  // Create payment session for our customer
    //however this is not neccessary
    const token = getAccessToken()
  
   const { data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount },
    headers: {
     Authorization: `Bearer ${token}`
    },
  });
  
  console.log(data, 'data in fetchPaymentSheet')
  if (data) {
    return data;
  }
  if (error instanceof FunctionsHttpError) {
  const errorMessage = await error.context.json()
  console.log('Function returned an error', errorMessage)
} else if (error instanceof FunctionsRelayError) {
  console.log('Relay error:', error.message)
} else if (error instanceof FunctionsFetchError) {
  console.log('Fetch error:', error.message)
}
  Alert.alert(`Error: ${error?.message ?? 'no data'}`);
  return {}; 
};

export const initialisePaymentSheet = async (amount: number) => {
  
  // setLoading(true);
  console.log('which user id id ')
  
 
  console.log('Initialize the payment sheet , for : ', amount)
  const data = await fetchPaymentSheetParams(amount);
  console.log(data,  'data in initialise payment' )
  /*
  if (!publishableKey || !paymentIntent) return;

  const { error } = await initPaymentSheet({
    merchantDisplayName: 'Example, Inc.',
    // customerId: customer,
    paymentIntentClientSecret: paymentIntent,
    defaultBillingDetails: {
      name: 'Jane Doe',
    },
  }); */
};

const openPaymentSheet = async () => {
  const { error } = await presentPaymentSheet();

  if (error) {
    Alert.alert(`Error code: ${error.code}`, error.message);
		return false;
  } else {
    Alert.alert('Success', 'Your order is confirmed!');
		return true;
  }
};