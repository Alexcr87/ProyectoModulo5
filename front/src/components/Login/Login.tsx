
'use client'

import Login from '@/helpers/login.helper';
import { validateFields } from '@/helpers/validateLogin';
import { IloginError, IloginProps } from '@/interfaces/ILogin';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


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
    alert ('hay un error')
    } else {
    //   const response = await login (dataUser);
    //   const {token, user} = response;
      const clearUser = Login
      // AQUI ES DONDE GUARDO LOS NUEVOS DATOS DEL USUARIO EN EL NAVEGADOR PARA QUE SEA PERSISTENTE
       localStorage.setItem ('userSesion', JSON.stringify ({userData:clearUser}))
       router.push ('/');
    }
    }
    
    // VERIFICO SI EXISTE ALGUN ERROR EN LA VALIDACION DE LOS INPUTS
    useEffect (() =>{
      const errors = validateFields (dataUser)
      SetErrors (errors)
      }, [dataUser])
    
        return (
            <div className='mt-40 text-center'>
            <h1>INICIAR SESION</h1>
            <form
              onSubmit={handleSubmit}
              className="max-w-lg mx-auto px-28 py-20 rounded-lg shadow-lg"
            >

               <div className="flex flex-col mt-4">
                <input
                  type="text"
                  name='email'
                  value={dataUser.email}
                  onChange={handleChange}
                  placeholder="email"
                  className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                />
                </div>

                {errors.email && (
                  <div className="text-red-500 text-xs mt-2">{errors.email}</div>
                )}
        
        <div className="flex flex-col mt-4">
                <input
                  type="password"
                  name='password'
                  value={dataUser.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 outline-none focus:border-tertiaryColor shadow-xl"
                />
            </div>

                {errors.password && (
                  <div className="text-red-500 text-xs mt-2">{errors.password}</div>
                )}

              <button
                type="submit"
                disabled={errors ? false :true}
                className="border rounded-full w-40 h-12 bg-tertiaryColor text-white m-20 "
              >
                    INICIAR SESION
              </button>
              
            </form>
            </div>
          );
    };
    
    export default LoginForm;