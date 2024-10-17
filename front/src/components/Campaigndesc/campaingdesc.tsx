'use client'; 
import Swal from 'sweetalert2';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import ICampaign from '@/interfaces/ICampaign';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/Authontext';
import Boton from '../ui/Boton';
import Spinner from '../ui/Spinner'; // Asumo que tu spinner está en la ruta /ui/Spinner

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const Campaingdesc = () => {
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([]);
  const [voteMessage, setVoteMessage] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const { userData } = useAuth();

  const voteMessageRef = useRef<HTMLDivElement | null>(null);

  const fetchCampaignDetails = async () => {
    if (!userData?.userData.id) {
      setLoading(false);
      return;
    }

    const campaignId = searchParams.get('campaignId');
    if (!campaignId) {
      setError('No se proporcionó un ID de campaña.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${APIURL}/campaigns/${campaignId}`);

      if (!response.ok) {
        throw new Error('Error al obtener los detalles de la campaña');
      }

      const data: ICampaign = await response.json();
      setCampaign(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  const sendVote = async (candidateId?: string) => {
    setIsVoting(true);
    setLoading(true)
    try {
      const response = await fetch(`${APIURL}/votes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userData?.userData.id,
          campaignId: campaign?.id,
          candidateId: candidateId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();// Obtener el mensaje de error del servidor
        throw new Error(errorData.message || 'Error al enviar el voto'); // Usar solo el mensaje de error
      }
  
      const result = await response.text(); // Obtener el mensaje de éxito del servidor
      setVoteMessage(result); // Establecer el mensaje de voto
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
        icon: "success",
        title: "Votación Realizada"
      });
      
      voteMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center' });

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error al enviar el voto'; // Usar el mensaje de error recibido o un mensaje predeterminado
      setVoteMessage(errorMessage);
  
      // Mostrar alerta con el mensaje de error
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonText: 'Aceptar',
      });
  
      console.error('Error al enviar el voto:', error);
    } finally {
      setLoading(false); // Mantén el loading en falso al final
      setIsVoting(false); // Asegúrate de volver a habilitar el botón después de finalizar
    }
  }
  useEffect(() => {
    if (userData) {
      setRoles(userData.userData.roles.map(role => role.name));
    }
  }, [userData]);

  useEffect(() => {
    if (userData?.userData?.id) {
      fetchCampaignDetails();
    }
  }, [userData, roles, searchParams]);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {campaign ? (
        <div className='flex flex-col items-center'>
          <h1 className="text-2xl font-bold mb-4 capitalize">{campaign.name}</h1>
          <p className="text-lg">{campaign.description}</p>
          <p className="text-md text-gray-600">Ubicación: {campaign.location}</p>
          <p className="text-md text-gray-600">Fecha: {new Date(campaign.date).toLocaleDateString('en-Gb', {timeZone: 'UTC'})}</p>

          {(roles.includes('candidate') || roles.includes('voter')) && (
            <div ref={voteMessageRef} className="flex flex-wrap justify-center gap-2">
              <h1 className="text-2xl font-bold mb-4">{voteMessage}</h1>
            </div>
          )}
          {campaign.candidates && campaign.candidates.length > 0 ? (
            <div className="flex flex-wrap justify-center bg-cuartiaryColor gap-2 w-full p-8 mt-4">
              {campaign.candidates.map((candidate) => (
                <div
                  key={candidate?.id}
                  className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-md w-72 h-80 dark:border-gray-700"
                >
                  <div className="relative overflow-hidden rounded-xl w-[95%] h-[60%] mx-auto">
                    <img
                      className="h-full w-full object-cover"
                      src={candidate?.imgUrl}
                      alt={`imagen del candidato ${candidate?.user.name}`}
                      style={{ objectFit: 'cover', height: '100%' }}
                    />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-xl uppercase">{candidate?.user.name}</p>
                    <div className="">
                      <p className="font-bold">Postulación:</p>
                      <p className='capitalize'>{candidate?.postulation}</p>
                      <p className="capitalize">{candidate?.list}</p>
                    </div>
                    {(roles.includes('candidate') || roles.includes('voter')) && (
                      <div>
                        <Boton
                          type='button'
                          onClick={() => sendVote(candidate?.id)}
                          disabled={isVoting}
                          style={{ cursor: isVoting ? 'default' : 'pointer' }}
                        >
                          {'Votar'}
                        </Boton>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              {(roles.includes('candidate') || roles.includes('voter')) && (
                <div className="flex flex-col items-center p-4 rounded-2xl bg-white shadow-md w-72 h-80 dark:border-gray-700">
                  <div className="relative overflow-hidden rounded-xl w-[95%] h-[50%] mx-auto flex justify-center">
                    <img
                      className="object-cover object-center"
                      src="/images/blankVote.jpg"
                      style={{ objectFit: 'cover', height: '100%' }}
                    />
                  </div>
                  <div className="pt-4 text-center">
                    <p className="font-bold text-xl mb-8">Votar en Blanco</p>
                    <div>
                      <Boton
                        type='button'
                        onClick={() => sendVote()}
                        disabled={isVoting}
                        style={{ cursor: isVoting ? 'default' : 'pointer' }}
                      >
                        {'Votar'}
                      </Boton>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <p>No hay candidatos disponibles.</p>
          )}
        </div>
      ) : (
        <p>No se encontró la campaña.</p>
      )}
    </div>
  );
}

export default function SuspendedCampaignDesc() {
  return (
    <Suspense fallback={<Spinner />}>
      <Campaingdesc />
    </Suspense>
  );
}
