import React from 'react'
import Image from 'next/image'
import Link from "next/link"

const NavBar = () => {
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
                <li>
                <Link href="/login" >Iniciar sesión</Link>
                    
                </li>
            </ul>
        </div>
    </nav>
  )
}

export default NavBar
