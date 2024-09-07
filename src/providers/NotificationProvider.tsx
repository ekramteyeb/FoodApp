
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { registerForPushNotificationsAsync } from '@/src/lib/notifications'
import { ExpoPushToken } from 'expo-notifications'
import * as Notifications from 'expo-notifications'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthProvider'



const NotificationProvider = ({ children }: PropsWithChildren) => {
    
    const { profile, updateToken } = useAuth()
  
    const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken | string>()
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
   
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
    
  const savePushToken = async (newToken: string) => {
    
    
    setExpoPushToken(newToken ?? '')
    if (!newToken) {
      return
    }
    //upadate the token in the database when there is profile
    if (profile) {
      //console.log('profile updated up on user profile')
      await supabase.from('profiles').update({expo_push_token: newToken}).eq('id', profile.id )
    } else {
      //or keep the token in state until the user logged in 
      updateToken(newToken)
      //console.log('user not logged in , expo_push token is not updated', newToken)
    }
    
  }

    useEffect(() => {
        registerForPushNotificationsAsync()
        .then((token) => savePushToken(token ?? ''))
        //.catch((error: any) => setExpoPushToken(`${error}`));
      if (notificationListener.current) {
          notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
        }
        
      if (notificationListener.current) {
          responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          
            console.log(response, 'response ');
          });
        }
        
        
        return () => {
            notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
    };

    }, [profile])
    return (
    <>
      {children}
    </>
  )
}

export default NotificationProvider