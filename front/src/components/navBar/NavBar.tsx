'use client'
import React, { useEffect, useState, useRef } from 'react'
import Image from 'next/image'
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'
import { useAuth } from '@/context/Authontext'
import Guia from "../Guia/guia"
import { useUser } from '@auth0/nextjs-auth0/client';
import { userSession } from '@/interfaces/Session'
import { IRole } from '@/interfaces/IRole'

const NavBar = () => {
    const { userData, setUserData } = useAuth();
    const router = useRouter();
    const [bars, setBars] = useState<boolean>(false)
    const [isDropdownOpen, setDropdownOpen] = useState(false); // Estado para el dropdown de Usuarios
    const [isCampaignDropdownOpen, setCampaignDropdownOpen] = useState(false); // Estado para el dropdown de Campañas
    const pathname = usePathname();
    const campaignDropdownRef = useRef<HTMLLIElement>(null); // Referencia al li del dropdown de campañas
    const usersDropdownRef = useRef<HTMLLIElement>(null); // Referencia al li del dropdown de usuarios
    const {user} =useUser()
  
    useEffect(() => {
        const localUser = localStorage.getItem("userData");
        if (localUser) {
            setUserData(JSON.parse(localUser));
        }
    }, [pathname]);

    useEffect(() => {
        const checkUserInBackend = async () => {
            if (user) {
                try {
                    const emailCheckResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/email/${user.email}`);
            
                    if (!emailCheckResponse.ok) {
                        const errorData = await emailCheckResponse.json();
                        console.error("Error: ", errorData.message);
                        router.push('/registerByAuth0'); // Redirigir si no se encuentra el usuario
                        return;
                    }
            
                    const newUser = await emailCheckResponse.json(); // Obtener los datos del usuario si existe
            
                    // Crear el objeto de sesión del usuario
                    const usersession: userSession = {
                        token: user.sub || '', // Manejar el caso donde `user.sid` puede ser indefinido
                        userData: {
                            id: newUser.id,
                            email: newUser.email,
                            name: newUser.name,
                            city: newUser.city,
                            dni: newUser.dni,
                            country: newUser.country,
                            roles: newUser.roles.map((role: IRole) => ({
                                id: role.id,
                                name: role.name,
                                description: role.description,
                            })),
                            groups: newUser.groups, // Asegúrate de que esto sea correcto
                        },
                    };
            
                    setUserData(usersession); // Guardar los datos del usuario en el contexto de autenticación
                    router.push('/'); // Redirigir a la página de inicio
                } catch (error) {
                    console.error('Error during fetch to /user/email:', error);
                }
            }
        };

        checkUserInBackend();
    }, [user, router, setUserData]);
    

    const handleClose = () => {
            router.push('/api/auth/logout')
             // Cierre de sesión local
            localStorage.clear();
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
    

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    }

    const closeDropdown = () => {
        setCampaignDropdownOpen(false);
        setDropdownOpen(false);
    }

    const toggleCampaignDropdown = () => {
        setCampaignDropdownOpen(!isCampaignDropdownOpen);
    }

    const handleClickOutside = (event: MouseEvent) => {
        if (campaignDropdownRef.current && !campaignDropdownRef.current.contains(event.target as Node)) {
            setCampaignDropdownOpen(false);
        }
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
    
    const userRoles = userData?.userData.roles.map(item => item.id)
    const isAdmin = userRoles?.includes(1)
    const isModerator = userRoles?.includes(4); 
    const isVotante = userRoles?.includes(3); 
    const isCandidate = userRoles?.includes(2)
   
   const campaign = () =>{
    return (<li className="relative" ref={campaignDropdownRef}>
        <button onClick={toggleCampaignDropdown} className="dropdown-toggle">Campañas</button>
        {isCampaignDropdownOpen && (
            <div className="dropdown-menu absolute bg-white text-black p-2 shadow-md">
                <Link href="/campaign" className="block px-4 py-2 hover:bg-primaryColor hover:text-cuartiaryColor" onClick={closeDropdown}>Crear campaña</Link>
                <Link href="/campaigns" className="block px-4 py-2 hover:bg-primaryColor hover:text-cuartiaryColor" onClick={closeDropdown}>Mis campañas</Link>
            </div>
        )}
    </li>)
   } 

   const results = () =>{
    return ( <li>
        <Link href="/results">Resultados</Link>
    </li>)
   } 
   const groups = () =>{
    return ( <li>
        <Link href="/groups">Grupos</Link>
    </li>)
   } 
   const candidates = () =>{
    return (<li>
            <Link href="/candidates">Candidatos</Link>
    </li>)
   }
   const perfilVotante = () =>{
    return (<li>
            <Link href="/perfilUser">Mi perfil</Link>
    </li>)
   }

   const campaigns = () =>{
    return (<li>
            <Link href="/campaigns">Campañas</Link>
    </li>)
   }
   const changePassword = () =>{
    return (<li>
            <Link href="/changePassword">Cambio Contraseña</Link>
    </li>)
   }

   const users = () =>{
    return (  <li className="relative" ref={usersDropdownRef}>
        <button onClick={toggleDropdown} className="dropdown-toggle">Usuarios</button>
        {isDropdownOpen && (
            <div className="dropdown-menu absolute bg-white text-black p-2 shadow-md">
                <Link href="/registerUsers" className="block px-4 py-2 hover:bg-primaryColor hover:text-cuartiaryColor" onClick={closeDropdown}>Crear usuario</Link>
                <Link href="/users" className="block px-4 py-2 hover:bg-primaryColor hover:text-cuartiaryColor" onClick={closeDropdown}>Mis usuarios</Link>
            </div>
        )}
    </li>)
   }


    return (
        <nav className='bg-primaryColor opacity-80 h-14 pl-8 flex items-center justify-between fixed w-full z-50'>
            <Link href="/">
                <div className='flex items-center'>
                    <Image src="/images/logo.png" alt="imagenLogo" width={180} height={230} className='invert'/>
                </div>
            </Link>
            <button className={`${bars ? "hidden": "md:hidden"} absolute right-4`} onClick={()=>setBars(!bars)}>
                <i className="fa-solid fa-bars text-white text-2xl"></i>
            </button>
            <button className={`${bars ? "md:hidden": "hidden"} absolute right-4`} onClick={()=>setBars(!bars)}>
                <i className="fa-solid fa-x text-white text-2xl"></i>
            </button>
            <div className={`w-[100%] md:w-auto md:flex ${bars ? "md:flex":"hidden"}`}>
                <ul className='md:flex bg-primaryColor md:bg-none mt-44 md:mt-0 gap-8 pr-8 text-cuartiaryColor p-8 md:p-0 '>
                    {!userData ? (
                        <>
                            <li className='md:bg-none  py-4 md:py-0 px-2' onClick={()=>setBars(!bars)}>
                                <Link href="/registerUser">Registrarme</Link>
                            </li>
                            <li className='md:bg-none  py-4 md:py-0 px-2' onClick={()=>setBars(!bars)}>
                                <Link href="/login">Iniciar Sesión</Link>
                            </li>
                            <li className='md:bg-none  py-4 md:py-0 px-2' onClick={()=>setBars(!bars)}>
                                <Link href="/aboutus">¿Quiénes somos?</Link>
                            </li>
                        </>
                    ) : (
                        <>

                            {isAdmin && (<>{groups()} {campaign()} {users()}  {results()} {perfilVotante()}</>)}
                            {(isCandidate || isVotante) && (<>{campaigns()} {perfilVotante()}</>)}
                            {isModerator && (<> {groups()} {campaign()} {users()} {results()} {perfilVotante()} </>)}

                            <li className='md:bg-none  md:py-0' onClick={()=>setBars(!bars)}>
                                <button onClick={handleClose}>Cerrar Sesión</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
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
            <div className='hidden md:flex gap-8 text-white list-none'>
                <p>{(isCandidate || isVotante || isModerator || isAdmin) && (<>{changePassword()}</>)}</p>
                <Guia/>
            </div>
            
        </nav>
    )
}

export default NavBar;
