import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Image } from 'expo-image'

const ChatRoomHeader = ({ user, router }) => {
    return (
        <Stack.Screen options={{
            title: '',
            headerShadowVisible: true, // by deafualt it is also true
            headerLeft: () => (
                <View className="flex-row items-center justify-start">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name='arrow-back-outline' size={hp(4)} color={'gray'} />
                    </TouchableOpacity>
                    <View className="flex-row items-center gap-2 ml-[2px]">
                        <Image 
                        source={user.profileUrl}
                        style={{height:hp(5.5),aspectRatio:1,borderRadius:100}}
                        />
                        <Text className="text-neutral-700 font-medium">{user?.username}</Text>
                    </View>
                </View>
            ),
            headerRight:()=>(
                <View className='flex-row items-center gap-4'>
                    <Ionicons name='call' size={hp(2.8)}/>
                    <Ionicons name='videocam' size={hp(2.8)}/>
                </View>
            )
        }} ></Stack.Screen>
    )
}

export default ChatRoomHeader