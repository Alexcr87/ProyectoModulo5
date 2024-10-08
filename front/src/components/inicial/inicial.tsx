"use client";
import Modal from 'react-modal'
import React, { useEffect, useState } from 'react';
import CustomModal from '../InstructionsModal/Modal'; 

const Inicial = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        Modal.setAppElement('#__next'); // Establece el elemento raíz
    }, []);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    return (
        <div className="relative w-full bg-cover bg-center h-[90vh]" style={{ backgroundImage: "url('https://img.freepik.com/premium-zdjecie/wyborczyni-wkladajaca-kartke-do-urny-wyborczej-wybory-i-koncepcja-glosowania_77190-18358.jpg')" }}>
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-4">
                <h1 className="text-4xl font-bold mb-6">Bienvenido a la Plataforma de Votación</h1>
                <p className="text-lg mb-2">Nuestra plataforma ofrece una experiencia intuitiva y accesible para que puedas gestionar elecciones de manera eficiente.</p>
                <button 
                    onClick={openModal} 
                    className="bg-primaryColor text-white px-6 py-3 rounded-md shadow-md hover:bg-tertiaryColor transition duration-300"
                >
                    Guía de votación
                </button>
                <CustomModal 
                    isOpen={modalIsOpen} 
                    onRequestClose={closeModal} 
                />
            </div>
        </div>
    );
};

export default Inicial;