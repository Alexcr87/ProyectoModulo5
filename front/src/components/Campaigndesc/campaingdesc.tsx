'use client'; 
import Swal from 'sweetalert2';
import React, { Suspense, useEffect, useState, useRef } from 'react';
import ICampaign from '@/interfaces/ICampaign';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/Authontext';
import Boton from '../ui/Boton';
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const Campaingdesc = () => {
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<string[]>([])
  const [voteMessage, setVoteMessage] = useState<string | null>(null);
  const [isVoting, setIsVoting] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const {userData} = useAuth()

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
        setVoteMessage('Error en la respuesta de enviar voto');
        throw new Error('Error en la respuesta de enviar voto');
      }else{
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
          title: "Votacion Realizada"
        });
      }
      const result = await response.text();
      setVoteMessage(result);
      voteMessageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'center'});
    } catch (error) {
      setVoteMessage('Error al enviar el voto');
      console.error('Error al enviar el voto:', error);
    }
  };

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

  if (loading) return <p>Cargando campaña...</p>;
  if (error) return <p>{error}</p>;

  return (
  <div>
    {campaign ? (
      <div>
        <h1 className="text-2xl font-bold mb-4">{campaign.name}</h1>
        <p className="text-lg">{campaign.description}</p>
        <p className="text-md text-gray-600">Ubicación: {campaign.location}</p>
        <p className="text-md text-gray-600">Fecha: {new Date(campaign.date).toLocaleDateString()}</p>
        
        {(roles.includes('candidate') || roles.includes('voter')) && (
          <div ref={voteMessageRef} className="flex flex-wrap justify-center gap-2">
            <h1 className="text-2xl font-bold mb-4">{voteMessage}</h1>
          </div>
        )}
        {campaign.candidates && campaign.candidates.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-2">
            {campaign.candidates.map((candidate) => (
              <div
                key={candidate?.id}
                className="flex flex-col justify-between p-4 rounded-2xl bg-white shadow-md w-72 dark:border-gray-700"
              >
                <div className="relative overflow-hidden rounded-xl h-25">
                  <img
                    className="h-full w-full object-cover"
                    src={candidate?.imgUrl}
                    alt={`imagen del candidato ${candidate?.user.name}`}
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                </div>
                <div className="pt-4 text-center">
                  <p className="font-bold text-xl">{candidate?.user.name}</p>
                  <div className="mt-2">
                    <p className="font-bold">Postulación:</p>
                    <p>{candidate?.postulation}</p>
                    <p className="my-2">{candidate?.list}</p>
                  </div>
                  {(roles.includes('candidate') || roles.includes('voter')) && (
                    <div>
                      <Boton 
                        type='button'
                        onClick={() => sendVote(candidate?.id)}
                        disabled={isVoting}
                        style={{ cursor: isVoting ? 'default' : 'pointer' }}
                      >
                        Votar
                      </Boton>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {(roles.includes('candidate') || roles.includes('voter')) && (
              <div className="flex flex-col justify-between p-4 rounded-2xl bg-white shadow-md w-72 dark:border-gray-700">
                <div className="relative overflow-hidden rounded-xl h-25">
                <img
                    className="h-full w-full object-cover"
                    src="/images/blankVote.jpg"
                    style={{ objectFit: 'cover', height: '100%' }}
                  />
                </div>
                <div className="pt-4 text-center">
                  <p className="font-bold text-xl" style={{marginBottom: '30px'}}>Votar en Blanco</p>
                  <div>
                    <Boton 
                      type='button'
                      onClick={() => sendVote()}
                      disabled={isVoting}
                      style={{ cursor: isVoting ? 'default' : 'pointer' }}
                    >
                      Votar
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
    <Suspense fallback={<p>Cargando detalles de la campaña...</p>}>
      <Campaingdesc />
    </Suspense>
  );
}
