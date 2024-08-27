
import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { registerForPushNotificationsAsync } from '@/src/lib/notifications'
import { ExpoPushToken } from 'expo-notifications'
import * as Notifications from 'expo-notifications'


const NotificationProvider = ({ children }: PropsWithChildren) => {
    
    const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken | string>()
    const [notification, setNotification] = useState<Notifications.Notification | undefined>(
    undefined
  );
   
    const notificationListener = useRef<Notifications.Subscription>();
    const responseListener = useRef<Notifications.Subscription>();

    useEffect(() => {
        registerForPushNotificationsAsync()
        .then(token => setExpoPushToken(token ?? ''))
        .catch((error: any) => setExpoPushToken(`${error}`));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
        });
        
        return () => {
            notificationListener.current &&
            Notifications.removeNotificationSubscription(notificationListener.current);
            responseListener.current &&
            Notifications.removeNotificationSubscription(responseListener.current);
    };

    }, [])
    console.log(expoPushToken, 'user push token')
    console.log(notification, 'notification')
    return (
    <>
      {children}
    </>
  )
}

export default NotificationProvider