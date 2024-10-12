"use client"
import IAuth0 from '@/interfaces/IAuth0';
//contexto de autenticacion
import { userSession } from '@/interfaces/Session'
import {useEffect, useState, createContext, useContext} from 'react'

export interface AuthContextProps{
    userData: userSession | null;
    setUserData: (userData: userSession | null) => void;
    auth0UserData: IAuth0| null;
  setAuth0UserData: (userData: { name: string; email: string }) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  userData: null,
  setUserData: () => {},
  auth0UserData: null,
  setAuth0UserData: () => {},
})

//pasa el context a sus hijos (AuthProvide en Layout)
export const AuthProvider: React.FC<{ children: React.ReactNode}> = ({children}: { children: React.ReactNode}) => {
  const [userData, setUserData] = useState<userSession | null>(null)
  const [auth0UserData, setAuth0UserData] = useState<{ name: string; email: string } | null>(null)
  
      //sincroniza con localstorage
    useEffect(()=>{
      if(userData){
        localStorage.setItem("userSession", JSON.stringify({token: userData.token, userData: userData.userData}))
      }
    },[userData])

    useEffect(()=>{
        const userData = localStorage.getItem("userSession")
        setUserData(JSON.parse(userData!))
    },[])
  return (
    <AuthContext.Provider value={{ userData, setUserData, auth0UserData, setAuth0UserData }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
;
