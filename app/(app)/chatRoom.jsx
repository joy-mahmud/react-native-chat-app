import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ChatRoom = () => {
    const item = useLocalSearchParams();
    console.log('chat item',item)
    const router =useRouter()
  return (
    <View className='flex-1 bg-white'>
        <StatusBar style='dark'></StatusBar>

      <ChatRoomHeader user={item} router={router}></ChatRoomHeader>
      <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
<View className="flex-1">
    <MessageList></MessageList>
</View>
<View style={{marginBottom:hp(1.7)}} className="pt-2">
    <View className="flex-row justify-between items-center mx-3">
<View className="flex-row justify-between bg-white border-[1px] border-neutral-400 rounded-full pl-5">
    <TextInput
        placeholder='Type your message ...'
        style={{fontSize:hp(2)}}
        className="flex-1 mr-2 h-[40px]"
    ></TextInput>
</View>
    </View>

</View>
      </View>
    </View>
  )
}

export default ChatRoom