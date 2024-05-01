import { Alert } from "react-native";
import { supabase } from "./supabase";
import { FunctionsHttpError } from "@supabase/supabase-js";


// Payments
export const fetchPaymentSheetParams = async (amount: number) => {
  // Create payment session for our customer

  const functionUrl = 'https://fotxoulzacsjvaiwwida.supabase.co/functions/v1/payment-sheet';
  const authToken = 'eyJhbGciOiJIUzI1NiIsImtpZCI6InB1anJJb2pWdnBZeW9sanIiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzE0NTYwMTM0LCJpYXQiOjE3MTQ1NTY1MzQsImlzcyI6Imh0dHBzOi8vZm90eG91bHphY3NqdmFpd3dpZGEuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6IjFmN2U0OTg1LTRmOWYtNDNlMy1iNjAzLTg3NDhiOWQxYmNiYyIsImVtYWlsIjoiaHVzc2VuYWJAZ21haWwuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJlbWFpbCI6Imh1c3NlbmFiQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicGhvbmVfdmVyaWZpZWQiOmZhbHNlLCJzdWIiOiIxZjdlNDk4NS00ZjlmLTQzZTMtYjYwMy04NzQ4YjlkMWJjYmMifSwicm9sZSI6ImF1dGhlbnRpY2F0ZWQiLCJhYWwiOiJhYWwxIiwiYW1yIjpbeyJtZXRob2QiOiJwYXNzd29yZCIsInRpbWVzdGFtcCI6MTcxNDU1NjUzNH1dLCJzZXNzaW9uX2lkIjoiMGJmM2M5ZTktNGRhOC00YzY4LTg1NDgtNmQ5M2U4ZTdjMTBmIiwiaXNfYW5vbnltb3VzIjpmYWxzZX0.ayR2h1upcYXRi1DOiNT0GaGiqMkGnQ_KmrMYEv9Lqx0 access';

  const secrete_key  = 'sk_test_g58Mt0QEmHabv6zbdtvFA3Dp'

   const { data, error } = await supabase.functions.invoke('payment-sheet', {
    body: { amount },
    headers: {
      //Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      Authorization: `Bearer ${secrete_key}`,
    },
  });
  
  console.log(data, 'data in fetchPaymentSheet')
  if (data) {
    return data;
  }
  console.log(error, 'solid error ')
  if (error && error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json()
    console.log('Function returned an error', errorMessage)
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