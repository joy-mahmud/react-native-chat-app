import { View, Text, Pressable, Image, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'expo-router'
import { useAuth } from '../../context/authContext'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Chatlist from '../../components/Chatlist'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db, usersRef } from '../../firebaseConfig'

const Home = () => {
    const [users, setusers] = useState([])
    const router = useRouter()
    const { user, logout } = useAuth()
    useEffect(() => {
        // console.log('home user')
         console.log("home:",user)

        if (user?.uid) {
            getUsers()
        }

    }, [])
    const getUsers = async () => {
        // const getQuery = query(usersRef, where('userId' != user?.uid))
        // const querySnapshot = await getDocs(getQuery)
        // let data = []
        // querySnapshot.forEach(item => {
        //     data.push({...item.data()})
        //     console.log(item)

        // });
        const q = query(usersRef, where("userId", "!=", user?.uid));

        const querySnapshot = await getDocs(q);
        let data=[]
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", ...doc.data());
            data.push({...doc.data()})


        });
        setusers(data)
    }

    const handleLogout = () => {
        logout()
    }
    return (
        <View className="flex-1 bg-white">
           
            {
                users.length > 0 ? (
                    <Chatlist currenntUser={user} users={users}></Chatlist>
                ) : (
                    <View className="flex items-center" style={{ top: hp(40) }}>
                        <ActivityIndicator size="large" color={'black'}></ActivityIndicator>
                    </View>
                )
            }

        </View>
    )
}

export default Home