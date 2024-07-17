import { View, Text, SafeAreaView, StatusBar, Platform } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { blurhash } from '../utils/common'
import { useAuth } from '../context/authContext'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import MenuItem from './CustomMenuItem'
import { Feather, MaterialIcons } from '@expo/vector-icons'
const HomeHeader = () => {
    const { user, logout } = useAuth()
    const handleProfile = () => {

    }
    const handleLogout = async () => {
        await logout()
    }
    return (
        <SafeAreaView style={{ paddingTop: StatusBar.currentHeight }} className="rounded-b-xl  bg-neutral-800">
            <StatusBar barStyle={Platform.OS === 'android' ? 'default' : 'default'}></StatusBar>
            <View className='p-5 flex-row justify-between items-center'>
                <Text className="text-white text-semibold text-2xl">Chats</Text>
                <Menu>
                    <MenuTrigger
                        customStyles={{
                            triggerOuterWrapper: {
                                //trigger wrapper styles
                            }
                        }}
                    >
                        <Image
                            style={{ height: hp(4.3), aspectRatio: 1, borderRadius: 100 }}
                            source={user?.photoUrl}
                            placeholder={{ blurhash }}
                            transition={500}
                        />
                    </MenuTrigger>
                    <MenuOptions customStyles={{
                        optionsWrapper: {
                          
                            borderRadius: 8,
                        },
                        optionsContainer: {
                            marginTop: hp(4.8),
                            borderRadius: 8,
                            borderCurve:'continuous',
                            width: 160,
                            overflow:'hidden'
                        },
                 
                    }}>
                        {/* <MenuOption onSelect={() => alert(`Save`)} text='Save' />
                        <MenuOption onSelect={() => alert(`Delete`)} >
                            <Text style={{ color: 'red' }}>Delete</Text>
                        </MenuOption>
                        <MenuOption onSelect={() => alert(`Not called`)} disabled={true} text='Disabled' /> */}
                        <MenuItem
                            action={handleProfile}
                            text='Profile'
                            value={null}
                            icon={<Feather name='user' size={hp(2.5)}></Feather>}
                        ></MenuItem>
                        <Divider></Divider>
                        <MenuItem
                            action={handleLogout}
                            text='Sign out'
                            value={null}
                            icon={<MaterialIcons name='logout' size={hp(2.5)}></MaterialIcons>}
                        ></MenuItem>
                    </MenuOptions>
                </Menu>

            </View>
        </SafeAreaView>
    )
}
const Divider = () => {
    return (
        <View className="h-[.5px] bg-neutral-400"></View>
    )
}

export default HomeHeader