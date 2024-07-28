import { View, Text, TouchableOpacity, } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import{blurhash, formateDate, getRoomId} from '../utils/common'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { collection, doc, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebaseConfig'
import { useAuth } from '../context/authContext'

const ChatItem = ({ item,noBorder,router,currentUser }) => {
    const [lastMessage, setlastMessage] = useState(undefined)

    useEffect(()=>{
        let roomId = getRoomId(currentUser?.uid, item.userId)

        console.log("userId:",currentUser?.uid, 'itemId:', item.userId)
        //console.log(roomId)
        const docRef = doc(db, 'rooms', roomId)
        const messageRef = collection(docRef, 'messages')
        const q = query(messageRef, orderBy('createdAt', 'desc'))

        let unsubscribe = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                // console.log(doc.data())
                return doc.data();
            })
            setlastMessage(allMessages[0])

        })


        return unsubscribe;
    },[])

    const openChatroom = ()=>{
        router.push({pathname:'/chatRoom',params:item})
    }
    const renderTime =()=>{
        if(lastMessage){
          
           return formateDate(new Date(lastMessage.createdAt.seconds * 1000))
            
        }
    }
    const renderLastMessage =()=>{
        if(typeof lastMessage =='undefined') return 'Loading...'
        if(lastMessage){
            if(currentUser.uid==lastMessage.userId) return 'You: '+lastMessage?.text;
            return lastMessage?.text
        } else{
            return 'Say Hi 👏'
        }
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
                    <Text className="font-medium text-neutral-500">{renderTime()}</Text>
                </View>
                <Text className="font-medium text-neutral-500">{renderLastMessage()}</Text>
            </View>
        </TouchableOpacity>
        </View>
    )
}

export default ChatItem