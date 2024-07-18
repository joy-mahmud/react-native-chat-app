import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CustomKeyboardAvoidingView from '../../components/CustomKeyboardAvoidingView';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db, } from '../../firebaseConfig';

const ChatRoom = () => {
    const { user } = useAuth()
    const item = useLocalSearchParams();
    const [messages, setmessages] = useState([])
    const router = useRouter()
    const textRef = useRef('')
    const inputRef = useRef(null)
    const scrollViewRef = useRef(null)

    useEffect(() => {
        createRoomIfNotExists();

        let roomId = getRoomId(user.uid, item.userId)
        const docRef = doc(db, 'rooms', roomId)
        const messageRef = collection(docRef, 'messages')
        const q = query(messageRef, orderBy('createdAt', 'asc'))

        let unsubscribe = onSnapshot(q, (snapshot) => {
            let allMessages = snapshot.docs.map((doc) => {
                return doc.data();
            })
            setmessages([...allMessages])

        })
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',updateScrollView
        )
        return ()=>{
            unsubscribe();
            keyboardDidShowListener.remove();
        }
    }, [])
    useEffect(() => {
        updateScrollView()
    }, [messages])
    const updateScrollView = () => {
        setTimeout(() => {
            scrollViewRef?.current?.scrollToEnd({ animated: true })
        }, 100)
    }
    //console.log(messages)
    const createRoomIfNotExists = async () => {
        let roomId = getRoomId(user?.uid, item?.userId)
        await setDoc(doc(db, "rooms", roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        })
    }
    const handleSendMessage = async () => {
        let message = textRef.current.trim()
        if (!message) return;
        try {
            let roomId = getRoomId(user?.uid, item.userId)
            const docRef = doc(db, 'rooms', roomId)
            const messageRef = collection(docRef, "messages")
            textRef.current = ""
            if (inputRef) inputRef?.current?.clear();
            const newDoc = await addDoc(messageRef, {
                userId: user?.uid,
                text: message,
                profileUrl: item?.profileUrl,
                senderName: user?.displayName,
                createdAt: Timestamp.fromDate(new Date())
            })
            //console.log('mesage:',message)
        } catch (error) {
            Alert.alert("Message", error.message)
        }
    }
   
    return (

        <View className='flex-1 bg-white'>
            <StatusBar style='dark'></StatusBar>

            <ChatRoomHeader user={item} router={router}></ChatRoomHeader>
            <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                <View className="flex-1">
                    <MessageList scrollVieRef={scrollViewRef} messages={messages} currentUser={user}></MessageList>
                </View>
                <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                    <View className="mx-3 flex-row justify-between bg-white border-[1px] border-neutral-400 rounded-full pl-5">
                        <TextInput
                            ref={inputRef}
                            onChangeText={value => textRef.current = value}
                            placeholder='Type your message ...'
                            style={{ fontSize: hp(2) }}
                            className="flex-1 font-medium mr-2 h-[40px] text-neutral-800"
                        ></TextInput>
                        <TouchableOpacity onPress={handleSendMessage}>
                            <MaterialCommunityIcons name="send-circle" size={39} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>

    )
}

export default ChatRoom