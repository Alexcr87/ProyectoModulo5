"use client";
import Modal from 'react-modal';
import React, { useEffect, useState } from 'react';
import CustomModal from '../InstructionsModal/Modal'; 
import { useAuth } from '@/context/Authontext';


const Inicial = () => {
    const { userData } = useAuth();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
  
    useEffect(() => {
        Modal.setAppElement('#__next'); // Establece el elemento raíz

        // Asegúrate de que userData tenga la estructura esperada
        const roles = userData?.userData?.roles.map((item: { id: number }) => item.id) || [];
        if (roles.includes(1)) {
            setUserRole('admin');
        } else if (roles.includes(2)) {
            setUserRole('candidate');
        } else if (roles.includes(3)) {
            setUserRole('voter');
        } else if (roles.includes(4)) {
            setUserRole('moderator');
        } else {
            setUserRole(null);
        }
        console.log("Rol del usuario:", userRole); // Log para verificar el rol
    }, [userData]); // Dependencia para que se ejecute al cambiar userData

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const buttonText = (userRole === 'voter' || userRole === 'candidate')
        ? 'Guía de Votación'
        : '¿Cómo usar la app?';

    return (
        <div className="relative w-full bg-cover bg-center h-[90vh]" style={{ backgroundImage: "url('https://img.freepik.com/premium-zdjecie/wyborczyni-wkladajaca-kartke-do-urny-wyborczej-wybory-i-koncepcja-glosowania_77190-18358.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
                {
                    userData ? (<h1 className="text-4xl font-bold mb-6">Bienvenido <span className='capitalize'>{userData.userData.name}</span> a la Plataforma de Votación</h1>) 
                    :( <h1 className="text-4xl font-bold mb-6">Bienvenido a la Plataforma de Votación</h1> )
                }
                
                <p className="text-lg mb-2">Nuestra plataforma ofrece una experiencia intuitiva y accesible para que puedas gestionar elecciones de manera eficiente.</p>
                <button 
                    onClick={openModal} 
                    className="bg-primaryColor text-white px-6 py-3 rounded-md shadow-md hover:bg-tertiaryColor transition duration-300"
                >
                    {buttonText}
                </button>
                <CustomModal 
                    isOpen={modalIsOpen} 
                    onRequestClose={closeModal} 
                    userRole={userRole} // Asegúrate de pasar el userRole aquí
                />
            </div>
        </div>
    );
};

export default Inicial;
