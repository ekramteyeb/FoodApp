import React from 'react';
//import FontAwesome from '@expo/vector-icons/FontAwesome';
import {  Redirect, Tabs } from 'expo-router';

import Colors from '@/src/constants/Colors';
//import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import { useAuth } from '@/src/providers/AuthProvider';
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome5 size={20} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  //const colorScheme = useColorScheme();
  const { isAdmin } = useAuth()

  //if the user is not admin he is not allowed here
  if(!isAdmin) {
    return (<Redirect href={'/'} />)
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.background,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
        tabBarStyle: {
          backgroundColor:Colors.light.tint
        }
      }}>
      {/* referencing the index tab and hide it since it not neccessary */}
      <Tabs.Screen name='index' options={{ href: null }} />
      
      <Tabs.Screen
        name="menu"
        options={{
          title: 'Menu',
          headerShown:false, //to hide the stack header
          tabBarIcon: ({ color }) => <TabBarIcon name="bars" color={color} />,
          
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
      
    </Tabs>
  );
}
