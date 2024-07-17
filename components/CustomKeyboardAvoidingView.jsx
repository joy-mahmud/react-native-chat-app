import { View, Text, KeyboardAvoidingView, Platform, StatusBar, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'



export default function CustomKeyboardAvoidingView({children}) {
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            style={{ flex: 1}}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              
                    {
                        children
                    }

            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}