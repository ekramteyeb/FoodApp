import { Stack } from "expo-router"
import React from "react"
import { Link } from "expo-router"
import { Pressable } from "react-native"
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons"
import Colors from "@/src/constants/Colors"


export default function MenuStack() {

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: 'Menu', 
        headerRight: () => (
          <><Link href="/(admin)/menu/create" asChild>
            <Pressable>
              {({ pressed }) => (
                <FontAwesome5
                  name="plus"
                  size={25}
                  color={Colors.light.tint}
                  style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }} />
              )}
            </Pressable>
          </Link><Link href="/(user)/" asChild>
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