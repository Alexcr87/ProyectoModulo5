"use client"; // Asegúrate de que este es un componente de cliente

import { useEffect } from 'react';
import { useAuth } from '@/context/Authontext'; // Asegúrate de que el contexto está correctamente configurado
import { useRouter } from 'next/navigation';

const APIURL = process.env.NEXT_PUBLIC_API_URL;

const Callback = () => {
  const router = useRouter();
  const { setUserData } = useAuth();

  useEffect(() => {
    const handleAuth0Response = async () => {
      try {
        // Realizar la solicitud a localhost:3000/auth/protected
        const response = await fetch(`${APIURL}/auth/protected`, {
          method: 'GET',
          credentials: 'include',
        });
        
        if (response.ok) {
          const data = await response.json();
          const userEmail = data.email; // Suponiendo que data contiene el email
          
          // Verificar si el correo electrónico está en la base de datos
          const emailCheckResponse = await fetch(`${APIURL}/user/email/${userEmail}`);
          
          // Comprobar si la respuesta fue correcta
          if (emailCheckResponse.ok) {
            const user = await emailCheckResponse.json();
            
            if (user.id) { // Verifica si el usuario fue encontrado
              const userData = {
                token: data.token,
                userData: {
                  id: user.id,
                  user: user,
                  email: data.email,
                  name: data.name,
                },
              };
              
              // Guardar los datos del usuario en el contexto de autenticación
              setUserData(userData);
              console.log(data);
              
              // Redirigir a la página de inicio
              router.push('/');
            } else {
              // Manejar el caso en el que el correo no existe en la base de datos
              router.push('/registerByAuth0');
            }
          } else {
            console.error('Error fetching user data:', emailCheckResponse.statusText);
            // Puedes manejar aquí el error si no se puede verificar el correo
            router.push('/registerByAuth0'); // Redirige si la verificación falla
          }
        } else {
          console.error('Error fetching protected data:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch to /auth/protected:', error);
      }
    };

    handleAuth0Response();
  }, [router, setUserData]);

  return <div>Autenticando...</div>;
};

export default Callback;
