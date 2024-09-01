import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Redirect, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { useAuth } from '@/src/providers/AuthProvider';

import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { session } = useAuth()
  
  //protect the route from unauthorized users 
  if(!session) {
    return (<Redirect href={'/'} />)
  }
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      {/* referencing the index tab and hide it since it not neccessary */}
      <Tabs.Screen name='index' options={{ href: null }} />
      
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown:false, //to hide the stack header
          tabBarIcon: ({ color }) => <TabBarIcon name="cutlery" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
           headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
          
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          
        }}
      />
      
      
    </Tabs>
  );
}