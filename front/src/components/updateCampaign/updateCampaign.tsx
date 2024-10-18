'use client';

import React, { useState, useEffect } from 'react';
import ICampaign from '@/interfaces/ICampaign'; 
import Input from '../ui/Input';
import Boton from '../ui/Boton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/Authontext';
import IGroup from '@/interfaces/IGroup';
import Spinner from '../ui/Spinner';
import { Tooltip } from 'react-tooltip';

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;


const updateCampaign = () => {
  const { userData } = useAuth(); 
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [date, setDate] = useState(campaign?.date ? new Date(campaign?.date) : null);

  const searchParams = useSearchParams(); // Obtener parámetros de la URL
  const id = searchParams.get('id'); // Obtener el id de la campaña de los parámetros de la URL

  useEffect(() => {
    if (id) {
      setLoading(true)
      fetch(`${APIURL}/campaigns/${id}`)
        .then(response => response.json())
        .then(data => {
          setCampaign(data);
          setLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

 
  // ESTA FUNCION EJECUTA LA MODIFICACION

  const handleUpdateCampaign = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); 
    try {
      const form = event.target as HTMLFormElement;
      const formData = new FormData(form);
      

      const updatedCampaign = {
        name: formData.get('name'),
        description: formData.get('description'),
        location: formData.get('location'),
        date: formData.get ('date'),
      };
      const response = await fetch(`${APIURL}/campaigns/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCampaign),
      });
      const data = await response.json();
      if (response.ok) { 
        setCampaign(data); // Actualiza la campaña con la nueva data
        setError(null); // Limpia cualquier error previo
      } else {
        setError(data.message || 'Ocurrió un error');
      }
    } catch (error) {
      setError((error as { message: string }).message);
    } finally {
      setLoading(false); // Asegúrate de que se detenga la carga después de la petición
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner /> {/* Show spinner while loading */}
      </div>
    );
  }

  return (
    <>
      <div className="col-start-5 col-end-9 mt-10 my-8 text-center text-xl font-bold">
        ACTUALIZAR CAMPAÑA
        
        <div className="flex flex-col md:flex-row items-center w-full md:w-4/5 lg:w-3/5 gap-4 m-auto mt-8 py-8 px-6 font-bold border-4 rounded-lg border-stroke dark:border-dark-3 border-primaryColor shadow-lg">
          <p>{`Campana: ${campaign?.name}`}</p>
          <p>{`Fecha: ${campaign?.date ? new Intl.DateTimeFormat('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'  }).format(new Date(campaign.date)) : ''}`}</p>
        </div>
      </div>
      <form className="campaign-form flex justify-center" onSubmit={handleUpdateCampaign}>
        <div className="flex flex-col items-center w-full md:w-[40%] gap-4">
          {/* Nombre */}
          <div className="relative w-full">
            <label className="flex items-center">
              Nombre
              <span className="ml-2 text-primaryColor cursor-pointer" data-tooltip-id="tooltip-name">
                ℹ️
              </span>
              <Tooltip id="tooltip-name" place="top" content="Introduce el nombre de la campaña." />
            </label>
            
            <Input
              type="text"
              id="name"
              name="name"
              placeholder='Nombre'
              className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
                dark:focus:border-primaryColor focus-visible:shadow-none"
              required
            />
          </div>
  
          {/* Descripción */}
          <div className="relative w-full">
            <label className="flex items-center">
              Descripción
              <span className="ml-2 text-primaryColor cursor-pointer" data-tooltip-id="tooltip-description">
                ℹ️
              </span>
              <Tooltip id="tooltip-description" place="top" content="Proporciona una breve descripción de la campaña." />
            </label>
            <textarea
              id="description"
              name="description"
              placeholder='Descripción'
              className="w-full h-40 px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
                dark:focus:border-primaryColor focus-visible:shadow-none"
              required
            />
          </div>
  
          {/* Ubicación */}
          <div className="relative w-full">
            <label className="flex items-center">
              Ubicación
              <span className="ml-2 text-primaryColor cursor-pointer" data-tooltip-id="tooltip-location">
                ℹ️
              </span>
              <Tooltip id="tooltip-location" place="top" content="Indica la ubicación de la campaña." />
            </label>
            <Input
              type="text"
              id="location"
              name="location"
              placeholder='Ubicación'
              className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
                dark:focus:border-primaryColor focus-visible:shadow-none"
              required
            />
          </div>
  
          {/* Fecha */}
          <div className="relative w-full">
            <label className="flex items-center">
              Fecha
              <span className="ml-2 text-primaryColor cursor-pointer" data-tooltip-id="tooltip-date">
                ℹ️
              </span>
              <Tooltip id="tooltip-date" place="top" content="Selecciona la fecha de la campaña." />
            </label>
            <Input
              type="date"
              name="date"
              id="date"
              min={new Date().toISOString().substring(0, 10)}
              value={date ? date.toISOString().substring(0, 10) : ''}
              onChange={(e) => {
                const [year, month, day] = e.target.value.split('-');
                setDate(new Date(Date.UTC(Number(year), Number(month) - 1, Number(day))));
              }}
              className="w-full px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
                border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 focus:border-primaryColor 
                dark:focus:border-primaryColor focus-visible:shadow-none"
              required
            />
          </div>
  
          {/* Botón de actualización */}
          <div className='mb-8'>
            <Boton type="submit">Actualizar Campaña</Boton>
          </div>
        </div>
      </form>
    </>
  );
} 

export default updateCampaign;