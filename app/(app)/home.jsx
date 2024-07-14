import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const Home = () => {
    const router = useRouter()
  return (
    <View>
      <Text>Home</Text>
      <Pressable onPress={()=>router.push('/signIn')}>
        <Text>Go to SignIn</Text>
      </Pressable>
    </View>
  )
}

export default Home