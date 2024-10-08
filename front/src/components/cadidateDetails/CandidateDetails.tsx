'use client';
import React, { useState } from 'react';
import ICandidate from '@/interfaces/ICandidate';
import Image from 'next/image';
import Swal from 'sweetalert2';
import Boton2 from '../ui/Boton2';
import Spinner from '../ui/Spinner'; 
import { useAuth } from '@/context/Authontext'; // Importa el hook de autenticación

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const CandidateDetails = (props: ICandidate) => {
  const { userData } = useAuth();

  const [campaign, setCampaign] = useState<{ name: string; description: string } | null>(null);
  const [loading, setLoading] = useState(false); // Estado para el spinner

  // Hardcodeado el campaignId por ahora
  const campaignId = "a173338f-954a-4d04-9e58-b5d76290f81a"; // Aquí puedes cambiar la lógica más tarde

  

  const convertirArreglo = () => {
    const variable = props.proposals;

    if (Array.isArray(variable)) {
      return variable; // Si ya es un arreglo, retornamos tal cual
    } else if (typeof variable === 'string') {
      try {
        return JSON.parse(variable); // Intentamos parsear si es un string
      } catch (error) {
        console.error("Error al convertir las propuestas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Las propuestas no son válidas. Asegúrate de que estén en formato correcto.",
        });
        return []; // Retorna un array vacío en caso de error
      }
    }
    return []; // Retorna un array vacío si no es ninguno de los casos anteriores
  };

  const handleVotar = async () => {
    const actualUserId = userData?.userData?.id;
    if (!actualUserId) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se ha encontrado el usuario. Por favor, inicia sesión nuevamente.",
      });
      return;
    }

    const voteDto = {
      userId: actualUserId,
      campaignId: campaignId,
      candidateId: props.id,
    };

    try {
      setLoading(true); // Muestra el spinner antes de hacer la petición
      const response = await fetch(`${APIURL}/votes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(voteDto),
    });
    
      if (response.ok) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Votación generada correctamente",
          showConfirmButton: false,
          timer: 1500
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorData.message || "Error al registrar tu voto. Por favor intenta de nuevo.",
        });
      }
    } catch (error) {
      console.error("Error al registrar el voto:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al registrar tu voto. Por favor intenta de nuevo.",
      });
    } finally {
      setLoading(false); // Oculta el spinner después de la petición
    }
  };

  return (
    <div className='mt-6'>
      {loading ? ( // Mostrar el spinner cuando loading sea true
        <Spinner />
      ) : (
        <div className='grid grid-cols-2 w-11/12 justify-center gap-2 h-[65vh]'>
          <div className='bg-white flex justify-center items-center mt-2 drop-shadow-2xl border-2 p-8 rounded-b-2xl'>
            <div className='bg-cuartiaryColor w-80 h-96 relative rounded-xl overflow-hidden drop-shadow-2xl border-2'>
            <div>
              <Image src={props.imgUrl} alt="fotoCandidato" fill />
            </div>
            <div className='bg-primaryColor py-4 absolute bottom-0 w-full flex flex-col items-center'>
              <h3 className='font-bold text-xl capitalize text-white'>{props.user.name}</h3>
              <p className='text-white mb-2'>{props.list}</p>
              <div>
                <Boton2 onClick={handleVotar}>Votar</Boton2>
              </div>
            </div>
          </div>
          <div className='bg-white mt-2 drop-shadow-2xl border-2 p-4 rounded-b-2xl'>
            <div className='bg-secundaryColor h-full p-4 rounded-2xl drop-shadow-2xl text-cuartiaryColor'>
              <h2>Propuestas:</h2>
              {convertirArreglo().map((propu:any, index:any) => (
                <p className='ml-4' key={index}>{`${index + 1}. ${propu}`}</p>
              ))}
            </div>
          </div>
        </div>
    </div>
    )}
    </div>
  );
}

export default CandidateDetails;
