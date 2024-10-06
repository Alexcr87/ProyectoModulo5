'use client';

import React, { Suspense, useEffect, useState } from 'react';
import ICampaign from '@/interfaces/ICampaign';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/Authontext';
import Spinner from '@/components/ui/Spinner'; // Importa tu componente Spinner
const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

const Campaingdesc = () => {
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const { userData } = useAuth();

  useEffect(() => {
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

    if (userData?.userData?.id) {
      fetchCampaignDetails();
    }
  }, [userData, searchParams]);

  if (loading) {
    return <Spinner />; // Aquí reemplazamos el texto de carga por tu componente Spinner
  }

  if (error) return <p>{error}</p>;

  return (
    <div>
      {campaign ? (
        <div>
          <h1 className="text-2xl font-bold mb-4">{campaign.name}</h1>
          <p className="text-lg">{campaign.description}</p>
          <p className="text-md text-gray-600">Ubicación: {campaign.location}</p>
          <p className="text-md text-gray-600">Fecha: {new Date(campaign.date).toLocaleDateString()}</p>
          
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
                    />
                  </div>
                  <div className="pt-4 text-center">
                    <p className="font-bold text-xl">{candidate?.user.name}</p>
                    <div className="mt-2">
                      <p className="font-bold">Postulación:</p>
                      <p>{candidate?.postulation}</p>
                      <p className="my-2">{candidate?.list}</p>
                    </div>
                  </div>
                </div>
              ))}
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
};

export default function SuspendedCampaignDesc() {
  return (
    <Suspense fallback={<p>Cargando detalles de la campaña...</p>}>
      <Campaingdesc />
    </Suspense>
  );
}
