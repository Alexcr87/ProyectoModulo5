'use client';

import React, { useState } from 'react';
import ICampaign from '@/interfaces/ICampaign'; 
import Input from '../ui/Input';
import Boton from '../ui/Boton';
import { useAuth } from '@/context/Authontext';

const CampaignForm = () => {
  const { userData } = useAuth(); 
  const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

  const [loading, setLoading] = useState(false); // Nuevo estado de carga
  const [formData, setFormData] = useState<ICampaign>({
    name: '',
    description: '',
    location: '',
    date: new Date(),
    userId: userData?.userData.id || '', // Se llenará automáticamente
    user: { 
      id: userData?.userData.id || '', 
      name: userData?.userData.name || '', 
      dni: 0, 
      email: '' 
    },
    candidates: [], // Mantener la estructura, pero vacía
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      date: new Date(e.target.value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Iniciar el spinner

    const data = {
      name: formData.name,
      description: formData.description,
      location: formData.location,
      date: formData.date.toISOString(),
      userId: formData.userId,
    }  

    try {
      const json_data = JSON.stringify(data);

      const response = await fetch(`${APIURL}/campaigns`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: json_data,
      });

      if (!response.ok) {
        throw new Error("Error en la creación de la campaña");
      }

      window.location.href = "/campaigns";    
    } catch (error) {
      console.error("Error al crear la campaña:", error);
    } finally {
      setLoading(false); // Detener el spinner
    }
  };

  return (
    <>
    <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl">
            CREAR CAMPAÑA
    </div>
    <form onSubmit={handleSubmit} className="campaign-form flex justify-center">
      <div className='flex flex-col items-center w-full md:w-[40%] gap-4'>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder='Nombre de la campaña'
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <textarea
          id="description"
          name="description"
          placeholder='Descripción'
          value={formData.description}
          onChange={handleInputChange}
          className="w-full h-40 px-5 py-3 text-base transition bg-transparent border rounded-md outline-none 
          border-stroke dark:border-dark-3 text-body-color dark:text-dark-6 placeholder:text-black focus:border-primaryColor 
          dark:focus:border-primaryColor focus-visible:shadow-none"
          required
        />
        <Input
          type="text"
          id="location"
          name="location"
          placeholder='Ubicacion:'
          value={formData.location}
          onChange={handleInputChange}
          required
        />
        <Input
          type="date"
          name="date"
          id="date"
          value={formData.date.toISOString().substring(0, 10)}
          onChange={handleDateChange}
          required
        />

        {/* Mostrar spinner si está cargando */}
        {loading ? (
          <div className="flex justify-center">
            <div className="loader border-t-4 border-b-4 border-blue-500 w-12 h-12 rounded-full animate-spin"></div>
          </div>
        ) : (
          <Boton type="submit" disabled={loading}>Crear Campaña</Boton>
        )}
      </div>
    </form>

    {/* Añadir estilos del spinner */}
    <style jsx>{`
      .loader {
        border-top-color: transparent;
        border-left-color: transparent;
      }
    `}</style>
    </>
  );
}

export default CampaignForm;
