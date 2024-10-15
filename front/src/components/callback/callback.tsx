// "use client"; // Asegúrate de que este es un componente de cliente

// import { useEffect } from 'react';
// import { useAuth } from '@/context/Authontext'; // Asegúrate de que el contexto está correctamente configurado
// import { useRouter } from 'next/navigation';
// import Spinner from '../ui/Spinner';
// import { IRole } from '@/interfaces/IRole';
// import { userSession } from '@/interfaces/Session';

// const APIURL = process.env.NEXT_PUBLIC_API_URL;

// const Callback = () => {
//   const router = useRouter();
//   const { setUserData, setAuth0UserData } = useAuth();

//   useEffect(() => {
//     const handleAuth0Response = async () => {
//       try {
//         // Realizar la solicitud a localhost:3000/auth/protected
//         const response = await fetch(`${APIURL}/auth/protected`, {
//           method: 'GET',
//         });
//        console.log(response, "response");
       
//         if (response.ok) {
//           const data = await response.json();
//           setAuth0UserData({ name: data.name, email: data.email });
//           const userEmail = data.email; // Suponiendo que data contiene el email
        
//           // Verificar si el correo electrónico está en la base de datos
//           const emailCheckResponse = await fetch(`${APIURL}/user/email/${userEmail}`);

//           if (!emailCheckResponse.ok) {
//             // Manejar el error aquí
//             const errorData = await emailCheckResponse.json(); // Intentar obtener datos JSON
//             console.error("Error: ", errorData.message); // Loguea el mensaje de error
//             router.push('/registerByAuth0'); // Redirigir si no se encuentra el usuario
//             return; // Salir para evitar continuar con el código
//           }

//           const user = await emailCheckResponse.json(); // Obtener el usuario si existe

//           // Crear el objeto de sesión del usuario
//           const usersession: userSession = {
//             token: data.sid,
//             userData: {
//               id: user.id,
//               email: user.email,
//               name: user.name,
//               city: user.city,
//               dni: user.dni,
//               country: user.country,
//               roles: user.roles.map((role: IRole) => ({
//                 id: role.id,
//                 name: role.name,
//                 description: role.description,
//               })),
//               groups: user.groups, // Asegúrate de que esto sea correcto
//             },
//           };

//           console.log(usersession, "userData callback");
//           setUserData(usersession); // Guardar los datos del usuario en el contexto de autenticación
//           router.push('/'); // Redirigir a la página de inicio
//         } else {
//           console.error('Error fetching protected data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error during fetch to /auth/protected:', error);
//       }
//     };

//     handleAuth0Response();
//   }, [router, setUserData]);

//   return <Spinner />;
// };

// export default Callback;
