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
            <div id="popup-modal"  className={isOpen ? 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' : 'hidden'}>
                <div  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" onClick={handleModalClose}>
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>   
                            </button>
                            <div className="p-4 md:p-5 text-center ">

                                <img className="mx-auto mb-8 mt-6 text-gray-400 w-40 h-42 dark:text-gray-200" aria-hidden="true" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnvRlOdJCz6LzHp_gbEWw--FSsQA5NjAaERA&s">
                                </img>
                                <h3 className="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400">Seleccione la opción para registrar el usuario</h3>
                                <button 
                                //  onClick={() => setRegistroManual(true)}
                                onClick={() => handleRegistroClick('manual')}
                                data-modal-hide="popup-modal" type="button" className="text-white bg-blue-500  hover:bg-blue-400 hover:text-black focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-8">
                                Registro Manual
                                </button>
                                <button 
                                // onClick={() => setRegistroMasivo(true)}
                                onClick={() => handleRegistroClick('masivo')}
                                data-modal-hide="popup-modal" type="button" className="py-2.5 px-5 ms-3 text-sm font-medium text-white focus:outline-none bg-green-500 rounded-lg border border-gray-200 hover:bg-green-400 hover:text-black focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                Registro Masivo
                                </button>
                                {/* <PopUpRegisterComponent registroManual={registroManual} registroMasivo={registroMasivo} /> */}
                                {/* {(registroManual || registroMasivo) && (
                                    <PopUpRegisterComponent registroManual={registroManual} registroMasivo={registroMasivo}  />
                                )} */}
                                
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