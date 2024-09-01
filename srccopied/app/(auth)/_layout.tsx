import { Redirect, Stack } from "expo-router"
import React from "react"
import { useAuth } from "@/src/providers/AuthProvider"



export default function MenuStack() {

  const { session } = useAuth()
  
  if(session) {
    return (<Redirect href={'/'} />)
  }
  
  return (
    <Stack />
  )
}