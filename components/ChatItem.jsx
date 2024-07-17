import { View, Text, TouchableOpacity, } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import{blurhash} from '../utils/common'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'

const ChatItem = ({ item,noBorder,router }) => {
    const openChatroom = ()=>{
        router.push({pathname:'/chatRoom',params:item})
    }

    return (
        <View className="">
        <TouchableOpacity onPress={openChatroom} className={`flex-row justify-between pb-2 items-center gap-3 mb-4`}>
            <Image
                style={{ height: hp(6), width:hp(6) }}
                source={item?.profileUrl}
                placeholder={{ blurhash }}
                transition={500}
                className="rounded-full"
            />
            <View className="flex-1">
                <View className='flex-row justify-between items-center'>
                    <Text className="text-[18px] font-semibold text-neutral-800">
                        {item?.username}
                    </Text>
                    <Text className="font-medium text-neutral-500">Time</Text>
                </View>
                <Text className="font-medium text-neutral-500">message</Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default ChatItem