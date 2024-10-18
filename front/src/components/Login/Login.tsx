'use client';
import { validateFields } from '@/helpers/validateLogin';
import { IloginError, IloginProps } from '@/interfaces/ILogin';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { login } from '@/helpers/auth.helper';
import Swal from 'sweetalert2';
import Input from '../ui/Input';
import Boton from '../ui/Boton';
import { useAuth } from '@/context/Authontext'; // Importa el contexto de autenticación
import { forgotPassword } from '@/helpers/forgotPassword';
import Spinner from '../ui/Spinner';



const LoginForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { setUserData } = useAuth(); // Obtiene setUserData desde el contexto
    const initialState = {
        email: "",
        password: "",
        token: "",
        userData:{}
    };

    const [dataUser, SetdataUser] = useState<IloginProps>(initialState);
    const [errors, SetErrors] = useState<IloginError>(initialState);
    const [redirect, setRedirect] = useState<string>(""); // Estado para redirección

     // Captura la información de la URL
     useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setRedirect(queryParams.get('redirect') || ""); // Obtiene el parámetro redirect
    }, []);

    
    // CAPTURO LA INFORMACION DE LOS INPUTS
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        SetdataUser({
            ...dataUser, [name]: value
        });
    };
    
    // ENVIO LOS DATOS AL BACK O GUARDO LOS DATOS EN EL ARRAY   
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true)
        if (Object.keys(errors).length > 0) { 
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
            setLoading(false);
        } else {
            const clearUser = await login(dataUser);
            if (clearUser.token) {
                // Aquí es donde guardo los nuevos datos del usuario en el contexto
                setUserData(clearUser); // Establece el usuario en el contexto
                localStorage.setItem('userSession', JSON.stringify(clearUser)); // También guardamos en localStorage
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        container: 'mt-12'
                    },
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                    
                });
                Toast.fire({
                    icon: 'success',
                    title: 'Bienvenido a Voting System'
                });
                if (clearUser.mustChangePassword) { // Redirige si debe cambiar su contraseña
                    router.push('/changePassword');
                  } else if (redirect === 'changePassword') {
                    router.push('/changePassword'); // Redirige según el parámetro
                  } else {
                    router.push('/');
                  }
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    customClass: {
                        container: 'mt-12' 
                    },
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: clearUser.message
                });
                return;
            }
        }
    };
    
    // VERIFICO SI EXISTE ALGUN ERROR EN LA VALIDACION DE LOS INPUTS
    useEffect(() => {
        const errors = validateFields(dataUser);
        SetErrors(errors);
    }, [dataUser]);
    
    // Redirigir a Auth0 para iniciar sesión
    const handleAuth0Login = () => {
        const auth0LoginUrl = `${process.env.NEXT_PUBLIC_AUTH0_BASE_URL}/api/auth/login`;
        window.location.href = auth0LoginUrl;
    };

     // "Olvidé mi contraseña"
    const handleForgotPassword = async () => {
        const { value: email } = await Swal.fire({
            title: 'Restablecer Contraseña',
            input: 'email',
            inputLabel: 'Ingresa tu correo electrónico',
            inputPlaceholder: 'Correo electrónico',
            showCancelButton: true,
            confirmButtonText: 'Enviar',
            cancelButtonText: 'Cancelar',
            inputValidator: (value) => {
                if (!value) {
                    return 'Por favor, ingresa tu correo electrónico';
                }
            }
        });

        if (email) {
            try {
                const response = await forgotPassword(email);
                Swal.fire({
                    icon: 'success',
                    title: 'Correo Enviado',
                    text: response.message || 'Revisa tu correo para restablecer la contraseña.',
                });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message,
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Error desconocido.',
                    });
                }
            }
        }
    };
    return (
        <div className='my-4 text-center flex flex-col items-center bg-white shadow-lg px-4 rounded-lg'>
            {loading && <Spinner />} {/* Muestra el spinner mientras está cargando */}
            <Image src="/images/logo.png" alt="imagenLogo" width={350} height={350} className='m-10' />
            <h1 className='font-bold text-2xl mt-4'>INICIAR SESION</h1>
            <form onSubmit={handleSubmit} className="mx-auto md:px-28 pb-20 rounded-lg">
                <div className="flex flex-col mt-4 w-full">
                    <Input
                        type="text"
                        name='email'
                        value={dataUser.email}
                        onChange={handleChange}
                        placeholder="Email"
                        disabled={loading} // Deshabilitar si está cargando
                    />
                </div>

                {errors.email && (
                    <div className="text-red-500 text-xs mt-2">{errors.email}</div>
                )}

                <div className="flex flex-col my-4">
                    <Input
                        type="password"
                        name='password'
                        value={dataUser.password}
                        onChange={handleChange}
                        placeholder="Password"
                        disabled={loading} // Deshabilitar si está cargando
                    />
                </div>

                {errors.password && (
                    <div className="text-red-500 text-xs mt-2">{errors.password}</div>
                )}
                
                <Boton 
                    type='submit'
                    disabled={loading || Object.keys(errors).length > 0} // Deshabilitar si está cargando o si hay errores
                >
                    {loading ? "Iniciando..." : "Iniciar Sesion"} {/* Cambiar texto del botón */}
                </Boton>
                <hr className='my-4'/>
                <Boton 
                    type='button'
                    onClick={handleAuth0Login}
                    disabled={loading} // Deshabilitar si está cargando
                >
                    <i className="fa-brands fa-google mr-2"></i>
                    Continuar Con Google
                </Boton>
                <div className="mt-4">
                    <a href="#" onClick={handleForgotPassword} className="text-blue-500 hover:underline">
                        Olvidé mi contraseña
                    </a>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
