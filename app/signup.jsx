import { View, Text, Image, StatusBar, Platform, TextInput, TouchableOpacity, Pressable, Alert, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Feather, Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/loading';
import CustomKeyboardAvoidingView from '../components/CustomKeyboardAvoidingView';
import {useAuth} from '../context/authContext'

const Signup = () => {
    const {register} = useAuth()
    const router = useRouter()
    const [loading, setloading] = useState(false)
    const usernameRef = useRef('')
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const profileRef = useRef('')
    const hadleRegister = async () => {

        if (!usernameRef.current || !emailRef.current || !passwordRef.current || !profileRef.current) {
          
            Alert.alert('SignIn', 'Plase fill out all the fields')
            return
        }
        setloading(true)
        console.log(usernameRef.current,emailRef.current,passwordRef.current,profileRef.current)
        let response = await register(emailRef.current,passwordRef.current,usernameRef.current,profileRef.current)
        setloading(false)
        console.log('response:',response)
        if(!response.success){
            Alert.alert('signup',response.msg)
        }
    }
    return (
   
            <CustomKeyboardAvoidingView >
                <ScrollView contentContainerStyle={{flex:1}}>
                <StatusBar barStyle={Platform.OS === 'android' ? 'dark-content' : 'default'}></StatusBar>
                <View className="w-full flex-start h-[25%]">
                    <Image resizeMode='contain' style={{ height: '100%', width: '100%' }} source={require('../assets/images/signup-icon.png')}></Image>
                </View>
                <View className="px-5 gap-5">
                    <Text className="text-center font-semibold text-2xl">Sign Up</Text>
                    <View style={{ height: hp(7) }} className="bg-neutral-100 flex-row items-center rounded-xl px-4">
                        <Feather name='user' size={hp(2.7)} color='gray' />
                        <TextInput
                            onChangeText={(value) => usernameRef.current = value}
                           
                            className="flex-1 ml-2 font-semibold text-neutral-700"
                            placeholder='Username'
                            placeholderTextColor={'gray'}
                        />

                    </View>
                    <View style={{ height: hp(7) }} className="bg-neutral-100 flex-row items-center rounded-xl px-4">
                        <Octicons name='mail' size={hp(2.7)} color='gray' />
                        <TextInput
                            onChangeText={(value) => emailRef.current = value}
                           
                            className="flex-1 ml-2 font-semibold text-neutral-700"
                            placeholder='Email address'
                            placeholderTextColor={'gray'}
                        />

                    </View>
                    <View style={{ height: hp(7) }} className="bg-neutral-100 flex-row items-center rounded-xl px-4">
                        <Octicons name='lock' size={hp(2.7)} color='gray' />
                        <TextInput
                            onChangeText={(value) => passwordRef.current = value}
                           
                            className="flex-1 ml-2 font-semibold text-neutral-700"
                            placeholder='Password'
                            placeholderTextColor={'gray'}
                            secureTextEntry
                        />


                    </View>
                    <View style={{ height: hp(7) }} className="bg-neutral-100 flex-row items-center rounded-xl px-4">
                        <Feather name='image' size={hp(2.7)} color='gray' />
                        <TextInput
                            onChangeText={(value) => profileRef.current = value}
                           
                            className="flex-1 ml-2 font-semibold text-neutral-700"
                            placeholder='Image URL'
                            placeholderTextColor={'gray'}
                        />

                    </View>
                    <View>
                        {
                            loading ? (
                                <View className="justify-center">
                                    <Loading size={80}></Loading>
                                </View>
                            ) : (
                                <TouchableOpacity onPress={hadleRegister} className='bg-neutral-800 rounded-xl py-3 px-4'>
                                    <Text className="text-white text-center font-semibold text-xl">Sign Up</Text>
                                </TouchableOpacity>
                            )
                        }
                    </View>

                    <View className="flex-row justify-center">
                        <Text className="font-semibold text-neutral-500" >Already have an account? </Text>
                        <Pressable onPress={() => router.push('/signIn')}>
                            <Text className="font-bold text-neutral-800">Sign In</Text>
                        </Pressable>
                    </View>

                </View>
                </ScrollView>
            </CustomKeyboardAvoidingView>
        

    )
}

export default Signup