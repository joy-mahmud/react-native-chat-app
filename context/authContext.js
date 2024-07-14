import {createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, onAuthStateChanged, signOut} from 'firebase/auth'
import {auth} from '../firebaseConfig'
import { doc, setDoc } from "firebase/firestore";
import {db} from '../firebaseConfig'
const AuthContext = createContext();

export const AuthContextProvider =({children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(undefined);

    useEffect(()=>{
        // setTimeout(()=>{
        //     setIsAuthenticated(false)
        // },3000)
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            if(user){
                setIsAuthenticated(true)
                setUser(user)
            }else{
                setIsAuthenticated(false)
                setUser(null)
            }
        })
        

        return unsubscribe
    },[])

    const login = async (email,password)=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    const logout = async ()=>{
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    const register = async (email,password,username,profileUrl)=>{
        try {
            const response = createUserWithEmailAndPassword(auth,email,password)
            console.log('response:',response)

            await setDoc(doc(db,'users',response?.user?.uid),{
                username,
                profileUrl,
                userId:response?.user?.uid
            })
            return {success:true,data:response?.user}
        } catch (error) {
            return {success:false,msg:error.message}
        }
    }

    return(
        <AuthContext.Provider value={{user,isAuthenticated,login,logout,register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth =()=>{
    const values = useContext(AuthContext);
    if(!values){
        throw new Error("useAuth must be wrapped inside Authenication context provider")
    }
    return values
}