import { Stack } from "expo-router"
import React from "react"
import { Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/src/constants/Colors"


export default function MenuStack() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Orders', 
        headerRight: () => (
          <><Link href="/(admin)/menu/create" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="plus"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
              )}
            </Pressable>
          </Link><Link href="/" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="home"
                    size={25}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
                )}
              </Pressable>
            </Link></>
        ),
      }} />
      <Stack.Screen name="[id]" options={{
        title: 'Menu', 
        headerRight: () => (
          <Link href="/" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome
                  name="pencil"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                />
              )}
            </Pressable>
          </Link>
        ),
      }} />
    </Stack>
  )
}