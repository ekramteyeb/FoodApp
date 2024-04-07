import { Stack } from "expo-router"
import React from "react"
import { Link } from "expo-router"
import { Pressable} from "react-native"
import { FontAwesome } from "@expo/vector-icons"
import Colors from "@/src/constants/Colors"


export default function MenuStack() {

  return (
    <Stack>
        {/* <Stack.Screen name="index" options={{ title: 'Orders'}}/> */}
        <Stack.Screen name="list" options={{ headerShown: false}}/>
      </Stack>
  )
}