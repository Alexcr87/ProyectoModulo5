'use client';

import React, { useState, useEffect } from 'react';
import ICampaign from '@/interfaces/ICampaign'; 
import { useRouter } from 'next/navigation'; // Cambia a 'next/navigation'

const CampaignForm = () => {
  const router = useRouter();
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   
  };

  return (
    <form onSubmit={handleSubmit} className="campaign-form">
      <div>
        <label htmlFor="name">Nombre de la campaña:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="description">Descripción:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="location">Ubicación:</label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
          required
        />
      </div>

      <div>
        <label htmlFor="date">Fecha:</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date.toISOString().substring(0, 10)}
          onChange={handleDateChange}
          required
        />
      </div>
      <button type="submit">Crear campaña</button>

      {/* Estilos básicos */}
      <style jsx>{`
        .campaign-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          max-width: 400px;
          margin: auto;
          border: 1px solid #ccc;
          padding: 1rem;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          background-color: var(--cuartiary-color); /* Color de fondo */
        }

        label {
          font-weight: bold;
          margin-bottom: 0.5rem; /* Margen inferior para separación */
        }

        input, textarea {
          padding: 0.5rem;
          border-radius: 4px;
          border: 1px solid #ccc;
          width: 100%;
          transition: border-color 0.3s; /* Efecto de transición */
        }

        input:focus, textarea:focus {
          border-color: var(--primary-color); /* Cambia el color del borde al enfocar */
          outline: none; /* Quita el contorno por defecto */
        }

        button {
          padding: 0.5rem 1rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s; /* Efecto de transición */
        }

        button:hover {
          background-color: #c54e03; /* Color de fondo al pasar el mouse */
        }
      `}</style>
    </form>
  );
};


export default CampaignForm;
