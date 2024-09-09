import * as  Notifications from "expo-notifications";
import * as Device from 'expo-device'
import { Platform } from "react-native";
import Constants from 'expo-constants'
import { supabase } from "./supabase";
import { Tables } from "@/assets/types";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});



 function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
    if (!projectId) {
      handleRegistrationError('Project ID not found');
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError('Must use physical device for push notifications');
  }
}

export async function sendPushNotification(expoPushToken: string, title: string , body: string, link:string) {
  
  const data = {
    //link: "/notification-detail?id=12345"  // Deep link with a query parameter (id)
    link: link  // Deep link with a query parameter (id)
  }
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data,
  };

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  });
}
const getUserToken = async (userId: string) => {
  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  return data?.expo_push_token
  
}
export const notifyUserAboutOrderUpdate = async (order : Tables<'orders'>) => {
  
  const token = await getUserToken(order.user_id ?? '')
  const title = `Your order is ${order.status}`
  const body = 'You should recieve it in few minutes'
  //link to notification page
  const orderString = encodeURIComponent(JSON.stringify(order));
  
  const link = `/notification-detail?id=${order.id}&order=${orderString}`
  
  await sendPushNotification(token ?? '', title, body, link)
  
  
}
export const notifyAdminsAboutNewOrder = async () => {
  const admins = await supabase.from('profiles').select('expo_push_token').eq('group', 'ADMIN')
         
  const title = 'order recieved'
  const body = 'body will be displayed later'
  const link = '/(admin)/orders/'

  admins.data && admins?.data?.map(async (token) => {
    if (token) {
      await sendPushNotification(token?.expo_push_token ?? '', title, body, link)
    }
  })
}