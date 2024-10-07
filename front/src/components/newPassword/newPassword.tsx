'use client'
import React, { useEffect, useState } from 'react'
import Input from '../ui/Input'
import Boton from '../ui/Boton'
import { useAuth } from '@/context/Authontext'
import { IChangePassword, IChangePassworError } from '@/interfaces/IChangePassword'
import { newPassword } from '@/helpers/auth.helper'
import { useRouter } from 'next/navigation'
import { validateChangePassword } from '@/helpers/validateChangePassword'

const NewPassword = () => {
    const {userData, setUserData} = useAuth()
    const router = useRouter()
    
    const initialState = {
        dni:"",
        password: "",
        newPassword:"",
        confirmPassword:""
    }

    const [data, setData] = useState<IChangePassword>(initialState)
    const [errors, setErrors] = useState<IChangePassworError>(initialState) 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target;
        setData({
            ...data, [name]: value
        })

    }
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        data.dni = userData?.userData.dni        
        await newPassword(data)
        localStorage.clear()
        setUserData(null)
        router.push("/login")
    }

    useEffect(() => {
        const errors = validateChangePassword(data);
        setErrors(errors);
    }, [data]);

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
                    required
                />
                {errors.password && (
                    <div className="text-red-500 text-xs mt-2">{errors.password}</div>
                )}
                <Input 
                    type='password' 
                    name='newPassword'
                    onChange={handleChange}
                    value={data.newPassword}
                    placeholder='Nueva Contraseña'
                    required
                />
                {errors.newPassword && (
                    <div className="text-red-500 text-xs mt-2">{errors.newPassword}</div>
                )}
                <Input 
                    type='password' 
                    name='confirmPassword'
                    onChange={handleChange}
                    value={data.confirmPassword}
                    placeholder='Confimar Contraseña'
                    required
                />
                {errors.confirmPassword && (
                    <div className="text-red-500 text-xs mt-2">{errors.confirmPassword}</div>
                )}
                <Boton>Renovar</Boton>
            </form>
      </div>
    </div>
  )
}

export default NewPassword
