'use client'
import React, { useState } from 'react'
import Input from '../ui/Input'
import Boton from '../ui/Boton'
import { useAuth } from '@/context/Authontext'
import { IChangePassword } from '@/interfaces/IChangePassword'
import { newPassword } from '@/helpers/auth.helper'

const NewPassword = () => {
    const {userData} = useAuth()
    
    const initialState = {
        dni:userData?.userData.dni,
        password: "",
        newPassword:"",
        confirmPassword:""
    }

    const [data, setData] = useState<IChangePassword>(initialState)
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target;
        setData({
            ...data, [name]: value
        })

    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        await newPassword(data)
    }

  return (
    <div className='bg-cuartiaryColor min-h-[85vh] flex justify-center items-center'>
      <div className='bg-white w-[50%] py-4 px-16 rounded-2xl shadow-2xl flex items-center flex-col'>
            <h2 className='font-bold text-2xl m-4'>Renovacion de Contraseña</h2>
            <form onSubmit={handleSubmit} className='gap-8 flex flex-col w-full'>
                <Input 
                    type='password' 
                    name="password"
                    onChange={handleChange}
                    value={data.password}
                    placeholder='Contraseña actual'
                />
                <Input 
                    type='password' 
                    name='newPassword'
                    onChange={handleChange}
                    value={data.newPassword}
                    placeholder='Nueva Contraseña'
                />
                <Input 
                    type='password' 
                    name='confirmPassword'
                    onChange={handleChange}
                    value={data.confirmPassword}
                    placeholder='Confimar Contraseña'
                />
                <Boton>Renovar</Boton>
            </form>
      </div>
    </div>
  )
}

export default NewPassword
