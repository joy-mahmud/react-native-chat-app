import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const MessageList = ({ messages, currentUser, scrollViewRef }) => {
    return (
        <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} className="px-3">
            {messages.map((msg, index) => {
                if (currentUser?.uid === msg.userId) {
                    return (
                        <View key={index} className="p-2 rounded-md self-end bg-neutral-800 mb-2" style={{ maxWidth: wp(80) }}>
                            <Text className="font-medium text-white">{msg.text}</Text>
                        </View>
                    );
                } else {
                    return (
                        <View key={index} className="p-2 self-start rounded-md bg-neutral-200 mb-2" style={{ maxWidth: wp(80) }}>
                            <Text className="font-medium text-neutral-800">{msg.text}</Text>
                        </View>
                    );
                }
            })}
        </ScrollView>
    );
};

export default MessageList;