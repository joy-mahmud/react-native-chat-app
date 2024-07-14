import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/authContext'

const Home = () => {
    const router = useRouter()
    const {logout}=useAuth()
    const handleLogout = ()=>{
        logout()
    }
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={()=>router.push('/signIn')}>
        <Text>Go to SignIn</Text>
      </Pressable>
      <Pressable onPress={handleLogout}>
        <Text>logout</Text>
      </Pressable>
    </View>
  )
}

export default Home