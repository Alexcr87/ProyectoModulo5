'use client'
import React, { useEffect, useState } from 'react'
import Input from '../ui/Input'
import Boton from '../ui/Boton'
import { IChangePassword, IChangePasswordError } from '@/interfaces/IChangePassword'
import { changePassword } from '@/helpers/changePassword.helper'
import { useAuth } from '@/context/Authontext'
import Swal from 'sweetalert2'
import { useRouter } from 'next/navigation'
import { validateChangePassword } from '@/helpers/validateChangePassword'
import Spinner from '../ui/Spinner'
import { Tooltip } from 'react-tooltip';

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);

    const {userData, setUserData} = useAuth()
    const router = useRouter()

    // Capturar el parámetro "redirect" de la URL para verificar si viene del correo
    const [fromEmail, setFromEmail] = useState(false);


    useEffect(() => {
        // Detectar si el parámetro "redirect" es "change-password"
        const queryParams = new URLSearchParams(window.location.search);
        if (queryParams.get('redirect') === 'changePassword') {
            setFromEmail(true); // Si viene del correo, activar el estado
        }
    }, []);

    const initialState = {
        dni: "",
        password:"",
        newPassword:"",
        confirmPassword:""
    }

    const [data, setData] = useState<IChangePassword>(initialState)
    const [error, setError] = useState<IChangePasswordError>(initialState)
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
        const {name, value} = event.target;
        setData({
            ...data, [name]: value
        });
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        setLoading(true)
        if(!userData?.userData.dni) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                customClass: {
                    container: 'mt-12'
                },
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "dni no encontrado"
            });
            return
        }

        if (!userData?.userData.dni && fromEmail) {
            // Redirigir al login para capturar DNI
            router.push('/login?redirect=changePassword');
            return;
        }


        data.dni = userData?.userData.dni
        await changePassword(data)
        localStorage.clear()
        setUserData(null)
        router.push("/login")
        setLoading(false)
    }
    
    useEffect(() => {
        const errors = validateChangePassword(data);
        setError(errors);
    }, [data]);
    
    return (
        <div className='bg-cuartiaryColor min-h-[85vh] flex justify-center'>
          <div className='bg-white w-full md:w-[50%] my-8 shadow-2xl rounded-2xl flex flex-col items-center px-16'>
            <h2 className='text-2xl font-bold my-12'>Cambio De Contraseña</h2>
            {loading ? (
              <Spinner />
            ) : (
              <form onSubmit={handleSubmit} className='w-full gap-8 flex flex-col items-center'>
                <Input 
                  type="password"
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  placeholder='Contraseña actual'
                  required
                  data-tooltip-id="passwordTooltip"
                  data-tooltip-content="Introduce tu contraseña actual"
                />
                {error.password && (
                  <div className="text-red-500 text-xs mt-2">{error.password}</div>
                )}
                <Input 
                  type="password"
                  name="newPassword"
                  value={data.newPassword}
                  onChange={handleChange}
                  placeholder='Contraseña nueva'
                  required
                  data-tooltip-id="newPasswordTooltip"
                  data-tooltip-content="Introduce tu nueva contraseña"
                />
                {error.newPassword && (
                  <div className="text-red-500 text-xs mt-2">{error.newPassword}</div>
                )}
                <Input 
                  type="password"
                  name='confirmPassword'
                  value={data.confirmPassword}
                  onChange={handleChange}
                  placeholder='Confirmar contraseña'
                  required
                  data-tooltip-id="confirmPasswordTooltip"
                  data-tooltip-content="Repite la nueva contraseña para confirmarla"
                />
                {error.confirmPassword && (
                  <div className="text-red-500 text-xs mt-2">{error.confirmPassword}</div>
                )}
                <div className='w-full md:w-[50%]'>
                  <Boton>Renovar</Boton>
                </div>
              </form>
            )}
          </div>
          {/* Tooltip components */}
          <Tooltip id="passwordTooltip" />
          <Tooltip id="newPasswordTooltip" />
          <Tooltip id="confirmPasswordTooltip" />
        </div>
      );
}

export default ChangePassword
