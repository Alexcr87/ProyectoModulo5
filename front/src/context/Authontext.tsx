"use client"
//contexto de autenticacion
import { userSession } from '@/interfaces/Session'
import {useEffect, useState, createContext, useContext} from 'react'

export interface AuthContextProps{
    userData: userSession | null;
    setUserData: (userData: userSession | null) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {}
})

//pasa el context a sus hijos (AuthProvide en Layout)
export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({children}: { children: React.ReactNode}) => {
  const [userData, setUserData] = useState<userSession | null>(null)
  
      //sincroniza con localstorage
    useEffect(()=>{
      if(userData){
        localStorage.setItem("userSession", JSON.stringify({token: userData.token, userData: userData.userData}))
      }
    },[userData])

    useEffect(() => {
      const storedUserData = localStorage.getItem("userSession");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }, []);
  return (
    <AuthContext.Provider value={{userData, setUserData}}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
;
