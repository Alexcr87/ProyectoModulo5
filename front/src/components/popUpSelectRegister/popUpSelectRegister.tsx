'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import PopUpRegisterComponent from '../popUpRegister/popUpRegister';


const popUPSelectRegister = () => {
    const router = useRouter()
    const [isOpen, setIsOpen] = useState(true);
    const [registroManual, setRegistroManual] = useState(false);
    const [registroMasivo, setRegistroMasivo] = useState(false);
    const [showChild, setShowChild] = useState(false);

    const handleModalClose = () => {
        setIsOpen(false);
        router.push('/');
    };

    const handleRegistroClick = (tipoRegistro: any) => {
        if (tipoRegistro === 'manual') {
          setRegistroManual(true);
        } else if (tipoRegistro === 'masivo') {
          setRegistroMasivo(true);
        }
        setIsOpen(false);
        setShowChild(true);
      };

    useEffect(() => {
        setIsOpen(true);
    }, []);

    return (
        <div>
            {isOpen && (
            <div id="popup-modal"  className={isOpen ? 'fixed inset-0 flex items-center justify-center bg-cuartiaryColor' : 'hidden'}>
                <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white  rounded-lg shadow bg-cuartiaryColor md:w-[500px] md:h-[500px]">
                        {/* <div className="relative bg-gradient-to-r from-green-100 to-blue-100 rounded-lg shadow dark:bg-gray-700 w-[500px] h-[500px]"> */}
                        <button
                            onClick={handleModalClose}
                            className="absolute top-2 left-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors"
                        >
                            x
                        </button>
                            <div className="p-4 md:p-5 text-center ">

                                <img className="mx-auto mb-8 mt-6 text-gray-400 w-40 h-42 dark:text-gray-200" aria-hidden="true" src="/images/popupregister.png">
                                </img>
                                <h3 className="mb-4 md:mb-20 mt-12  text-xl font-normal text-black dark:text-gray-400">Seleccione la opción para registrar usuarios</h3>
                                <button 
                                //  onClick={() => setRegistroManual(true)}
                                onClick={() => handleRegistroClick('manual')}
                                data-modal-hide="popup-modal" type="button" className="text-white text-xl/8 bg-blue-500  hover:bg-blue-400 hover:text-black focus:outline-none font-normal rounded-lg inline-flex items-center px-5 py-2.5 text-center md:mr-8">
                                Registro Manual
                                </button>
                                <button 
                                // onClick={() => setRegistroMasivo(true)}
                                onClick={() => handleRegistroClick('masivo')}
                                data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-xl/8 font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-gray-200 hover:bg-green-400 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Registro Masivo
                                </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                  )}
                  {showChild && (
                    <PopUpRegisterComponent registroManual={registroManual} registroMasivo={registroMasivo} />
                  )}
        </div>
    );
}

export default popUPSelectRegister;