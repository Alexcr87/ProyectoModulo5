'use client';

import React, { useState, useEffect } from 'react';
import ICampaign from '@/interfaces/ICampaign'; 
import Boton from '../boton/Boton';

const CampaignForm = () => {

  const APIURL: string | undefined = process.env.NEXT_PUBLIC_API_URL;

  const [userSesion, setUserSesion] = useState<any>(); 
  const [formData, setFormData] = useState<ICampaign>({
    name: '',
    description: '',
    location: '',
    date: new Date(),
    userId: '', // Se llenará automáticamente
    user: { 
      id: '', 
      name: '', 
      dni: 0, 
      email: '' 
    },
    candidates: [], // Mantener la estructura, pero vacía
  });

  useEffect(() => {
    const localUser = localStorage.getItem("userSesion");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      
      setUserSesion(parsedUser);
      if (parsedUser?.result?.id) {
        setFormData((prevData) => ({
          ...prevData,
          userId: parsedUser.result.id,
          user: { ...prevData.user, id: parsedUser.result.id, name: parsedUser.result.name }, // Asigna el id y el nombre al usuario
        }));
      }
    }
  }, []);

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

    const data = {
      "name": formData.name,
      "description": formData.description,
      "location": formData.location,
      "date": formData.date.toISOString(),
      "userId": formData.userId
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
    }

  };

  return (
    <>
    <div className="col-start-5 col-end-9 mt-[2.5em] my-[2em] text-center text-xl">
            REGISTRO USUARIO
    </div>
    <form onSubmit={handleSubmit} className="campaign-form flex justify-center">
      <div className='flex flex-col items-center w-[40%] gap-4'>
        <input
          type="text"
          id="name"
          name="name"
          placeholder='Nombre de la campaña'
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 
          outline-none focus:border-tertiaryColor shadow-xl hover:scale-105"
          required
        />
        <textarea
          id="description"
          name="description"
          placeholder='Descripción'
          value={formData.description}
          onChange={handleInputChange}
          className="w-full border rounded-lg bg-secundaryColor h-40 text-black placeholder:text-black text-left p-2 pl-3 mt-1 
          outline-none focus:border-tertiaryColor shadow-xl hover:scale-105"
          required
        />
        <input
          type="text"
          id="location"
          name="location"
          placeholder='Ubicacion:'
          value={formData.location}
          onChange={handleInputChange}
          className="w-full border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 
          outline-none focus:border-tertiaryColor shadow-xl hover:scale-105"
          required
        />
        <input
          type="date"
          name="date"
          id="date"
          value={formData.date.toISOString().substring(0, 10)}
          onChange={handleDateChange}
          className="w-full border rounded-full bg-secundaryColor text-black placeholder:text-black text-left p-2 pl-3 mt-1 
          outline-none focus:border-tertiaryColor shadow-xl hover:scale-105"
          required
        />
        <Boton text="Crear Campaña" type="submit"/>
      </div>
    </form>
    </>
  );
};


export default CampaignForm;
