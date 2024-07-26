import { View, Text, TextInput, TouchableOpacity, Alert, Keyboard } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ChatRoomHeader from '../../components/ChatRoomHeader';
import MessageList from '../../components/MessageList';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../../context/authContext';
import { getRoomId } from '../../utils/common';
import { addDoc, collection, doc, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

const ChatRoom = () => {
    const { user } = useAuth();
    const item = useLocalSearchParams();
    const [messages, setMessages] = useState([]);
    const router = useRouter();
    const textRef = useRef('');
    const inputRef = useRef(null);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        createRoomIfNotExists();

        const roomId = getRoomId(user.uid, item.userId);
        const docRef = doc(db, 'rooms', roomId);
        const messageRef = collection(docRef, 'messages');
        const q = query(messageRef, orderBy('createdAt', 'asc'));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const allMessages = snapshot.docs.map((doc) => doc.data());
            setMessages(allMessages);
        });

        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', updateScrollView);

        return () => {
            unsubscribe();
            keyboardDidShowListener.remove();
        };
    }, []);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (scrollViewRef.current) {
                scrollViewRef.current.scrollToEnd({animated:true});
            }
        }, 100); // Delay to ensure layout updates are complete

        return () => clearTimeout(timeoutId);
    }, [messages]);

    const updateScrollView = () => {
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({animated:true});
        }
    };

    const createRoomIfNotExists = async () => {
        const roomId = getRoomId(user?.uid, item?.userId);
        await setDoc(doc(db, 'rooms', roomId), {
            roomId,
            createdAt: Timestamp.fromDate(new Date())
        });
    };

    const handleSendMessage = async () => {
        const message = textRef.current.trim();
        if (!message) return;
        try {
            const roomId = getRoomId(user?.uid, item.userId);
            const docRef = doc(db, 'rooms', roomId);
            const messageRef = collection(docRef, 'messages');
            textRef.current = '';
            if (inputRef.current) inputRef.current.clear();
            await addDoc(messageRef, {
                userId: user?.uid,
                text: message,
                profileUrl: item?.profileUrl,
                senderName: user?.displayName,
                createdAt: Timestamp.fromDate(new Date())
            });
        } catch (error) {
            Alert.alert('Message', error.message);
        }
    };

    return (
        <View className="flex-1 bg-white">
            <StatusBar style="dark" />
            <ChatRoomHeader user={item} router={router} />
            <View className="flex-1 justify-between bg-neutral-100 overflow-visible">
                <View className="flex-1">
                    <MessageList scrollViewRef={scrollViewRef} messages={messages} currentUser={user} />
                </View>
                <View style={{ marginBottom: hp(2.7) }} className="pt-2">
                    <View className="mx-3 flex-row justify-between bg-white border-[1px] border-neutral-400 rounded-full pl-5">
                        <TextInput
                            ref={inputRef}
                            onChangeText={(value) => (textRef.current = value)}
                            placeholder="Type your message ..."
                            style={{ fontSize: hp(2) }}
                            className="flex-1 font-medium mr-2 h-[40px] text-neutral-800"
                        />
                        <TouchableOpacity onPress={handleSendMessage}>
                            <MaterialCommunityIcons name="send-circle" size={39} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default ChatRoom;
