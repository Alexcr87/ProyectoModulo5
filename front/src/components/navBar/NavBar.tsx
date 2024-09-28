'use client'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { IloginProps } from '@/interfaces/ILogin'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'

const NavBar = () => {
    const router = useRouter()
    const [userSesion, setUserSesion] = useState<IloginProps>()
    const [isDropdownOpen, setDropdownOpen] = useState(false) // Estado para el dropdown de Usuarios
    const [isCampaignDropdownOpen, setCampaignDropdownOpen] = useState(false) // Estado para el dropdown de Campañas
    const pathname = usePathname()

    const campaignDropdownRef = useRef<HTMLLIElement>(null); // Referencia al li del dropdown de campañas
    const usersDropdownRef = useRef<HTMLLIElement>(null); // Referencia al li del dropdown de usuarios

    useEffect(() => {
        const localUser = localStorage.getItem("userSesion")
        setUserSesion(JSON.parse(localUser!));
    },[pathname])


    const handleClose = () => {
        localStorage.clear()
        setUserSesion(undefined);
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Gracias por visitar nuestra web, vuelve pronto"
          });
        router.push("/")
    }

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen) // Alterna el estado del dropdown de Usuarios
    }

    const closeDropdown = ()=>{
        setCampaignDropdownOpen(false)
        setDropdownOpen(false)
    }

    const toggleCampaignDropdown = () => {
        setCampaignDropdownOpen(!isCampaignDropdownOpen) // Alterna el estado del dropdown de Campañas
    }

    const handleClickOutside = (event: MouseEvent) => {
        // Si se hace clic fuera del dropdown de campañas
        if (campaignDropdownRef.current && !campaignDropdownRef.current.contains(event.target as Node)) {
            setCampaignDropdownOpen(false);
        }
        // Si se hace clic fuera del dropdown de usuarios
        if (usersDropdownRef.current && !usersDropdownRef.current.contains(event.target as Node)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (

        <nav className='bg-primaryColor opacity-80 h-14 pl-8 flex items-center justify-between fixed w-full z-50'>
            <Link href="/">
                <div className='flex items-center'>
                    <Image src="/images/logo.png" alt="imagenLogo" width={180} height={230} className='invert'/>
                    {/* <h2 className='text-cuartiaryColor'>VotingSystem</h2> */}
                </div>
            </Link>
            <div>
                <ul className='flex gap-4 pr-8 text-cuartiaryColor'>
                    {!userSesion ? (
                        <>
                            <li>
                                <Link href="/registerUser">Registrarme</Link>
                            </li>
                            <li>
                                <Link href="/login">Iniciar Sesión</Link>
                            </li>
                            <li>
                                <Link href="/aboutus">¿Quiénes somos?</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            {/* Dropdown de Campañas */}
                            <li className="relative" ref={campaignDropdownRef}>
                                <button onClick={toggleCampaignDropdown} className="dropdown-toggle">
                                    Campañas
                                </button>
                                {isCampaignDropdownOpen && (
                                    <div className="dropdown-menu absolute bg-white text-black p-2 shadow-md">
                                        <Link href="/campaign" className="block px-4 py-2 hover:bg-primaryColor hover:text-cuartiaryColor" onClick={closeDropdown}>Crear campaña</Link>
                                        <Link href="/campaigns" className="block px-4 py-2 hover:bg-primaryColor hover:text-cuartiaryColor" onClick={closeDropdown}>Mis campañas</Link>
                                    </div>
                                )}
                            </li>
                            {/* Dropdown de Usuarios */}
                            <li className="relative" ref={usersDropdownRef}>
                                <button onClick={toggleDropdown} className="dropdown-toggle">
                                    Usuarios
                                </button>
                                {isDropdownOpen && (
                                    <div className="dropdown-menu absolute bg-white text-black p-2 shadow-md">
                                        <Link href="/register" className="block px-4 py-2 hover:bg-primaryColor hover:text-cuartiaryColor" onClick={closeDropdown}>Crear usuario</Link>
                                        <Link href="/users" className="block px-4 py-2 hover:bg-primaryColor hover:text-cuartiaryColor" onClick={closeDropdown}>Mis usuarios</Link>
                                    </div>
                                )}
                            </li>
                            <li>
                                <Link href="/candidates">Candidatos</Link>
                            </li>
                            <li>
                                <button onClick={handleClose}>Cerrar Sesión</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            {/* Estilos para la lista desplegable */}
            <style jsx>{`
                .dropdown-toggle {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: inherit;
                    font: inherit;
                    outline: inherit;
                }

                .dropdown-menu {
                    min-width: 160px;
                    z-index: 10;
                    flex-direction: column;
                }
            `}</style>
        </nav>
    )
}

export default NavBar
