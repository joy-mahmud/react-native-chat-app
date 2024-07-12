import { View, Text, Image, StatusBar, Platform, TextInput, TouchableOpacity, Pressable, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Octicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Loading from '../components/loading';

const SignIn = () => {
    const router = useRouter()
    const [loading, setloading] = useState(false)
    const emailRef = useRef('')
    const passwordRef = useRef('')
    const hadleLogin = async () => {
        
        if (!emailRef.current || !passwordRef.current) {
            Alert.alert('SignIn', 'Plase fill out all the fields')
            return
        }
    }
    return (
        <View style={{ paddingTop: StatusBar.currentHeight, flex: 1 }}>
            <StatusBar barStyle={Platform.OS === 'android' ? 'dark-content' : 'default'}></StatusBar>
            <View className="w-full flex-start h-[25%]">
                <Image resizeMode='contain' style={{ height: '100%', width: '100%' }} source={require('../assets/images/login.png')}></Image>
            </View>
            <View className="px-5 gap-5">
                <Text className="text-center font-semibold text-2xl">Sign In</Text>
                <View style={{ height: hp(7) }} className="bg-neutral-100 flex-row items-center rounded-xl px-4">
                    <Octicons name='mail' size={hp(2.7)} color='gray' />
                    <TextInput
                        onChange={(value) => emailRef.current = value}
                        className="flex-1 ml-2 font-semibold text-neutral-700"
                        placeholder='Email address'
                        placeholderTextColor={'gray'}
                    />

                </View>
                <View style={{ height: hp(7) }} className="bg-neutral-100 flex-row items-center rounded-xl px-4">
                    <Octicons name='lock' size={hp(2.7)} color='gray' />
                    <TextInput
                        onChange={(value) => passwordRef.current = value}
                        className="flex-1 ml-2 font-semibold text-neutral-700"
                        placeholder='Password'
                        placeholderTextColor={'gray'}
                        secureTextEntry
                    />


                </View>
                <Text className="text-right font-semibold">Forgot Password?</Text>
                <View>
                    {
                        loading ? (
                            <View className="justify-center">
                                <Loading size={80}></Loading>
                            </View>
                        ) : (
                            <TouchableOpacity onPress={hadleLogin} className='bg-neutral-800 rounded-xl py-3 px-4'>
                                <Text className="text-white text-center font-semibold text-xl">Sign In</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>

                <View className="flex-row justify-center">
                    <Text className="font-semibold text-neutral-500" >Don't have an account? </Text>
                    <Pressable onPress={() => router.push('/signup')}>
                        <Text className="font-bold text-neutral-800">Sign up</Text>
                    </Pressable>
                </View>

            </View>
        </View>
    )
}

export default SignIn