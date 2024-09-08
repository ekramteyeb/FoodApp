import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { registerForPushNotificationsAsync } from '@/src/lib/notifications'
import { ExpoPushToken } from 'expo-notifications'
import * as Notifications from 'expo-notifications'
import { supabase } from '../lib/supabase'
import { useAuth } from './AuthProvider'
import { useRouter } from 'expo-router'

const NotificationProvider = ({ children }: PropsWithChildren) => {
  const { profile, updateToken } = useAuth()
  const router = useRouter()

  const [expoPushToken, setExpoPushToken] = useState<ExpoPushToken | string>()
  const [notification, setNotification] = useState<Notifications.Notification | undefined>(undefined)

  const notificationListener = useRef<Notifications.Subscription>()
  const responseListener = useRef<Notifications.Subscription>()

  const savePushToken = async (newToken: string) => {
    setExpoPushToken(newToken ?? '')

    if (!newToken) {
      return
    }

    // Update the token in the database when the user has a profile
    if (profile) {
      await supabase.from('profiles').update({ expo_push_token: newToken }).eq('id', profile.id)
    } else {
      // Keep the token in state until the user logs in
      updateToken(newToken)
    }
  }

  useEffect(() => {
    // Register for push notifications and save the token
    registerForPushNotificationsAsync()
      .then((token) => savePushToken(token ?? ''))

    // Register the notification received listener
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification)
      setNotification(notification)
    })

    // Register the notification response listener (for when a notification is clicked)
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      const data = response.notification.request.content.data

      if (data && data.link) {
        // Navigate to the deep link passed in the notification's data
        router.push(data.link)
      }

      console.log('Notification response:', response)
      console.log('Notification response:', notification)
      
    })

    // Clean up listeners on component unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current)
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current)
      }
    }
  }, [notification])

  return <>{children}</>
}

export default NotificationProvider
