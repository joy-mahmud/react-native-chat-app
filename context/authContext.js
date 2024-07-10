import { Children, createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const ContextProvider =({Children})=>{
    const [user,setUser]=useState(null);
    const [isAuthenticated,setIsAuthenticated]=useState(undefined);

    useEffect(()=>{
        
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
            {Children}
        </AuthContext.Provider>
    )
}

const useAuth =()=>{
    const value = useContext(AuthContext);
    if(!value){
        throw new Error("useAuth must be wrapped inside Authenication context provider")
    }
}