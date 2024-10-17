'use client';
import React, { useEffect, useState } from 'react';
import Input from '../ui/Input';
import Boton from '../ui/Boton';

import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import Spinner from '../ui/Spinner';
import { IForgotPassword } from '@/interfaces/IForgotPassword'; // Asegúrate de que esta interfaz esté bien definida
import { updatePassword } from '@/helpers/forgotPassword.helper';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Estado para almacenar el email capturado
  const [email, setEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // Captura el parámetro "email" de la URL
    const queryParams = new URLSearchParams(window.location.search);
    const emailFromUrl = queryParams.get('email');
    if (emailFromUrl) {
      setEmail(emailFromUrl);
    }
  }, []);

  const initialState: IForgotPassword = {
    email: email ?? "", // Asigna el email desde la URL (puede estar vacío inicialmente)
    newPassword: "",
    confirmPassword: "",
  };

  const [data, setData] = useState<IForgotPassword>(initialState);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value,
      email: email ?? "", // Asegúrate de que email siempre se mantenga
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Validar que el email esté presente
    if (!data.email) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró el email en la URL.',
        });
        setLoading(false);
        return;
    }

    // Cambiar la contraseña
    try {
        await updatePassword(data.email, data); // Llama a updatePassword pasando email y data
        Swal.fire({
            icon: 'success',
            title: 'Contraseña Cambiada',
            text: 'Tu contraseña ha sido cambiada con éxito.',
        });
        router.push('/login'); // Redirigir al login
    } catch (error) {
        // Verificar si error tiene la propiedad message
        if (error instanceof Error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: error.message || 'Error al cambiar la contraseña.',
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error desconocido.',
            });
        }
    } finally {
        setLoading(false);
    }
};
  return (
    <div className='bg-cuartiaryColor min-h-[85vh] flex justify-center'>
      <div className='bg-white w-[50%] my-8 shadow-2xl rounded-2xl flex flex-col items-center px-16'>
        <h2 className='text-2xl font-bold my-12'>Cambio De Contraseña</h2>
        {loading ? (
          <Spinner />
        ) : (
          <form onSubmit={handleSubmit} className='w-full gap-8 flex flex-col items-center'>
            <Input 
              type="password"
              name="newPassword"
              value={data.newPassword}
              onChange={handleChange}
              placeholder='Nueva contraseña'
              required
            />
            <Input 
              type="password"
              name='confirmPassword'
              value={data.confirmPassword}
              onChange={handleChange}
              placeholder='Confirmar contraseña'
              required
            />
            <div className='w-[20%]'>
              <Boton>Renovar</Boton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
