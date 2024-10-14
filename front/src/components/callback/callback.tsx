"use client"; // Asegúrate de que este es un componente de cliente

import { useEffect } from 'react';
import { useAuth } from '@/context/Authontext'; // Asegúrate de que el contexto está correctamente configurado
import { useRouter, useSearchParams } from 'next/navigation';
import Spinner from '../ui/Spinner';
import { IRole } from '@/interfaces/IRole';
import { userSession } from '@/interfaces/Session';

const Callback = () => {
  const router = useRouter();
  const searchParams = useSearchParams(); // Usar para obtener los query params
  const { setUserData, setAuth0UserData } = useAuth();

  useEffect(() => {
    const handleAuth0Response = async () => {
      try {
        // Extraer los datos de la URL usando searchParams
        const name = searchParams.get('name');
        const email = searchParams.get('email');
        const sid = searchParams.get('sid');

        if (!name || !email || !sid) {
          console.error('Missing required data in query params');
          return;
        }

        // Establecer los datos de Auth0 en el contexto
        setAuth0UserData({ name, email });

        // Verificar si el correo electrónico está en la base de datos
        const emailCheckResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/email/${email}`);

        if (!emailCheckResponse.ok) {
          // Manejar el error aquí
          const errorData = await emailCheckResponse.json(); // Intentar obtener datos JSON
          console.error("Error: ", errorData.message); // Loguea el mensaje de error
          router.push('/registerByAuth0'); // Redirigir si no se encuentra el usuario
          return; // Salir para evitar continuar con el código
        }

        const user = await emailCheckResponse.json(); // Obtener el usuario si existe

        // Crear el objeto de sesión del usuario
        const usersession: userSession = {
          token: sid,
          userData: {
            id: user.id,
            email: user.email,
            name: user.name,
            city: user.city,
            dni: user.dni,
            country: user.country,
            roles: user.roles.map((role: IRole) => ({
              id: role.id,
              name: role.name,
              description: role.description,
            })),
            groups: user.groups, // Asegúrate de que esto sea correcto
          },
        };

        console.log(usersession, "userData callback");
        setUserData(usersession); // Guardar los datos del usuario en el contexto de autenticación
        router.push('/'); // Redirigir a la página de inicio
      } catch (error) {
        console.error('Error during fetch to check email:', error);
      }
    };

    // Ejecutar si se encuentran los parámetros en la URL
    handleAuth0Response();
  }, [router, searchParams, setUserData, setAuth0UserData]);

  return <Spinner />;
};

export default Callback;
