'use client';

import React, { useState, useEffect } from 'react';
import ICampaign from '@/interfaces/ICampaign'; 
import Input from '../ui/Input';
import Boton from '../ui/Boton';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;


const updateCampaing = () => {
  const [campaign, setCampaign] = useState<ICampaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams(); // Obtener parámetros de la URL
  const id = searchParams.get('id'); // Obtener el id de la campaña de los parámetros de la URL

  useEffect(() => {
    if (id) {
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

  console.log (campaign)
 
  // ESTA FUNCION EJECUTA LA MODIFICACION

  // const handleUpdateCampaign = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   try {
  //     const form = event.target as HTMLFormElement;
  //     const formData = new FormData(form);
  //     const updatedCampaign = {
  //       name: formData.get('name'),
  //       description: formData.get('description'),
  //       location: formData.get('location'),
  //       date: formData.get('date'),
  //     };
  //     const response = await fetch(`${APIURL}/campaigns/${id}`, {
  //       method: 'PATCH',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(updatedCampaign),
  //     });
  //     const data = await response.json();
  //     setCampaign(data);
  //   } catch (error) {
  //     setError((error as { message: string }).message);
  //   }
  // };


  return (
    <>
      <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl font-bold">
        ACTUALIZAR CAMPANA
          <div className="flex flex-row items-center w-full md:w-[40%] gap-4 m-auto mt-8 py-8 px-4 font-bold border-4 rounded-md outline-none
            border-stroke dark:border-dark-3 border-blue-500" >
          <p>{`Campana: ${campaign?.name}`}</p>
          {/* <p>{`Fecha: ${campaign?.date}`}</p> */}
          <p>{`Fecha: ${campaign?.date ? new Date(campaign.date).toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' }) : ''}`}</p> </div>
      </div>
      <form className="campaign-form flex justify-center">
        <div className="flex flex-col items-center w-full md:w-[40%] gap-4">
          <Input
            type="text"
            id="name"
            name="name"
            placeholder='Nombre'
            // value={id}
            required
          />
          <textarea
            id="description"
            name="description"
            placeholder='Descripcion'
            // value={campaign.description}
            className="w-full h-40 px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
            border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
            dark:focus:border-primaryColor focus-visible:shadow-none"
            required
          />
          <Input
            type="text"
            id="location"
            name="location"
            placeholder='ubicacion'
            // value={campaign.location}
            required
          />
          <Input
            type="date"
            name="date"
            id="date"
            // placeholder={campaign?.date ? campaign.date.toISOString().substring(0, 10) : ''}
             value={campaign?.date? new Date().toISOString().substring(0, 10) : ''}
            //  value={campaign.date.toISOString().substring(0, 10)}
            required
          />
          <Boton type="submit">Actualizar Campaña</Boton>
        </div>
      </form>
    </>
  );
};

export default updateCampaing;