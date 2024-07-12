import {createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider =({children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(undefined);

    useEffect(()=>{
        setTimeout(()=>{
            setIsAuthenticated(true)
        },3000)
    },[])

    const login = async (email,password)=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    const logout = async ()=>{
        try {
            
        } catch (error) {
            console.log(error)
        }
    }
    const register = async (email,password,username,profileUrl)=>{
        try {
            
        } catch (error) {
            console.log(error)
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