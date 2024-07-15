import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/authContext'

const Home = () => {
    const router = useRouter()
    const {user,logout}=useAuth()
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
     <View>
        <Text>username: {user.username}</Text>
        <Text>profileUrl: {user.profileUrl}</Text>
        <Image resizeMode='contain' height={100} width={120} source={`${user.profileUrl}`}></Image>
        
     </View>
    </View>
  )
}

export default Home