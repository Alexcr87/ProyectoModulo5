'use client'
import { useAuth } from '@/context/Authontext'
import React, { useState } from 'react'

const Dashboard = () => {
    const [open, setOpen] = useState<boolean>(false)
    const {userData} = useAuth()
    const userRoles = userData?.userData.roles.map(item => item.id)
    const isAdmin = userRoles?.includes(1)
    const isModerator = userRoles?.includes(4); 
  return (
    <>
        { (isAdmin || isModerator) &&<div>
        <div className={`${open ? "w-full md:w-80":"w-full md:w-14"} transition-all duration-300 bg-primaryColor p-2 items-start justify-center md:h-screen fixed opacity-80 z-40`}>
            <button onClick={()=>setOpen(true)} className={`${open && "hidden"} flex`}>
                <i className="fa-solid fa-bars text-2xl text-white"></i>
                <p className={`${open && "hidden"} text-white font-bold ml-4 md:hidden`}>Dashboard</p>
            </button>
            <button onClick={()=>setOpen(false)} className={`${!open && "hidden"} absolute right-4`}>
                <i className="fa-solid fa-x text-2xl text-white"></i>
            </button>

            <div className={`${!open && "hidden"} text-white font-bold mt-8 w-full`}>
                <a 
                    href="/groups" 
                    onClick={()=>setOpen(true)}
                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                        <i className="fa-solid fa-people-group"></i>
                        <p >Grupos</p>
                </a>
                <a 
                    href="/campaigns" 
                    onClick={()=>setOpen(true)}
                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                        <i className="fa-solid fa-check-to-slot"></i>
                        <p >Campañas</p>
                </a>
                <a 
                    href="/users" 
                    onClick={()=>setOpen(true)}
                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                        <i className="fa-solid fa-users"></i>
                        <p >Usuarios</p>
                </a>
                <a 
                    href="/results" 
                    onClick={()=>setOpen(true)}
                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                        <i className="fa-duotone fa-solid fa-chart-simple"></i>
                        <p >Resultados</p>
                </a>
                <a 
                    href="/perfilUser" 
                    onClick={()=>setOpen(true)}
                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                        <i className="fa-solid fa-user-pen"></i>
                        <p >Perfil</p>
                </a>
                <a 
                    href="/changePassword" 
                    onClick={()=>setOpen(true)}
                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                        <i className="fa-solid fa-lock"></i>
                        <p>Cambio De Contraseña</p>
                </a>
            </div>
        </div>
        <div className=''></div>
        </div>
        }
    </>
  )
}

export default Dashboard
