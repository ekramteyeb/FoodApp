import { Stack } from "expo-router"
import React from "react"
import { Link } from "expo-router"
import { Pressable } from "react-native"
import {  FontAwesome5 } from "@expo/vector-icons"
import Colors from "@/src/constants/Colors"


export default function MenuStack() {

  return (
    <Stack
      screenOptions={{ 
          headerRight: () => (
          <><Link href="/cart" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome5
                  name="shopping-cart"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
              )}
            </Pressable>
          </Link>
            <Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome5
                    name="home"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link></>
        ),
        }}>
          <Stack.Screen name="index" options={{ title: 'Menu'}}/>
      </Stack>
  )
}