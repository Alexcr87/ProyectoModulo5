
'use client'
import { validateFields } from '@/helpers/validateLogin';
import { IloginError, IloginProps } from '@/interfaces/ILogin';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { login } from '@/helpers/auth.helper';
import Swal from 'sweetalert2';
import Input from '../ui/Input';
import Boton from '../ui/Boton';


const LoginForm = () => {
    const router = useRouter();
    const initialState = {
      email:"",
      password:"",
      token: ""
    }
    
    const [dataUser, SetdataUser] = useState<IloginProps> (initialState);
    const [errors, SetErrors] = useState<IloginError>(initialState);
    
    // CAPTURO LA INFORMACION DE LOS INPUTS
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target;
    SetdataUser ({
      ...dataUser, [name]:value
    })
    }
    
      // ENVIO LOS DATOS AL BACK O GUARDO LOS DATOS EN EL ARRAY   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault ();
    
    if (Object.keys(errors).length > 0) { 
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    } else {
    //   const response = await login (dataUser);
    //   const {token, user} = response;
      const clearUser = await login(dataUser);
      if(clearUser.token){
        // AQUI ES DONDE GUARDO LOS NUEVOS DATOS DEL USUARIO EN EL NAVEGADOR PARA QUE SEA PERSISTENTE
         localStorage.setItem ('userSesion', JSON.stringify (clearUser))
         const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Ha iniciado sesión correctamente"
        });
         router.push ('/')
      }else{
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "error",
          title: clearUser.message
        });
        return
      }
    }
    }
    
    // VERIFICO SI EXISTE ALGUN ERROR EN LA VALIDACION DE LOS INPUTS
    useEffect (() =>{
      const errors = validateFields (dataUser)
      SetErrors (errors)
      }, [dataUser])
    
        return (
            <div className='my-4 text-center flex flex-col items-center bg-white shadow-lg px-4 rounded-lg'>
            {/* <Image src="/images/busto.png" alt="representacion inicio" width={200} height={200}/> */}
            <Image src="/images/logo.png" alt="imagenLogo" width={350} height={350} className='m-10' />
            <h1 className='font-bold text-2xl mt-4'>INICIAR SESION</h1>
            <form
              onSubmit={handleSubmit}
              className="mx-auto px-28 pb-20 rounded-lg"
            >

               <div className="flex flex-col mt-4">
                
                <Input
                  type="text"
                  name='email'
                  value={dataUser.email}
                  onChange={handleChange}
                  placeholder="Email"
                />
                </div>

                {errors.email && (
                  <div className="text-red-500 text-xs mt-2">{errors.email}</div>
                )}
        
        <div className="flex flex-col my-4">
                <Input
                  type="password"
                  name='password'
                  value={dataUser.password}
                  onChange={handleChange}
                  placeholder="Password"
                />
            </div>

                {errors.password && (
                  <div className="text-red-500 text-xs mt-2">{errors.password}</div>
                )}
              <Boton 
                type='submit'
                disabled={errors ? false: true}>
                  Iniciar Sesion
              </Boton>
             
            </form>
            </div>
          );
    };
    
    export default LoginForm;