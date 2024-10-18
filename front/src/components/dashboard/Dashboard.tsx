'use client'
import { useAuth } from '@/context/Authontext'
import Link from 'next/link' 
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Swal from 'sweetalert2'

const Dashboard = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [menuState, setMenuState] = useState<{ [key: string]: boolean }>({}) 
    const {userData, setUserData} = useAuth()
    const userRoles = userData?.userData.roles.map(item => item.id)
    const isAdmin = userRoles?.includes(1)
    const isModerator = userRoles?.includes(4); 
    const router = useRouter()

    // Función para alternar el estado de un submenú
    const toggleSubMenu = (menuKey: string) => {
        setMenuState(prevState => ({
            ...prevState,
            [menuKey]: !prevState[menuKey]
        }))
    }
    const handleClose = () => {
        router.push('/api/auth/logout')
         // Cierre de sesión local
        localStorage.clear();
        setOpen(false)
        setUserData(null);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            customClass: { container: 'mt-12' },
            didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
            }
        });
        Toast.fire({
            icon: "success",
            title: "Gracias por visitar nuestra web, vuelve pronto"
        });
        router.push('/');
    
}

    return (
        <>
            { (isAdmin || isModerator) &&
            <div>
                <div className={`${open ? "w-full md:w-80":"w-full md:w-14"} transition-all duration-300 bg-primaryColor p-2 items-start justify-center md:h-screen fixed opacity-80 z-40`}>
                    <button onClick={() => setOpen(true)} className={`${open && "hidden"} flex`}>
                        <i className="fa-solid fa-bars text-2xl text-white"></i>
                        <p className={`${open && "hidden"} text-white font-bold ml-4 md:hidden`}>Dashboard</p>
                    </button>
                    <button onClick={() => setOpen(false)} className={`${!open && "hidden"} absolute right-4`}>
                        <i className="fa-solid fa-x text-2xl text-white"></i>
                    </button>
                    <div className={`${!open && "hidden"} text-white font-bold mt-8 ml-4 w-full`}>
                        <p>Bienvenido</p>
                        {userData?.userData.name}
                    </div>

                    <div className={`${!open && "hidden"} text-white font-bold mt-8 w-full`}>
                        <a href="#"
                            onClick={() => toggleSubMenu('groupsMenu')} // Alternar submenú de Grupos
                            className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                                <i className="fa-solid fa-people-group"></i>
                                <p>Grupos</p>
                                <i className={`fa-solid fa-chevron-${menuState['groupsMenu'] ? "up" : "down"} ml-auto`}></i>
                        </a>
                        {menuState['groupsMenu'] && (
                            <div className="pl-6">
                                <Link href="/groups"
                                    onClick={() => setOpen(false)}
                                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-2'>
                                        <p>Ver Grupos</p>
                                </Link>
                                <Link href="/users"
                                    onClick={() => setOpen(false)}
                                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-2'>
                                        <p>Asignar Grupos</p>
                                </Link>
                            </div>
                        )}

                        <Link href="/campaigns"
                            onClick={() => setOpen(false)}
                            className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                                <i className="fa-solid fa-check-to-slot"></i>
                                <p>Campañas</p>
                        </Link>

                        <a href="#"
                            onClick={() => toggleSubMenu('usersMenu')} // Alternar submenú de Usuarios
                            className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                                <i className="fa-solid fa-users"></i>
                                <p>Usuarios</p>
                                <i className={`fa-solid fa-chevron-${menuState['usersMenu'] ? "up" : "down"} ml-auto`}></i>
                        </a>
                        {menuState['usersMenu'] && (
                            <div className="pl-6">
                                <Link href="/users"
                                    onClick={() => setOpen(false)}
                                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-2'>
                                        <p>Ver Usuarios</p>
                                </Link>
                                <Link href="/registerUsers"
                                    onClick={() => setOpen(false)}
                                    className='flex items-center gap-3 hover:bg-secundaryColor w-full p-2'>
                                        <p>Agregar Usuario</p>
                                </Link>
                            </div>
                        )}

                        <Link href="/results"
                            onClick={() => setOpen(false)}
                            className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                                <i className="fa-duotone fa-solid fa-chart-simple"></i>
                                <p>Resultados</p>
                        </Link>

                        <Link href="/perfilUser" 
                            onClick={() => setOpen(false)}
                            className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                                <i className="fa-solid fa-user-pen"></i>
                                <p>Perfil</p>
                        </Link>

                        <Link href="/changePassword"
                            onClick={() => setOpen(false)}
                            className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                                <i className="fa-solid fa-lock"></i>
                                <p>Cambio De Contraseña</p>
                        </Link>
                    </div>
                    <div className={`${!open && "hidden"} text-white font-bold mt-8 w-full`}>
                    <Link href="/"
                            onClick={handleClose}
                            className='flex items-center gap-3 hover:bg-secundaryColor w-full p-4'>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <p>Cerrar Seccion</p>
                        </Link>
                    </div>
                </div>
            </div>
            }
        </>
    )
}

export default Dashboard
