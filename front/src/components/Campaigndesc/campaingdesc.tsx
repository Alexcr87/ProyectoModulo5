'use client'; 

import React, { Suspense, useEffect, useState } from 'react';
import ICampaign from '@/interfaces/ICampaign';
import { IloginProps } from '@/interfaces/ILogin';
import { useSearchParams } from 'next/navigation';

const Campaingdesc = () => {
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams(); // Obtener parámetros de la URL

  const [userSesion, setUserSesion] = useState<IloginProps | null>(null);

 
  useEffect(() => {
    const localUser = localStorage.getItem('userSesion');
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      setUserSesion(parsedUser);
      
    }
  }, []);

  useEffect(() => {
    const fetchCampaignDetails = async () => {
      if (!userSesion?.result?.id) {
        setLoading(false);
        return;
      }

      // Obtener el campaignId de los parámetros de consulta
      const campaignId = searchParams.get('campaignId');
      if (!campaignId) {
        setError('No se proporcionó un ID de campaña.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`http://localhost:3000/campaigns/${campaignId}`);
      

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

    if (userSesion?.result?.id) {
      fetchCampaignDetails();
    }
  }, [userSesion, searchParams]);

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
        
        {/* Lógica para agregar información de candidatos */}
        {campaign.candidates && campaign.candidates.length > 0 ? (
          campaign.candidates.map((candidate) => (
            <div key={candidate.id} className="flex flex-row justify-between mx-4 my-4 rounded-2xl bg-white shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-60">
                  <img className="h-60 w-72 m-auto" src={candidate.imgUrl} alt={`imagen del candidato ${campaign.user.name}`} />
                </div>
                <div className="px-6 pt-2">
                  <div className="flex justify-center">
                    <p className="font-bold text-2xl">{campaign.user.name}</p> {/* Nombre del usuario de la campaña */}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-bold">Postulación:</p>
                    <p>{candidate.postulation}</p>
                    <p className="self-center my-4">{candidate.list}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
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

// Usa Suspense para manejar la carga
export default function SuspendedCampaignDesc() {
  return (
    <Suspense fallback={<p>Cargando detalles de la campaña...</p>}>
      <Campaingdesc />
    </Suspense>
  );
}
