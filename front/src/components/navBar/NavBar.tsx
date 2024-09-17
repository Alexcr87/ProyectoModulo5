import React from 'react'
import Image from 'next/image'

const NavBar = () => {
  return (
    <div className='bg-primaryColor h-14 pl-8 flex items-center justify-between'>
        <div className='flex items-center'>
            <Image src="/images/logo.png" alt="imagenLogo" width={40} height={40}/>
            <h2 className='text-cuartiaryColor'>SistemaVotaciones</h2>
        </div>
        <div>
            <ul className='flex gap-4 pr-8 text-cuartiaryColor'>
                <li>
                    Registrar
                </li>
                <li>
                    Resultado
                </li>
                <li>
                    Sobre Nosotros
                </li>
                <li>
                    Iniciar Sesión
                </li>
            </ul>
        </div>
    </div>
  )
}

export default NavBar
