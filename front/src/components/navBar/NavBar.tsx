'use client'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { IloginProps } from '@/interfaces/ILogin'

const NavBar = () => {
    
    const [userSesion, setUserSesion] = useState<IloginProps>()
    const pathname = usePathname()

    useEffect(()=>{
        const localUser = localStorage.getItem("userSesion")
        setUserSesion(JSON.parse(localUser!));
    },[pathname])

    const handleClose = ()=>{
        localStorage.clear()
        setUserSesion(undefined);
        alert("Gracias por visitar nuestra web, vuelve pronto")
    }

  return (
    <nav className='bg-primaryColor h-14 pl-8 flex items-center justify-between fixed w-full z-50'>
        <div className='flex items-center'>
            <Image src="/images/logo.png" alt="imagenLogo" width={40} height={40}/>
            <h2 className='text-cuartiaryColor'>VotingSystem</h2>
        </div>
        <div>
            <ul className='flex gap-4 pr-8 text-cuartiaryColor'>
 
                <li>
                <Link href="/register" >Registrar</Link>
                </li>
                <li>
                    <Link href="/candidates">
                        Candidatos
                    </Link>
                </li>
                <li>
                    <Link href="/users">
                        Usuarios
                    </Link>
                </li>
                <li>
                    <Link href="/">
                        ¿Quiénes somos?
                    </Link>
                </li>
                    {
                        userSesion?.token ? (
                            <li>
                                <button onClick={handleClose}>Cerrar Sesion</button>
                            </li>
                        ):(
                            <li>
                                <Link href="/login" >Iniciar Sesión</Link>
                            </li>
                        )
                    }

            </ul>
        </div>
    </nav>
  )
}

export default NavBar
