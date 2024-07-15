import { createContext, useContext, useEffect, useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebaseConfig'
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebaseConfig'
const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);

    useEffect(() => {
        // setTimeout(()=>{
        //     setIsAuthenticated(false)
        // },3000)
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsAuthenticated(true)
                setUser(user)
                updateUserData(user.uid)
            } else {
                setIsAuthenticated(false)
                setUser(null)
            }
        })


        return unsubscribe
    }, [])
    const updateUserData = async (userId)=>{
        const docRef = doc(db,'users',userId)
        const docSnap = await getDoc(docRef)
        if(docSnap.exists()){
            let data = docSnap.data()
            setUser({...user,username:data.username,profileUrl:data.profileUrl,userId:data.userId})
        }
    }

    const login = async (email, password) => {
        try {
            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    setUser(user)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                  });

        } catch (error) {
            console.log(error.message)
            let msg = error.message
            if(msg.includes('auth/invalid-email')) msg ="Invalid email"
            if(msg.includes('auth/invalid-credential')) msg ="Invalid credentials"
            return { success: false, msg }
        }
    }
    const logout = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    const register = async (email, password, username, profileUrl) => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
            console.log('response:', response.user)

            await setDoc(doc(db, 'users', response?.user?.uid), {
                username,
                profileUrl,
                userId: response?.user?.uid
            })
            return { success: true, data: response?.user }
        } catch (error) {
            let msg = error.message
            if(msg.includes('auth/invalid-email')) msg ="Invalid email"
            return { success: false, msg }
        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, register }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const values = useContext(AuthContext);
    if (!values) {
        throw new Error("useAuth must be wrapped inside Authenication context provider")
    }
    return values
}